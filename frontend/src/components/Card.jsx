import React from 'react'

function Card({ title, value }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow">
      <div className="text-md font-medium">{title}</div>
      <div className="mt-2 text-4xl font-semibold">{value}</div>
    </div>
  )
}

export default Card