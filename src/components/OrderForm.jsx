import React, { useState, useEffect } from 'react'
import { listCustomers } from '../lib/mockApi'

export default function OrderForm({ onSubmit }){
  const [customer, setCustomer] = useState('')
  const [address, setAddress] = useState('')
  const [pickup, setPickup] = useState('')
  const [items, setItems] = useState(1)
  const [service, setService] = useState('Kiloan')
  const [notes, setNotes] = useState('')
  const [customers, setCustomers] = useState([])
  const [selectedCustomerId, setSelectedCustomerId] = useState('')

  useEffect(()=>{ try{ setCustomers(listCustomers()) }catch(e){ setCustomers([]) } }, [])

  function handleSubmit(e){
    e.preventDefault()
    const payload = { customer, address, pickup, items: Number(items), service, notes }
    if(selectedCustomerId) payload.customerId = selectedCustomerId
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold">Buat Order</h3>

      <label className="block mt-4">
        <div className="text-sm text-slate-600">Nama / Pilih Pelanggan</div>
        <div className="flex gap-2">
          <select value={selectedCustomerId} onChange={e => { setSelectedCustomerId(e.target.value); const c = customers.find(x=>x.id===e.target.value); if(c) setCustomer(c.name); }} className="p-2 border rounded">
            <option value="">-- New / Tulis Nama --</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.id})</option>)}
          </select>
          <input value={customer} onChange={e => { setCustomer(e.target.value); if(e.target.value) setSelectedCustomerId('') }} required className="flex-1 mt-0 p-2 border rounded" />
        </div>
      </label>

      <label className="block mt-3">
        <div className="text-sm text-slate-600">Alamat / Catatan pickup</div>
        <input value={address} onChange={e => setAddress(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </label>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <label>
          <div className="text-sm text-slate-600">Pickup</div>
          <input type="datetime-local" value={pickup} onChange={e => setPickup(e.target.value)} className="w-full mt-1 p-2 border rounded" />
        </label>
        <label>
          <div className="text-sm text-slate-600">Items (pcs)</div>
          <input type="number" min="1" value={items} onChange={e => setItems(e.target.value)} className="w-full mt-1 p-2 border rounded" />
        </label>
      </div>

      <label className="block mt-3">
        <div className="text-sm text-slate-600">Service</div>
        <select value={service} onChange={e => setService(e.target.value)} className="w-full mt-1 p-2 border rounded">
          <option>Kiloan</option>
          <option>Satuan</option>
          <option>Express</option>
        </select>
      </label>

      <label className="block mt-3">
        <div className="text-sm text-slate-600">Notes</div>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </label>

      <div className="mt-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Kirim Order</button>
      </div>
    </form>
  )
}
