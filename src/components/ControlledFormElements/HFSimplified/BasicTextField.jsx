import { Box, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <Box
      display='flex'
      flexDirection='column'
      width={fullWidth ? '100%' : 'auto'}
      {...boxProps}
    >
      {label && (
        <Typography color='white' variant='standard' fontWeight={500} mb={1}>
          {t(label)}
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
          required: required ? t('field_required') : false,
          ...(minLength && {
            minLength: {
              value: minLength,
              message:
                placeholder === 'enter_pool_name'
                  ? t(`pool_name_min_length`)
                  : `${name} should be at least ${minLength} characters`
            }
          }),
          ...(pattern && {
            pattern: {
              value: pattern,
              message: t('invalid_email_format')
            }
          }),
          ...rules
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          const formatNumberWithCommas = (numberString) => {
            return numberString
              .replace(/\D/g, '')
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }

          const handlePriceChange = (e) => {
            const unformattedValue = e.target.value.replace(/,/g, '')
            // if (!isNaN(unformattedValue) && unformattedValue.trim() !== '') {
            //   const formattedValue = formatNumberWithCommas(unformattedValue)
            //   onChange(unformattedValue)
            //   e.target.value = formattedValue
            // } else {
            //   onChange('')
            // }
            if (unformattedValue === '' || unformattedValue === '0') {
              onChange('')
            } else if (
              !isNaN(unformattedValue) &&
              unformattedValue.trim() !== ''
            ) {
              const formattedValue = formatNumberWithCommas(unformattedValue)
              onChange(unformattedValue)
              e.target.value = formattedValue
            }
          }
          return (
            <>
              <TextField
                size={size}
                value={name === 'price' ? formatNumberWithCommas(value) : value}
                onChange={(e) => {
                  if (name === 'price') {
                    handlePriceChange(e)
                  } else {
                    onChange(e.target.value)
                  }
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
                placeholder={t(placeholder)}
              />
            </>
          )
        }}
      />
    </Box>
  )
}

export default BasicTextField
