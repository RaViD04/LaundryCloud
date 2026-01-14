import React from 'react'

export default function Sidebar({ onNavigate, active }){
  const items = [
    ['dashboard','Overview'],
    ['business-orders','Orders'],
    ['inventory','Inventory'],
    ['tasks','Tasks'],
    ['crm','Customers'],
    ['reports','Reports'],
    ['notifications','Notifications'],
  ]

  return (
    <aside className="w-64 hidden md:block">
      <div className="sticky top-4 p-4 bg-white rounded shadow">
        <nav className="flex flex-col gap-1">
          {items.map(([k,label]) => (
            <button key={k} onClick={() => onNavigate(k)} className={`text-left p-2 rounded ${active===k ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>{label}</button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
