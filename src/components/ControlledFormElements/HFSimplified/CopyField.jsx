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
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg'

const CopyField = ({
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
  const { value, disabled, placeholder } = props

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
        <Typography color='white' variant='standard' fontWeight={500} mb={1}>
          {label}
          {required && !readOnly && (
            <span style={{ color: '#27E6D6' }}> *</span>
          )}
        </Typography>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue=''
        rules={{
          required: required ? 'This field is required.' : false,
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
              type='text'
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
                  </>
                )
              }}
              {...props}
            />
          </>
        )}
      />
    </Box>
  )
}

export default CopyField
