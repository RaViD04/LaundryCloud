import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Order from './pages/Order'
import Tracking from './pages/Tracking'
import BusinessOrders from './pages/BusinessOrders'
import Inventory from './pages/Inventory'
import Tasks from './pages/Tasks'
import CRM from './pages/CRM'
import Reports from './pages/Reports'
import Notifications from './pages/Notifications'
import Sidebar from './components/Sidebar'
import { AuthProvider } from './lib/auth'
import AuthModal from './components/AuthModal'

export default function App(){
  const [route, setRoute] = useState('landing')

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar onNavigate={setRoute} />
        <div className="max-w-6xl mx-auto p-6 grid gap-6 md:grid-cols-12">
          {['dashboard','business-orders','inventory','tasks','crm','reports'].includes(route) && (
            <div className="md:col-span-3">
              <Sidebar onNavigate={setRoute} active={route} />
            </div>
          )}

          <main className={`${['dashboard','business-orders','inventory','tasks','crm','reports'].includes(route) ? 'md:col-span-9' : 'md:col-span-12'}`}>
            {route === 'landing' && <Landing onStart={() => setRoute('dashboard')} />}
            {route === 'dashboard' && <Dashboard />}
            {route === 'order' && <Order onCreated={(id) => setRoute('tracking')} />}
            {route === 'tracking' && <Tracking />}
            {route === 'business-orders' && <BusinessOrders />}
            {route === 'inventory' && <Inventory />}
            {route === 'tasks' && <Tasks />}
            {route === 'crm' && <CRM />}
            {route === 'reports' && <Reports />}
            {route === 'notifications' && <Notifications />}
          </main>
        </div>
        <AuthModal />
      </div>
    </AuthProvider>
  )
}
