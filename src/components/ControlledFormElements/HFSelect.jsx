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
        {required && <span style={{ color: '#27E6D6' }}> *</span>}
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
              fullWidth
              onChange={(e) => {
                onChange(e.target.value)
              }}
              className={styles.select}
              label={null}
              {...props}
              MenuProps={{
                MenuListProps: {
                  className: classNames(styles.menu, 'menu-list')
                },
                PaperProps: {
                  style: {
                    borderRadius: '7px'
                  }
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
