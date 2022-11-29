import { Box } from '@mui/material';
import Container from 'components/Container';
import Header from 'components/Header';
import { Outlet, useLocation } from 'react-router-dom';
const BillingContainer = () => {
  return (
    <>
      <Header title="Billing" />
      <Container>
        <Box
          width="100%"
          height="calc(100vh - 160px)"
          display="flex"
          alignItems="center"
        >
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default BillingContainer;
