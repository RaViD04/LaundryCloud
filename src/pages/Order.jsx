import React from 'react'
import OrderForm from '../components/OrderForm'
import { createOrder } from '../lib/mockApi'

export default function Order({ onCreated }){
  async function handleCreate(payload){
    const order = await createOrder(payload)
    // after create, navigate to tracking (App handles route change)
    if(onCreated) onCreated(order.id)
    // also store last-created id so tracking page can auto-show it
    localStorage.setItem('lc_last_created', order.id)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <OrderForm onSubmit={handleCreate} />
      <div className="mt-4 text-sm text-slate-600">Catatan: data disimpan pada browser (mock).</div>
    </div>
  )
}
