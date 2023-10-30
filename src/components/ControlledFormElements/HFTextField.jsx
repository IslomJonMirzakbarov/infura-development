import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg'

const HFTextField = ({
  control,
  name = '',
  disabledHelperText = false,
  required = false,
  rules = {},
  minLength,
  pattern,
  boxProps,
  label,
  size = 'medium',
  fullWidth = false,
  type = 'text',
  withCopy,
  withRegenerate,
  readOnly = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      width={fullWidth ? '100%' : 'auto'}
      {...boxProps}
    >
      {label && (
        <Typography color='white' variant='standard' fontWeight={500} mb={1}>
          {label}
          {required && <span style={{ color: '#27E6D6' }}> *</span>}
        </Typography>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue=''
        rules={{
          required: required ? 'This field is required.' : false,
          ...(minLength && {
            minLength: {
              value: minLength,
              message: 'Password should be at least 8 characters long'
            }
          }),
          ...(pattern && {
            pattern: {
              value: pattern,
              message: 'Invalid email format'
            }
          }),
          ...rules
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextField
              size={size}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              name={name}
              error={error}
              helperText={!disabledHelperText && (error?.message ?? ' ')}
              fullWidth={fullWidth}
              type={showPassword ? 'text' : type}
              InputProps={{
                readOnly: readOnly,
                endAdornment: (
                  <>
                    {withCopy && (
                      <InputAdornment position='end'>
                        <IconButton aria-label='toggle coppy' edge='end'>
                          <CopyIcon />
                        </IconButton>
                      </InputAdornment>
                    )}
                    {type === 'password' && (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? (
                            <VisibilityOff
                              style={{
                                color: '#C2C2C2'
                              }}
                            />
                          ) : (
                            <Visibility
                              style={{
                                color: '#C2C2C2'
                              }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )}
                  </>
                )
              }}
              {...props}
            />

            {withRegenerate && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <InputAdornment position='start'>
                  <IconButton
                    aria-label='regenerate'
                    edge='end'
                    onClick={withRegenerate}
                  >
                    <Typography
                      style={{
                        color: '#27E6D6',
                        cursor: 'pointer',
                        fontSize: '13px',
                        lineHeight: '19.5px',
                        fontWeight: '500'
                      }}
                    >
                      Regenerate
                    </Typography>
                  </IconButton>
                </InputAdornment>
              </div>
            )}
          </>
        )}
      />
    </Box>
  )
}

export default HFTextField
