const STORAGE_KEY = 'lc_orders_v1'

function loadOrders(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }catch(e){
    return []
  }
}

function saveOrders(orders){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

function makeId(){
  const ts = Date.now().toString().slice(-6)
  return `ORD-${ts}`
}

export function createOrder(payload){
  const orders = loadOrders()
  const id = makeId()
  // compute simple pricing
  const priceMap = { 'Kiloan': 12000, 'Satuan': 15000, 'Express': 20000 }
  const items = Number(payload.items || 1)
  const service = payload.service || 'Kiloan'
  const unit = priceMap[service] || 12000
  const total = items * unit

  // try to resolve customer to an existing customer id
  let customerName = payload.customer || 'Anon'
  let customerId = payload.customerId || null
  try{
    const customers = listCustomers()
    if(!customerId){
      const matched = customers.find(c => c.name === customerName || c.id === customerName)
      if(matched){
        customerId = matched.id
        customerName = matched.name
      }
    } else {
      const matchedById = customers.find(c => c.id === customerId)
      if(matchedById){ customerName = matchedById.name }
    }
  }catch(e){ /* ignore */ }

  const order = {
    id,
    customer: customerName,
    customerId,
    address: payload.address || '',
    pickup: payload.pickup || null,
    items,
    service,
    notes: payload.notes || '',
    status: 'Received',
    total,
    createdAt: new Date().toISOString(),
  }
  orders.unshift(order)
  saveOrders(orders)
  return Promise.resolve(order)
}

/* Removed unused helpers: updateOrder, deleteOrder, getOrdersByCustomer to keep API surface minimal. */

export function getOrder(id){
  const orders = loadOrders()
  return Promise.resolve(orders.find(o => o.id === id) || null)
}

export function listOrders(){
  return Promise.resolve(loadOrders())
}

export function updateStatus(id, status){
  const orders = loadOrders()
  const idx = orders.findIndex(o => o.id === id)
  if(idx === -1) return Promise.resolve(null)
  orders[idx].status = status
  saveOrders(orders)
  return Promise.resolve(orders[idx])
}

// --- Inventory & Tasks (business features) ---
const INV_KEY = 'lc_inventory_v1'
const TASK_KEY = 'lc_tasks_v1'
const EMP_KEY = 'lc_employees_v1'

function seedDefaults(){
  if(!localStorage.getItem(INV_KEY)){
    const inv = [
      { id: 'I-1', name: 'Deterjen', qty: 20 },
      { id: 'I-2', name: 'Softener', qty: 10 },
      { id: 'I-3', name: 'Plastik', qty: 200 }
    ]
    localStorage.setItem(INV_KEY, JSON.stringify(inv))
  }
  if(!localStorage.getItem(TASK_KEY)){
    const tasks = [
      { id: 'T-1', title: 'Ambil order ORD-001', assignee: 'Ari', status: 'pending' }
    ]
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks))
  }
  if(!localStorage.getItem(EMP_KEY)){
    const emps = [
      { id: 'E-1', name: 'Ari' },
      { id: 'E-2', name: 'Rina' }
    ]
    localStorage.setItem(EMP_KEY, JSON.stringify(emps))
  }
}

function loadInv(){
  seedDefaults()
  try{ return JSON.parse(localStorage.getItem(INV_KEY) || '[]') }catch(e){ return [] }
}
function saveInv(inv){ localStorage.setItem(INV_KEY, JSON.stringify(inv)) }

export function listInventory(){
  return Promise.resolve(loadInv())
}

export function updateInventoryItem(id, changes){
  const inv = loadInv()
  const idx = inv.findIndex(i=>i.id===id)
  if(idx===-1) return Promise.resolve(null)
  inv[idx] = { ...inv[idx], ...changes }
  saveInv(inv)
  return Promise.resolve(inv[idx])
}

function loadTasks(){ seedDefaults(); try{ return JSON.parse(localStorage.getItem(TASK_KEY) || '[]') }catch(e){ return [] } }
function saveTasks(t){ localStorage.setItem(TASK_KEY, JSON.stringify(t)) }

export function listTasks(){
  return Promise.resolve(loadTasks())
}

