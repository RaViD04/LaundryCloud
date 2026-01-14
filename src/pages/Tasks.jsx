import React, { useEffect, useState } from 'react'
import { listTasks, listEmployees, createTask, updateTask } from '../lib/mockApi'

export default function Tasks(){
  const [tasks, setTasks] = useState([])
  const [emps, setEmps] = useState([])
  const [title, setTitle] = useState('')
  const [assignee, setAssignee] = useState('')

  useEffect(()=>{ load() }, [])

  async function load(){
    setTasks(await listTasks())
    setEmps(await listEmployees())
  }

  async function handleCreate(){
    if(!title) return
    await createTask({ title, assignee })
    setTitle('')
    setAssignee('')
    load()
  }

  async function toggleStatus(t){
    const next = t.status === 'done' ? 'pending' : 'done'
    await updateTask(t.id, { status: next })
    load()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Employee Tasks</h2>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-medium">Create Task</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title" className="p-2 border rounded" />
          <select value={assignee} onChange={e=>setAssignee(e.target.value)} className="p-2 border rounded">
            <option value="">Unassigned</option>
            {emps.map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
          </select>
        </div>
        <div className="mt-3">
          <button onClick={handleCreate} className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {tasks.map(t => (
          <div key={t.id} className="bg-white p-3 rounded shadow flex items-center justify-between">
            <div>
              <div className="font-medium">{t.title}</div>
              <div className="text-sm text-slate-500">Assignee: {t.assignee || '—'}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`text-sm ${t.status==='done' ? 'text-green-600' : 'text-slate-600'}`}>{t.status}</div>
              <button onClick={() => toggleStatus(t)} className="px-2 py-1 bg-slate-100 rounded">Toggle</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
