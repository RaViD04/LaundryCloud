import React, { useState, useEffect } from 'react'
import { createPayment, sendWhatsAppMock, listPayments, addCustomerPoints } from '../lib/mockApi'

export default function OrderDetail({ order, onClose, onUpdate }){
  const [payAmount, setPayAmount] = useState(order?.total || 0)
  const [method, setMethod] = useState('cash')
  const [loading, setLoading] = useState(false)
  const [payments, setPayments] = useState([])

  if(!order) return null

  async function handlePay(){
    setLoading(true)
    try{
      await createPayment(order.id, payAmount, method)
      // award simple loyalty points: 1 point per Rp10.000
      const points = Math.floor((Number(payAmount) || 0) / 10000)
      if(points > 0){
        if(order.customerId){
          await addCustomerPoints(order.customerId, points)
        }else if(order.customer){
          await addCustomerPointsByName(order.customer, points)
        }
      }
      // optionally send mock WA notification
      await sendWhatsAppMock(order.id, `Pembayaran diterima: Rp ${Number(payAmount).toLocaleString()} (${method})`)
      await reloadPayments()
      alert('Payment recorded')
    }catch(e){
      console.error(e)
      alert('Payment failed')
    }
    setLoading(false)
  }

  // helper: try find customer by name and add points
  async function addCustomerPointsByName(name, pts){
    try{
      const { listCustomers, addCustomerPoints } = await import('../lib/mockApi')
      const all = await listCustomers()
      const c = all.find(x => x.name === name)
      if(c) await addCustomerPoints(c.id, pts)
    }catch(e){ console.warn(e) }
  }

  async function reloadPayments(){
    try{
      const all = await listPayments()
      setPayments(all.filter(p => p.orderId === order.id))
    }catch(e){ console.warn(e) }
  }

  useEffect(()=>{ if(order) reloadPayments() }, [order])

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold">{order.id} — {order.customer}</h3>
          <button onClick={onClose} className="text-sm text-slate-500">Close</button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
          <div><strong>Status:</strong> {order.status}</div>
          <div><strong>Items:</strong> {order.items}</div>
          <div className="col-span-2"><strong>Service:</strong> {order.service}</div>
          <div className="col-span-2"><strong>Pickup:</strong> {order.pickup || '-'}</div>
          <div className="col-span-2"><strong>Alamat:</strong> {order.address || '-'}</div>
          {order.notes && <div className="col-span-2"><strong>Notes:</strong> {order.notes}</div>}
        </div>

        <div className="mt-4 border-t pt-4">
          <h4 className="font-medium">Record Payment</h4>
          <div className="mt-2 grid grid-cols-3 gap-2 items-end">
            <div>
              <div className="text-sm text-slate-600">Amount</div>
              <input type="number" value={payAmount} onChange={e=>setPayAmount(e.target.value)} className="w-full p-2 border rounded" />
            </div>
            <div>
              <div className="text-sm text-slate-600">Method</div>
              <select value={method} onChange={e=>setMethod(e.target.value)} className="w-full p-2 border rounded">
                <option value="cash">Cash</option>
                <option value="bank">Bank Transfer</option>
                <option value="e-wallet">E-Wallet</option>
              </select>
            </div>
            <div>
              <button onClick={handlePay} disabled={loading} className="px-3 py-2 bg-blue-600 text-white rounded">{loading ? 'Saving...' : 'Record Payment'}</button>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          <h4 className="font-medium">Payment History</h4>
          <div className="mt-2 space-y-2 text-sm">
            {payments.length===0 && <div className="text-slate-500">No payments recorded.</div>}
            {payments.map(p => (
              <div key={p.id} className="flex justify-between items-center bg-slate-50 p-2 rounded">
                <div>
                  <div className="font-medium">{p.method}</div>
                  <div className="text-xs text-slate-500">{new Date(p.createdAt).toLocaleString()}</div>
                </div>
                <div className="font-semibold">Rp {Number(p.amount).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={() => onUpdate && onUpdate(order.id, 'In Process')} className="px-3 py-2 bg-yellow-400 rounded">In Process</button>
          <button onClick={() => onUpdate && onUpdate(order.id, 'Ready')} className="px-3 py-2 bg-green-600 text-white rounded">Ready</button>
          <button onClick={() => onUpdate && onUpdate(order.id, 'Delivered')} className="px-3 py-2 bg-slate-600 text-white rounded">Delivered</button>
        </div>
      </div>
    </div>
  )
}
