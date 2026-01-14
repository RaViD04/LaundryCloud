import React, { useEffect, useState } from 'react'
import { listCustomers, getCustomer, createCustomer } from '../lib/mockApi'

export default function CRM(){
  const [customers, setCustomers] = useState([])
  const [selected, setSelected] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(()=>{ load() }, [])
  async function load(){ setCustomers(await listCustomers()) }

  async function view(id){ setSelected(await getCustomer(id)) }

  async function add(){ if(!name) return; await createCustomer({ name, phone, address }); setName(''); setPhone(''); setAddress(''); load() }

  return (
    <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
      <section className="md:col-span-2">
        <h2 className="text-xl font-semibold mb-3">Customers</h2>
        <div className="space-y-2">
          {customers.map(c => (
            <div key={c.id} className="bg-white p-3 rounded shadow flex items-center justify-between">
              <div>
                <div className="font-medium">{c.name} <span className="text-xs text-slate-500">({c.id})</span></div>
                <div className="text-sm text-slate-500">{c.phone} · {c.address}</div>
                <div className="text-sm text-slate-500">Points: <strong>{c.points || 0}</strong></div>
              </div>
              <div>
                <button onClick={() => view(c.id)} className="px-2 py-1 bg-slate-100 rounded">View</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Add Customer</h3>
        <div className="mt-2 space-y-2">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full p-2 border rounded" />
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" className="w-full p-2 border rounded" />
          <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Address" className="w-full p-2 border rounded" />
          <div className="mt-2">
            <button onClick={add} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
          </div>
        </div>

        {selected && (
          <div className="mt-4 border-t pt-3 text-sm text-slate-700">
            <div className="font-medium">{selected.name} <span className="text-xs text-slate-500">({selected.id})</span></div>
            <div>{selected.phone}</div>
            <div>{selected.address}</div>
            <div className="mt-2">Points: <strong>{selected.points || 0}</strong></div>
          </div>
        )}
      </aside>
    </div>
  )
}
