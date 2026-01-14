import React, { useEffect, useState } from 'react'
import { listOrders, listInventory, financialSummary } from '../lib/mockApi'
import Sparkline from '../components/Sparkline'

function lastNDays(n){
  const days = []
  for(let i = n-1; i>=0; i--){
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d)
  }
  return days
}

function bucketByDay(orders, days){
  return days.map(day => {
    const key = day.toISOString().slice(0,10)
    return orders.filter(o => o.createdAt && o.createdAt.slice(0,10) === key).length
  })
}

export default function Dashboard(){
  const [orders, setOrders] = useState([])
  const [inv, setInv] = useState([])
  const [summary, setSummary] = useState({ totalRevenue:0, totalOrders:0, byService: {} })

  useEffect(()=>{ load() }, [])
  async function load(){
    const [o,i,s] = await Promise.all([listOrders(), listInventory(), financialSummary()])
    setOrders(o)
    setInv(i)
    setSummary(s)
  }

  const days = lastNDays(7)
  const series = bucketByDay(orders, days)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500">Active Orders</div>
          <div className="text-2xl font-bold mt-2">{orders.length}</div>
          <div className="mt-2 text-xs text-slate-400">Last 7 days</div>
          <div className="mt-3"><Sparkline points={series} width={160} height={40} /></div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500">Total Revenue</div>
          <div className="text-2xl font-bold mt-2">Rp {summary.totalRevenue.toLocaleString()}</div>
          <div className="mt-2 text-xs text-slate-400">Orders: {summary.totalOrders}</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-slate-500">Inventory Items</div>
          <div className="text-2xl font-bold mt-2">{inv.length}</div>
          <div className="mt-2 text-xs text-slate-400">Low-stock alerts not implemented</div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Recent Orders</h2>
          <ul className="mt-3 space-y-2">
            {orders.slice(0,8).map(o => (
              <li key={o.id} className="p-2 border rounded flex items-center justify-between">
                <div>
                  <div className="font-medium">{o.id} — {o.customer}</div>
                  <div className="text-sm text-slate-500">{o.service || 'Kiloan'} · {o.items} items</div>
                </div>
                <div className="text-sm text-slate-700">{o.status}</div>
              </li>
            ))}
            {orders.length===0 && <li className="text-sm text-slate-500">No orders yet.</li>}
          </ul>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Low Inventory</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            {inv.map(i => (
              <li key={i.id} className={`flex justify-between border p-2 rounded ${i.qty < 5 ? 'bg-amber-50' : ''}`}>{i.name} <span>{i.qty}</span></li>
            ))}
            {inv.length===0 && <li className="text-sm text-slate-500">No inventory data.</li>}
          </ul>
        </section>
      </div>
    </div>
  )
}
