import { DatePicker } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

const HFDatePicker = ({
  control,
  className,
  name,
  label,
  width,
  inputProps,
  disabledHelperText,
  placeholder,
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
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className={className}>
            <DatePicker
              inputFormat="dd.MM.yyyy"
              mask="__.__.____"
              toolbarFormat="dd.MM.yyyy"
              value={value}
              name={name}
              onChange={onChange}
              {...props}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ width }}
                  size="small"
                  error={error}
                  helperText={!disabledHelperText && (error?.message ?? ' ')}
                  {...inputProps}
                  inputProps={{
                    ...params.inputProps,
                    placeholder
                  }}
                  label={null}
                />
              )}
            />
          </div>
        )}
      ></Controller>
    </Box>
  );
};

export default HFDatePicker;
