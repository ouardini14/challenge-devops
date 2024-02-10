import React from 'react'

export default function Loader({width,height,color}) {
  return (
<div className="flex justify-center items-center">
  <div className={`spinner-border animate-spin inline-block w-${width} h-${height} border-4 rounded-full ${color}`}  role="status">
    <span className="visually-hidden"></span>
  </div>
</div>
  )
}
