import { Box } from '@mui/material';
import BasicModal from 'components/BasicModal';
import HFTextField from 'components/ControlledFormElements/HFTextField';
import React from 'react';

const GatewayModal = ({ open, toggle, onSubmit, handleSubmit, control }) => {
  return (
    <BasicModal
      open={open}
      handleClose={toggle}
      cancelLabel="Cancel"
      submitLabel="Continue"
      onCancel={toggle}
      onSubmit={onSubmit}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <HFTextField
          label="Gateway name"
          name="name"
          control={control}
          placeholder="Enter gateway name"
          fullWidth={true}
        />

        <Box my="69px" ml={2}>
          <ul
            style={{
              fontWeight: 500,
              fontSize: 14,
              lineHeight: '21px',
              color: '#B1B1B1'
            }}
          >
            <li>Description of gateway name.</li>
            <li>What is gateway name?</li>
            <li>Where can I use it?</li>
          </ul>
        </Box>
      </form>
    </BasicModal>
  );
};

export default GatewayModal;
