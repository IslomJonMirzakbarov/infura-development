import styles from './style.module.scss';
import WalletLogic from 'layouts/WallerLogic';
import { useForm } from 'react-hook-form';
import HFTextField from 'components/ControlledFormElements/HFTextField';
import { NavLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { authActions } from 'store/auth/auth.slice';

export default function Login() {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm({});
  const onSubmit = (data) => {
    dispatch(authActions.login());
  };

  return (
    <WalletLogic title="Login" hidePreviusLink>
      <div className={styles.box}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HFTextField
            fullWidth={true}
            name="email"
            label="Email"
            control={control}
            placeholder="Enter your email"
            required={true}
          />
          <HFTextField
            fullWidth={true}
            name="password"
            label="Password"
            control={control}
            required={true}
            placeholder="Enter your password"
            type="password"
            mb={0}
          />
          <NavLink to="/reset">
            <Typography
              color="primary"
              fontSize="10px"
              lineHeight="15px"
              fontWeight={500}
            >
              Forget Password
            </Typography>
          </NavLink>
          <Box display="flex" justifyContent="center" mt="95px">
            <Button type="submit">Login</Button>
          </Box>
        </form>
      </div>
    </WalletLogic>
  );
}
