import React, { useEffect, useState } from 'react'
import { listNotifications, sendWhatsAppMock } from '../lib/mockApi'

export default function Notifications(){
  const [notes, setNotes] = useState([])
  const [orderId, setOrderId] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function load(){
    setNotes(await listNotifications())
  }

  useEffect(()=>{ load() }, [])

  async function handleSend(){
    if(!orderId || !message) return alert('Masukkan orderId dan pesan')
    setLoading(true)
    try{
      await sendWhatsAppMock(orderId, message)
      setOrderId('')
      setMessage('')
      await load()
      alert('Notification sent (mock)')
    }catch(e){ console.error(e); alert('Gagal mengirim') }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Notifications (Mock)</h2>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-medium">Send WhatsApp (mock)</h3>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <input value={orderId} onChange={e=>setOrderId(e.target.value)} placeholder="Order ID (e.g. ORD-123)" className="p-2 border rounded" />
          <input value={message} onChange={e=>setMessage(e.target.value)} placeholder="Message" className="p-2 border rounded" />
          <button onClick={handleSend} disabled={loading} className="px-3 py-2 bg-blue-600 text-white rounded">{loading ? 'Sending...' : 'Send'}</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-medium">Sent Notifications</h3>
        <div className="mt-3 space-y-2 text-sm">
          {notes.length===0 && <div className="text-slate-500">No notifications yet.</div>}
          {notes.map(n => (
            <div key={n.id} className="p-2 border rounded flex justify-between items-start">
              <div>
                <div className="font-medium">{n.orderId}</div>
                <div className="text-xs text-slate-500">{new Date(n.sentAt).toLocaleString()}</div>
                <div className="mt-1">{n.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
