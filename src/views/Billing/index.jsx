import { Box } from '@mui/material';
import Container from 'components/Container';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import CardsContainer from './CardsContainer';
import GatewayModal from './GatewayModal';

const Billing = () => {
  const { control, handleSubmit } = useForm();

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  const onSelect = (data) => {
    toggle();
  };

  const onSubmit = (data) => {};

  return (
    <Container maxWidth={true}>
      <Box
        width="100%"
        height="calc(100vh - 160px)"
        display="flex"
        alignItems="center"
      >
        <GatewayModal
          open={open}
          cancelLabel="Cancel"
          submitLabel="Continue"
          toggle={toggle}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          control={control}
        />
        <CardsContainer onSelect={onSelect} />
      </Box>
    </Container>
  );
};

export default Billing;
