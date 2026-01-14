import React, { useEffect, useState } from 'react'
import { financialSummary } from '../lib/mockApi'

export default function Reports(){
  const [summary, setSummary] = useState({ totalRevenue:0, totalOrders:0, byService: {} })

  useEffect(()=>{ load() }, [])
  async function load(){ setSummary(await financialSummary()) }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Financial Summary</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 border rounded">
          <div className="text-sm text-slate-500">Total Orders</div>
          <div className="text-2xl font-bold">{summary.totalOrders}</div>
        </div>
        <div className="p-3 border rounded">
          <div className="text-sm text-slate-500">Total Revenue</div>
          <div className="text-2xl font-bold">Rp {summary.totalRevenue.toLocaleString()}</div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium">Revenue by Service</h3>
        <ul className="mt-2 space-y-2 text-sm">
          {Object.entries(summary.byService).length===0 && <li className="text-slate-500">No data</li>}
          {Object.entries(summary.byService).map(([k,v]) => (
            <li key={k} className="flex justify-between border p-2 rounded">{k} <span>Rp {v.toLocaleString()}</span></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
