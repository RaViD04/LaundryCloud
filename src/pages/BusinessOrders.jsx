import React, { useEffect, useState } from 'react'
import { listOrders, updateStatus } from '../lib/mockApi'
import OrderDetail from '../components/OrderDetail'

export default function BusinessOrders(){
  const [orders, setOrders] = useState([])
  const [q, setQ] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [active, setActive] = useState(null)

  useEffect(()=>{ load() }, [])

  async function load(){
    const all = await listOrders()
    setOrders(all)
  }

  async function setStatus(id, status){
    await updateStatus(id, status)
    load()
    if(active && active.id === id) setActive(await (await import('../lib/mockApi')).then(m=>m.getOrder(id)))
  }

  const filtered = orders.filter(o => {
    if(q && !(`${o.id} ${o.customer} ${o.address}`.toLowerCase().includes(q.toLowerCase()))) return false
    if(statusFilter && o.status !== statusFilter) return false
    return true
  })

  function exportCSV(rows){
    if(!rows || rows.length === 0) return
    const header = ['id','customer','service','items','status','pickup','address','createdAt','total']
    const csv = [header.join(',')].concat(rows.map(r => header.map(h => {
      const v = r[h] ?? ''
      // escape quotes
      return `"${String(v).replace(/"/g,'""')}"`
    }).join(','))).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'orders.csv'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Order Management</h2>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by id/name/address" className="p-2 border rounded w-full sm:w-1/2" />
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="p-2 border rounded w-full sm:w-1/4">
          <option value="">All statuses</option>
          <option value="Received">Received</option>
          <option value="In Process">In Process</option>
          <option value="Ready">Ready</option>
          <option value="Delivered">Delivered</option>
        </select>
        <div className="flex gap-2">
          <button onClick={() => exportCSV(filtered)} className="px-3 py-2 bg-slate-700 text-white rounded">Export CSV</button>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.length===0 && <div className="text-sm text-slate-500">No orders match the filter.</div>}
        {filtered.map(o => (
          <div key={o.id} className="bg-white p-3 rounded shadow flex items-center justify-between">
            <div>
              <div className="font-medium">{o.id} — {o.customer}</div>
              <div className="text-sm text-slate-500">{o.service} · {o.items} items · {o.address}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm">{o.status}</div>
              <button onClick={() => setActive(o)} className="px-2 py-1 bg-slate-100 rounded text-sm">View</button>
              <button onClick={() => setStatus(o.id,'In Process')} className="px-2 py-1 bg-yellow-400 rounded text-sm">In Process</button>
              <button onClick={() => setStatus(o.id,'Ready')} className="px-2 py-1 bg-green-600 text-white rounded text-sm">Ready</button>
            </div>
          </div>
        ))}
      </div>

      {active && <OrderDetail order={active} onClose={() => setActive(null)} onUpdate={async (id, status) => { await setStatus(id, status) }} />}
    </div>
  )
}
