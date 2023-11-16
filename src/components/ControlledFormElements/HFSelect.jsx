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
          required: required ? 'This is required field' : false,
          ...rules
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Select
              value={value || ''}
              size='large'
              error={error}
              inputProps={{ placeholder }}
              renderValue={(selected) => {
                if (name === 'period') {
                  return `${selected} ${selected === 1 ? 'month' : 'months'}`
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
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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
