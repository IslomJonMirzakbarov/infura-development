import React from 'react'
import { useLocation } from 'react-router-dom'

const Workspace = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const pool = queryParams.get('pool')

  return (
    <div>
      <h1>Workspace</h1>
      {pool && <p>Selected Pool: {pool}</p>}
    </div>
  )
}

export default Workspace
