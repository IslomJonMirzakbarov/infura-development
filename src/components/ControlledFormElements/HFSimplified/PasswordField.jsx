import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg'
import { useTranslation } from 'react-i18next'

const PasswordField = ({
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
  serverError,
  setServerError,
  ...props
}) => {
  const { t } = useTranslation()
  const { value, disabled, placeholder } = props
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const [copied, setCopied] = useState(false)

  const handleCopy = (tx) => {
    if (readOnly || disabled) {
      navigator.clipboard.writeText(value)
    } else {
      navigator.clipboard.writeText(tx)
    }
    setCopied(true)
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      width={fullWidth ? '100%' : 'auto'}
      {...boxProps}
    >
      {label && (
        <Typography color='white' variant='standard' fontWeight={500} mb={1} display="flex" alignItems="center">
          {typeof label === 'string' ? t(label) : label}
          {required && !readOnly && (
            <span style={{ color: '#27E6D6', marginLeft: '4px' }}> *</span>
          )}
        </Typography>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue=''
        rules={{
          required: required ? t('field_required') : false,
          ...rules
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextField
              size={size}
              value={value}
              onChange={(e) => {
                onChange(e.target.value)
              }}
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
                        <Tooltip
                          title={copied ? 'Copied!' : 'Copy to clipboard'}
                          placement='top-start'
                        >
                          <IconButton
                            onClick={() => handleCopy(value)}
                            aria-label='toggle coppy'
                            edge='end'
                          >
                            <CopyIcon />
                          </IconButton>
                        </Tooltip>
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
              placeholder={t(placeholder)}
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
                      {t('regenerate')}
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

export default PasswordField
