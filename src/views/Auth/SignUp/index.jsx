import WalletLogic from 'layouts/WallerLogic';
import { useForm } from 'react-hook-form';
import HFTextField from 'components/ControlledFormElements/HFTextField';
import { Box, Button } from '@mui/material';

export default function Signup() {
  const { control, handleSubmit } = useForm({});
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <WalletLogic
      title="Create an account"
      label="Already have an account?<br/>Login here."
      btnLabel="Login"
      link="/"
      hidePreviusLink
    >
      <Box width="100%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HFTextField
            fullWidth={true}
            name="email"
            label="Email"
            placeholder="Enter your email"
            required={true}
            control={control}
          />
          <HFTextField
            fullWidth={true}
            name="password"
            label="Password"
            placeholder="Enter your password"
            control={control}
            mb={0}
            type="password"
            required={true}
          />
          <Box display="flex" justifyContent="center" mt="95px">
            <Button type="submit">Sign Up</Button>
          </Box>
        </form>
      </Box>
    </WalletLogic>
  );
}
