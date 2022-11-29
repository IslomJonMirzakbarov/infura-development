import { Box } from '@mui/material';

import HFSelect from 'components/ControlledFormElements/HFSelect';
import HFTextField from 'components/ControlledFormElements/HFTextField';
import React from 'react';

const DashboardFilter = ({ control }) => {
  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <HFSelect
        control={control}
        label="Date Granularity"
        name="granularity"
        options={[]}
        boxProps={{
          width: '19%'
        }}
      />
      <HFTextField
        control={control}
        type="date"
        label="Sign up Date"
        name="signup_date"
        boxProps={{
          width: '19%'
        }}
      />
      <HFSelect
        control={control}
        label="Date Range"
        name="date"
        options={[]}
        boxProps={{
          width: '19%'
        }}
      />
      <HFSelect
        control={control}
        label="Include One Time"
        name="one_time"
        options={[]}
        boxProps={{
          width: '19%'
        }}
      />
      <HFTextField
        control={control}
        label="SKU Filter"
        name="sku"
        boxProps={{
          width: '19%'
        }}
      />
    </Box>
  );
};

export default DashboardFilter;
