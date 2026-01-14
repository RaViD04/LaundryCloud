import React, { useState } from 'react'
import { useAuth } from '../lib/auth'

export default function AuthModal(){
  const { showLogin, openLogin, closeLogin, login } = useAuth()
  const [name, setName] = useState('')

  if(!showLogin) return null

  function handleSubmit(e){
    e.preventDefault()
    if(!name) return
    login(name)
    setName('')
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold">Sign in (mock)</h3>
        <p className="text-sm text-slate-500">Masuk sebagai user demo untuk melihat fitur bisnis.</p>
        <form onSubmit={handleSubmit} className="mt-4">
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nama" className="w-full p-2 border rounded" />
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={closeLogin} className="px-3 py-2 rounded bg-slate-100">Cancel</button>
            <button type="submit" className="px-3 py-2 rounded bg-blue-600 text-white">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  )
}
