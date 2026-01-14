import React, { useState } from 'react'
import { useAuth } from '../lib/auth'

export default function Navbar({ onNavigate }){
  const [open, setOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const auth = useAuth()

  function toggleDropdown(name){
    setOpenDropdown(prev => prev === name ? null : name)
  }

  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded flex items-center justify-center text-white font-bold shadow">LC</div>
          <div>
            <div className="font-semibold text-slate-800">LaundryCloud</div>
            <div className="text-xs text-slate-500">Smart Laundry Management</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded">
            <svg className="h-4 w-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" /></svg>
            Home
          </button>

          <div className="relative">
            <button onClick={() => toggleDropdown('business')} className="text-sm text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded">Business</button>
            {openDropdown === 'business' && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-20">
                <button onClick={() => onNavigate('business-orders')} className="w-full text-left p-3 hover:bg-slate-50">Order Management</button>
                <button onClick={() => onNavigate('inventory')} className="w-full text-left p-3 hover:bg-slate-50">Inventory</button>
                <button onClick={() => onNavigate('tasks')} className="w-full text-left p-3 hover:bg-slate-50">Employee Tasks</button>
                <button onClick={() => onNavigate('reports')} className="w-full text-left p-3 hover:bg-slate-50">Reports</button>
                    <button onClick={() => onNavigate('notifications')} className="w-full text-left p-3 hover:bg-slate-50">Notifications</button>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => toggleDropdown('customers')} className="text-sm text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded">Customers</button>
            {openDropdown === 'customers' && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-20">
                <button onClick={() => onNavigate('order')} className="w-full text-left p-3 hover:bg-slate-50">Create Order</button>
                <button onClick={() => onNavigate('tracking')} className="w-full text-left p-3 hover:bg-slate-50">Track Order</button>
                <button onClick={() => onNavigate('crm')} className="w-full text-left p-3 hover:bg-slate-50">Customer DB</button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {auth && auth.user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-700">{auth.user.name[0]}</div>
                <div className="text-sm text-slate-700">{auth.user.name}</div>
                <button onClick={() => auth.logout()} className="ml-2 text-sm text-slate-500 hover:text-slate-700">Logout</button>
              </div>
            ) : (
              <button onClick={() => auth && auth.openLogin && auth.openLogin()} className="px-3 py-1 bg-blue-600 text-white rounded">Login</button>
            )}
          </div>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open menu" className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-6xl mx-auto p-3 flex flex-col gap-2">
            <button onClick={() => { onNavigate('landing'); setOpen(false) }} className="text-left p-2 rounded hover:bg-slate-50">Home</button>

            <details className="p-2 rounded">
              <summary className="cursor-pointer">Business</summary>
              <div className="mt-2 flex flex-col gap-1 pl-3">
                <button onClick={() => { onNavigate('business-orders'); setOpen(false) }} className="text-left p-2 rounded hover:bg-slate-50">Order Management</button>
                <button onClick={() => { onNavigate('inventory'); setOpen(false) }} className="text-left p-2 rounded hover:bg-slate-50">Inventory</button>
                <button onClick={() => { onNavigate('tasks'); setOpen(false) }} className="text-left p-2 rounded hover:bg-slate-50">Employee Tasks</button>
                <button onClick={() => { onNavigate('reports'); setOpen(false) }} className="text-left p-2 rounded hover:bg-slate-50">Reports</button>
                    <button onClick={() => { onNavigate('notifications'); setOpen(false) }} className="text-left p-2 rounded hover:bg-slate-50">Notifications</button>
              </div>
            </details>

            <details className="p-2 rounded">
              <summary className="cursor-pointer">Customers</summary>
              <div className="mt-2 flex flex-col gap-1 pl-3">
                <button onClick={() => { onNavigate('order'); setOpen(false) }} className="text-left p-2 rounded hover:bg-slate-50">Create Order</button>
                <button onClick={() => { onNavigate('tracking'); setOpen(false) }} className="text-left p-2 rounded hover:bg-slate-50">Track Order</button>
                <button onClick={() => { onNavigate('crm'); setOpen(false) }} className="text-left p-2 rounded hover:bg-slate-50">Customer DB</button>
              </div>
            </details>
          </div>
        </div>
      )}
    </header>
  )
}
