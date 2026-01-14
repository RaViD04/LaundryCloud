import React from 'react'

export default function Sparkline({ points = [], width = 200, height = 40, stroke = '#0ea5e9' }){
  if(!points || points.length === 0) return <svg width={width} height={height} />
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const step = width / (points.length - 1)
  const path = points.map((p,i) => {
    const x = i * step
    const y = height - ((p - min) / range) * height
    return `${i===0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
  }).join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path d={path} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}
