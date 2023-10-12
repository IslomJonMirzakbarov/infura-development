import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <nav>
        <ul>
          <li onClick={() => navigate('/register')}>Signup</li>
          <li onClick={() => navigate('/login')}>Login</li>
        </ul>
      </nav>
    </div>
  )
}

export default LandingPage
