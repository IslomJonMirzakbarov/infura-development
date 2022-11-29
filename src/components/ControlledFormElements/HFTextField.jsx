import { Box, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

const HFTextField = ({
  control,
  name = '',
  disabledHelperText = false,
  required = false,
  rules = {},
  boxProps,
  ...props
}) => {
  return (
    <Box display="flex" flexDirection="column" {...boxProps}>
      <Typography variant="standard" fontWeight={500} mb={1}>
        {props?.label}
      </Typography>
      <Controller
        control={control}
        name={name}
        defaultValue=""
        rules={{
          required: required ? `Provided ${name} is incorrect` : false,
          ...rules
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            size="small"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            name={name}
            error={error}
            helperText={!disabledHelperText && (error?.message ?? ' ')}
            {...props}
            label={null}
          />
        )}
      ></Controller>
    </Box>
  );
};

export default HFTextField;
