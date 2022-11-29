import styles from './style.module.scss';
import logo from 'assets/logos/logo_white.svg';
import bg from 'assets/images/bg.svg';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export default function WalletLogic({
  title = 'Login',
  label = 'Already have an account? <br/>Login here.',
  btnLabel = 'Sign up',
  link = '/register',
  children,
  description
}) {
  const navigate = useNavigate();

  return (
    <Box className={styles.container}>
      <img className={styles.img} src={bg} alt="bg" />
      <Box className={styles.box_img}>
        <img
          src={logo}
          alt="logo"
          className={styles.logo}
          width={252}
          height={75}
        />

        <Typography
          variant="standard"
          color="white"
          mt="77px"
          dangerouslySetInnerHTML={{
            __html: label
          }}
        />
        <Button variant="outlinedLight" onClick={() => navigate(link)}>
          {btnLabel}
        </Button>
      </Box>
      <Box className={styles.box}>
        <Box display="flex" flexDirection="column" mb="97px">
          <Typography variant="main">{title}</Typography>
          {description && (
            <Typography
              fontSize="13px"
              fontWeight={500}
              mt={1}
              dangerouslySetInnerHTML={{
                __html: description
              }}
            />
          )}
        </Box>
        {children}
      </Box>
    </Box>
  );
}
