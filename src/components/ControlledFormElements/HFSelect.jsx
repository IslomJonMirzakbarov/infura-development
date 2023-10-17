import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import { Controller } from 'react-hook-form';

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
    <Box display="flex" flexDirection="column" {...boxProps}>
      <Typography variant="standard" fontWeight={500} mb={1}>
        {label}
      </Typography>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{
          required: required ? 'This is required field' : false,
          ...rules
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControl style={{ width }}>
            {/* <InputLabel size="small">{label}</InputLabel> */}
            <Select
              value={value || ''}
              size="small"
              error={error}
              inputProps={{ placeholder }}
              fullWidth
              onChange={(e) => {
                onChange(e.target.value);
              }}
              {...props}
              label={null}
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
          </FormControl>
        )}
      ></Controller>
    </Box>
  );
};

export default HFSelect;
