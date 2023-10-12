import React, { useState } from 'react'
import { Button, InputLabel, TextField } from '@material-ui/core'
import rightB from 'assets/images/signup/right-bottom.svg'
import leftT from 'assets/images/signup/left-top.svg'
import forwardIcon from 'assets/images/signup/forward-icon.svg'
import oceanDriveLogo from 'assets/images/signup/oceandrive.svg'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false) // New state

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.container}>
      <img src={rightB} alt='right-bottom-img' className={styles.blurImgR} />
      <img src={leftT} alt='right-bottom-img' className={styles.blurImgL} />
      <img
        src={oceanDriveLogo}
        alt='oceandrive-logo'
        className={styles.oceanDriveLogo}
      />
      <form className={styles.form}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles.inputDiv}>
          <InputLabel className={styles.inputLabel}>
            ID Email <span>*</span>
          </InputLabel>
          <TextField
            type='email'
            variant='outlined'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputDiv}>
          <InputLabel className={styles.inputLabel}>
            Password <span>*</span>
          </InputLabel>
          <TextField
            type={showPassword ? 'text' : 'password'}
            variant='outlined'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? (
                      <VisibilityOff color='#C2C2C2;' />
                    ) : (
                      <Visibility color='#C2C2C2;' />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
        <div className={styles.forgotP}>
          <p>Forgot password?</p>
        </div>

        <Button variant='contained' color='primary' className={styles.button}>
          Login
        </Button>
        <div className={styles.alreadyUser}>
          Don't have an account?{'  '}
          <span onClick={() => navigate('/register')}>
            Sign Up <img src={forwardIcon} alt='forward-icon' />
          </span>
        </div>
      </form>
    </div>
  )
}

export default Login
