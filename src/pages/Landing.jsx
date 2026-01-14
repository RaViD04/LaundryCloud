import React from 'react'
import OrderIcon from '../components/icons/OrderIcon'
import InventoryIcon from '../components/icons/InventoryIcon'
import TasksIcon from '../components/icons/TasksIcon'
import CustomerIcon from '../components/icons/CustomerIcon'

export default function Landing({ onStart }){
  return (
    <div className="max-w-6xl mx-auto">
      <section className="bg-gradient-to-r from-sky-50 to-white rounded-lg p-8 md:p-12 shadow-md flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">LaundryCloud — Digitalisasi Operasional Laundry</h1>
          <p className="mt-3 text-slate-600">Kelola order, pickup, inventory, tugas karyawan dan laporan dalam satu platform ringan. Cocok untuk laundry kiloan, premium, dan franchise.</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={() => onStart && onStart()} className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:brightness-105">Mulai Demo</button>
            <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} className="px-5 py-3 bg-white border rounded-lg">Lihat Fitur</button>
          </div>

          <div className="mt-6 text-sm text-slate-500">
            <strong>Pricing:</strong> Free — up to 50 orders / bulan · Basic Rp99k · Pro Rp199k
          </div>
        </div>

        {/* removed UI preview placeholder per request */}
      </section>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Untuk Pemilik & Operasional</h3>
          <ul className="mt-3 space-y-3 text-slate-600">
            <li className="flex items-center gap-3">
              <OrderIcon className="h-6 w-6 text-blue-600" />
              <span>Order management & pickup scheduling</span>
            </li>
            <li className="flex items-center gap-3">
              <InventoryIcon className="h-6 w-6 text-blue-600" />
              <span>Inventory control & low-stock alerts</span>
            </li>
            <li className="flex items-center gap-3">
              <TasksIcon className="h-6 w-6 text-blue-600" />
              <span>Employee task assignment & tracking</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v6H3zM3 15h18v6H3z" /></svg>
              <span>Financial reports & export</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold">Untuk Customer</h3>
          <ul className="mt-3 space-y-3 text-slate-600">
            <li className="flex items-center gap-3">
              <OrderIcon className="h-6 w-6 text-indigo-600" />
              <span>Order creation & pickup scheduling</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3 8 4-16 3 8h4" /></svg>
              <span>Real-time order tracking</span>
            </li>
            <li className="flex items-center gap-3">
              <CustomerIcon className="h-6 w-6 text-indigo-600" />
              <span>Digital receipts & order history</span>
            </li>
            <li className="flex items-center gap-3">
              <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/></svg>
              <span>WhatsApp notifications (mock)</span>
            </li>
          </ul>
        </div>
      </div>

      <section className="mt-8">
        <h3 className="text-xl font-semibold">Pricing</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="p-4 bg-white rounded shadow text-center">
            <div className="font-semibold">Free</div>
            <div className="mt-2 text-sm text-slate-500">Up to 50 orders / month</div>
          </div>
          <div className="p-4 bg-white rounded shadow text-center border-2 border-blue-50">
            <div className="font-semibold">Basic</div>
            <div className="mt-2 text-sm text-slate-500">Rp 99k / bulan — 200 orders</div>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <div className="font-semibold">Pro</div>
            <div className="mt-2 text-sm text-slate-500">Rp 199k / bulan — unlimited</div>
          </div>
        </div>
      </section>
    </div>
  )
}
