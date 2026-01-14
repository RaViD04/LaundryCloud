import React, { useEffect, useState } from 'react'
import { listInventory, updateInventoryItem } from '../lib/mockApi'

export default function Inventory(){
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [qty, setQty] = useState(0)

  useEffect(()=>{ load() }, [])
  async function load(){ const inv = await listInventory(); setItems(inv) }

  function startEdit(it){ setEditing(it); setQty(it.qty) }

  async function save(){
    await updateInventoryItem(editing.id, { qty: Number(qty) })
    setEditing(null)
    load()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Inventory</h2>
      <div className="grid gap-2">
        {items.map(i => (
          <div key={i.id} className="bg-white p-3 rounded shadow flex items-center justify-between">
            <div>
              <div className="font-medium">{i.name}</div>
              <div className="text-sm text-slate-500">ID: {i.id}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm">Qty: {i.qty}</div>
              <button onClick={() => startEdit(i)} className="px-2 py-1 bg-blue-600 text-white rounded text-sm">Edit</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Edit {editing.name}</h3>
          <div className="mt-2">
            <input type="number" value={qty} onChange={e=>setQty(e.target.value)} className="p-2 border rounded" />
            <div className="mt-3">
              <button onClick={save} className="px-3 py-2 bg-green-600 text-white rounded mr-2">Save</button>
              <button onClick={() => setEditing(null)} className="px-3 py-2 bg-slate-200 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
