import React from 'react'

export default function TasksIcon({ className='h-5 w-5' }){
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M9 11l2 2 4-4" />
      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 12.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9.5" />
    </svg>
  )
}
