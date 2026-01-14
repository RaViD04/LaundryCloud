import React from 'react'

export default function OrderCard({ order, onUpdate }){
  if(!order) return null
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">{order.id} — {order.customer}</div>
          <div className="text-sm text-slate-600">{order.service} · {order.items} items</div>
        </div>
        <div className="text-sm text-slate-700">{order.status}</div>
      </div>

      <div className="mt-3 text-sm text-slate-600">
        <div>Pickup: {order.pickup || '-'}</div>
        <div>Alamat: {order.address || '-'}</div>
        {order.notes && <div>Notes: {order.notes}</div>}
      </div>

      {onUpdate && (
        <div className="mt-4">
          <button onClick={() => onUpdate('In Process')} className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded text-sm">In Process</button>
          <button onClick={() => onUpdate('Ready')} className="mr-2 px-3 py-1 bg-green-600 text-white rounded text-sm">Ready</button>
          <button onClick={() => onUpdate('Delivered')} className="px-3 py-1 bg-slate-600 text-white rounded text-sm">Delivered</button>
        </div>
      )}
    </div>
  )
}
