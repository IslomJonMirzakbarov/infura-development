import {
  Box,
  FormHelperText,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import { Controller } from 'react-hook-form'
import styles from './style.module.scss'
import classNames from 'classnames'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useTranslation } from 'react-i18next'

const HFSelect = ({
  control,
  name,
  label,
  width = '100%',
  options = [],
  disabledHelperText,
  placeholder,
  required = false,
  rules = {},
  boxProps,
  ...props
}) => {
  const { t } = useTranslation()
  return (
    <Box display='flex' flexDirection='column' {...boxProps}>
      <Typography variant='standard' color='#fff' fontWeight={500} mb={1}>
        {label}
        {required && (
          <span
            style={{
              color: '#27E6D6',
              visibility:
                (name === 'unit' || name === 'dashboardPool') && 'hidden'
            }}
          >
            {' '}
            *
          </span>
        )}
      </Typography>
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
            <Select
              value={value || ''}
              size='large'
              error={error}
              inputProps={{ placeholder }}
              displayEmpty
              renderValue={(selected) => {
                if (selected === '') {
                  return (
                    <p
                      style={{
                        color: '#979797',
                        fontSize: '15px',
                        fontWeight: '400'
                      }}
                    >
                      {placeholder}
                    </p>
                  )
                }
                if (name === 'period') {
                  return `${selected} ${
                    selected === 1 ? t('month') : t('months')
                  }`
                }
                if (name === 'dashboardPool') {
                  const selectedOption = options.find(
                    (option) => option.value === selected
                  )
                  const displayLabel = selectedOption
                    ? selectedOption.label
                    : ''

                  return (
                    <Box
                      component='span'
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Typography
                        component='span'
                        variant='subtitle1'
                        fontSize={14}
                        color='#27e6d6'
                        fontWeight={700}
                      >
                        Pool
                      </Typography>
                      <Box component='span' sx={{ width: 21 }} />
                      <Typography
                        component='span'
                        variant='subtitle1'
                        fontSize={15}
                        fontWeight={500}
                      >
                        {displayLabel}
                      </Typography>
                    </Box>
                  )
                }
                return selected
              }}
              fullWidth
              onChange={(e) => {
                onChange(e.target.value)
              }}
              className={styles.select}
              label={null}
              {...props}
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left'
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left'
                },
                getContentAnchorEl: null,
                PaperProps: {
                  style: {
                    maxHeight: '400px',
                    borderRadius: '7px'
                  }
                },
                MenuListProps: {
                  className: classNames(styles.menu, 'menu-list')
                }
              }}
            >
              {/* {placeholder && (
                <MenuItem disabled value=''>
                  {placeholder}
                </MenuItem>
              )} */}
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.label)}
                </MenuItem>
              ))}
            </Select>
            {!disabledHelperText && (
              <FormHelperText error>{error?.message ?? ' '}</FormHelperText>
            )}
          </>
        )}
      />
    </Box>
  )
}

export default HFSelect
