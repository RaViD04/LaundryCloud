import React from 'react'

export default function CustomerIcon({ className='h-5 w-5' }){
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6 20a6 6 0 0 1 12 0" />
    </svg>
  )
}
