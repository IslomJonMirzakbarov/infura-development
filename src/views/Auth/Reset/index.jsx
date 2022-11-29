import WalletLogic from 'layouts/WallerLogic';
import { useForm } from 'react-hook-form';
import HFTextField from 'components/ControlledFormElements/HFTextField';
import { NavLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export default function Reset() {
  const { control, handleSubmit } = useForm({});
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <WalletLogic
      title="Reset password"
      description="Enter your email address below and a reset <br/>link will be sent."
      hidePreviusLink
      label="Need to create an account? <br/>Sign up here."
      btnLabel="Sign Up"
    >
      <Box width="100%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HFTextField
            fullWidth={true}
            name="email"
            label="Email"
            control={control}
            placeholder="Enter your email"
            required={true}
          />
          <Box display="flex" justifyContent="center" mt="95px">
            <Button type="submit">Submit</Button>
          </Box>
          <Typography
            fontSize="10px"
            lineHeight="15px"
            mt={1}
            fontWeight={600}
            display="flex"
            justifyContent="center"
          >
            Already have an account?{' '}
            <NavLink to="/">
              <Typography
                color="primary"
                fontSize="10px"
                lineHeight="15px"
                fontWeight={600}
                textAlign="center"
              >
                &nbsp;Back to Login
              </Typography>
            </NavLink>
          </Typography>
        </form>
      </Box>
    </WalletLogic>
  );
}