export function createTask(payload){
  const tasks = loadTasks()
  const id = 'T-' + (Date.now().toString().slice(-5))
  const t = { id, title: payload.title, assignee: payload.assignee || null, status: 'pending' }
  tasks.unshift(t)
  saveTasks(tasks)
  return Promise.resolve(t)
}

export function updateTask(id, changes){
  const tasks = loadTasks()
  const idx = tasks.findIndex(x=>x.id===id)
  if(idx===-1) return Promise.resolve(null)
  tasks[idx] = { ...tasks[idx], ...changes }
  saveTasks(tasks)
  return Promise.resolve(tasks[idx])
}

export function listEmployees(){ seedDefaults(); try{ return JSON.parse(localStorage.getItem(EMP_KEY) || '[]') }catch(e){ return [] } }

// --- Customers / CRM ---
const CUST_KEY = 'lc_customers_v1'

function seedCustomers(){
  if(!localStorage.getItem(CUST_KEY)){
    const c = [
      { id: 'C-1', name: 'Budi', phone: '081234567890', address: 'Jl. Mawar 1' },
      { id: 'C-2', name: 'Siti', phone: '082345678901', address: 'Jl. Melati 2' }
    ]
    localStorage.setItem(CUST_KEY, JSON.stringify(c))
  }
}

export function listCustomers(){ seedCustomers(); try{ return JSON.parse(localStorage.getItem(CUST_KEY) || '[]') }catch(e){ return [] } }

export function getCustomer(id){
  const all = listCustomers()
  return Promise.resolve(all.find(c => c.id === id) || null)
}

export function createCustomer(payload){
  const all = listCustomers()
  const id = 'C-' + (Date.now().toString().slice(-5))
  const c = { id, name: payload.name, phone: payload.phone || '', address: payload.address || '', points: 0 }
  all.unshift(c)
  localStorage.setItem(CUST_KEY, JSON.stringify(all))
  return Promise.resolve(c)
}

export function addCustomerPoints(id, delta){
  const all = listCustomers()
  const idx = all.findIndex(c => c.id === id)
  if(idx === -1) return Promise.resolve(null)
  all[idx].points = (all[idx].points || 0) + Number(delta)
  localStorage.setItem(CUST_KEY, JSON.stringify(all))
  return Promise.resolve(all[idx])
}

// --- Financial summary ---
export async function financialSummary(){
  const orders = await listOrders()
  const totalRevenue = orders.reduce((s,o)=> s + (o.total || 0), 0)
  const totalOrders = orders.length
  const byService = orders.reduce((acc,o)=>{ acc[o.service] = (acc[o.service] || 0) + (o.total || 0); return acc }, {})
  return Promise.resolve({ totalRevenue, totalOrders, byService })
}

// --- Payments & Notifications (mock) ---
const PAY_KEY = 'lc_payments_v1'
const NOTIF_KEY = 'lc_notifications_v1'

function loadPayments(){ try{ return JSON.parse(localStorage.getItem(PAY_KEY) || '[]') }catch(e){ return [] } }
function savePayments(p){ localStorage.setItem(PAY_KEY, JSON.stringify(p)) }

export function createPayment(orderId, amount, method='cash'){
  const payments = loadPayments()
  const p = { id: 'P-'+Date.now().toString().slice(-6), orderId, amount: Number(amount), method, createdAt: new Date().toISOString() }
  payments.unshift(p)
  savePayments(payments)
  return Promise.resolve(p)
}

function loadNotifs(){ try{ return JSON.parse(localStorage.getItem(NOTIF_KEY) || '[]') }catch(e){ return [] } }
function saveNotifs(n){ localStorage.setItem(NOTIF_KEY, JSON.stringify(n)) }

export function sendWhatsAppMock(orderId, message){
  const n = loadNotifs()
  const note = { id: 'N-'+Date.now().toString().slice(-6), orderId, message, sentAt: new Date().toISOString() }
  n.unshift(note)
  saveNotifs(n)
  return Promise.resolve(note)
}

export function listPayments(){ return Promise.resolve(loadPayments()) }
export function listNotifications(){ return Promise.resolve(loadNotifs()) }


