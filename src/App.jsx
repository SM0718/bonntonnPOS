import React, { useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Search, Bell, ChevronDown } from 'lucide-react'

function TopBar() {
  return (
    <header className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-surface-50 border border-surface-200 rounded-lg text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="h-6 w-px bg-surface-200" />
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-surface-50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xs font-bold">
            BK
          </div>
          <ChevronDown size={14} className="text-surface-400" />
        </button>
      </div>
    </header>
  )
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-surface-0">
      <Header collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div
        className="transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{ marginLeft: sidebarCollapsed ? 68 : 256 }}
      >
        <TopBar />
        <main className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          background: '#fff',
          color: '#111827',
          borderRadius: '0.75rem',
          border: '1px solid #E5E7EB',
          boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.08)',
          fontSize: '14px',
        }}
      />
    </div>
  )
}

export default App
