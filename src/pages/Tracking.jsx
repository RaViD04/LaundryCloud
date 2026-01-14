import React, { useEffect, useState } from 'react'
import { getOrder, listOrders, updateStatus } from '../lib/mockApi'
import OrderCard from '../components/OrderCard'

export default function Tracking(){
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState(null)
  const [recent, setRecent] = useState([])

  useEffect(() => {
    const last = localStorage.getItem('lc_last_created')
    if(last){
      fetchOrder(last)
    }
    loadRecent()
  }, [])

  async function fetchOrder(id){
    const o = await getOrder(id)
    setOrder(o)
  }

  async function loadRecent(){
    const all = await listOrders()
    setRecent(all.slice(0,10))
  }

  async function handleLookup(e){
    e.preventDefault()
    if(!query) return
    fetchOrder(query)
  }

  async function handleUpdate(status){
    if(!order) return
    const updated = await updateStatus(order.id, status)
    setOrder(updated)
    loadRecent()
  }

  return (
    <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
      <section>
        <form onSubmit={handleLookup} className="flex gap-2">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Masukkan ID order (contoh ORD-123)" className="w-full p-2 border rounded" />
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Cek</button>
        </form>

        <div className="mt-4">
          <OrderCard order={order} onUpdate={handleUpdate} />
        </div>
      </section>

      <section>
        <h3 className="font-semibold">Recent Orders</h3>
        <div className="mt-3 space-y-2">
          {recent.map(r => (
            <div key={r.id} className="p-2 bg-white rounded shadow flex items-center justify-between">
              <div>
                <div className="font-medium">{r.id} — {r.customer}</div>
                <div className="text-sm text-slate-500">{r.service} · {r.items} items</div>
              </div>
              <div>
                <button onClick={() => fetchOrder(r.id)} className="px-2 py-1 text-sm bg-slate-100 rounded">View</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
