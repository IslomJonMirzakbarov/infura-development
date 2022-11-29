import Header from 'components/Header';
import { Outlet } from 'react-router-dom';
const BillingContainer = () => {
  return (
    <>
      <Header title="Billing" />
      <Outlet />
    </>
  );
};

export default BillingContainer;
