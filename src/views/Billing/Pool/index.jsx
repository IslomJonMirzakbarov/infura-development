import { Box, Button, Typography } from '@mui/material';
import HFSelect from 'components/ControlledFormElements/HFSelect';
import HFTextField from 'components/ControlledFormElements/HFTextField';
import React from 'react';
import { useForm } from 'react-hook-form';

const sizes = [
  {
    label: 'TB',
    value: 'TB'
  },
  {
    label: 'GB',
    value: 'GB'
  }
];

const Pool = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      type: 'TB',
      pin: 10
    }
  });

  const onSubmit = (data) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: '100%', paddingTop: '50px' }}
    >
      <Box display="flex" justifyContent="center">
        <Typography variant="main">Pool Form</Typography>
      </Box>
      <Box display="flex" width="100%">
        <HFTextField
          control={control}
          name="name"
          label="Pool name"
          placeholder="Enter pool name"
          required={true}
          boxProps={{
            width: '100%'
          }}
        />
      </Box>
      <Box
        display="flex"
        width="100%"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <HFTextField
          control={control}
          name="size"
          label="Pool size"
          type="number"
          required={true}
          placeholder="Enter pool size"
          boxProps={{
            width: '89%'
          }}
        />
        <HFSelect
          control={control}
          name="type"
          required={true}
          options={sizes}
          boxProps={{
            width: '10%',
            mb: '2px'
          }}
        />
      </Box>
      <Box display="flex" width="100%">
        <HFTextField
          control={control}
          name="description"
          label="Pool description (Optional)"
          placeholder="Enter pool description"
          rows={4}
          multiline={true}
          boxProps={{
            width: '100%'
          }}
        />
      </Box>
      <Box display="flex" width="100%">
        <HFSelect
          label="Pin replication"
          control={control}
          name="pin"
          required={true}
          options={Array(10)
            .fill('1')
            .map((_, index) => ({
              value: index + 1,
              label: index + 1
            }))}
          boxProps={{
            width: '100%'
          }}
        />
      </Box>
      <Box display="flex" width="100%">
        <HFTextField
          control={control}
          name="estimated"
          label="Estimated pool price"
          placeholder="Enter your estimated pool price"
          required={true}
          type="number"
          boxProps={{
            width: '100%'
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center" width="100%" mt="60px">
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};

export default Pool;
