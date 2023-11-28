import { Box, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

const BasicTextField = ({
  control,
  name = '',
  disabledHelperText = false,
  required = false,
  rules = {},
  minLength,
  pattern,
  boxProps,
  label,
  readOnly = false,
  size = 'medium',
  fullWidth = false,
  type = 'text',
  serverError,
  setServerError,
  ...props
}) => {
  const { placeholder } = props

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
          ...(minLength && {
            minLength: {
              value: minLength,
              message:
                placeholder === 'Enter pool name'
                  ? `Pool name should be at least ${minLength} characters`
                  : `${name} should be at least ${minLength} characters`
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
              onChange={(e) => {
                onChange(e.target.value)
                if (serverError && name === 'name') {
                  setServerError(null)
                }
              }}
              name={name}
              error={error}
              helperText={!disabledHelperText && (error?.message ?? ' ')}
              fullWidth={fullWidth}
              type={type}
              {...props}
            />
          </>
        )}
      />
    </Box>
  )
}

export default BasicTextField