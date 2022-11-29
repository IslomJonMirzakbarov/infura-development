// https://mui.com/material-ui/customization/theming/

import { createTheme } from '@mui/material';
import {
  MuiButton,
  MuiDialog,
  MuiContainer,
  MuiInput,
  MuiTypography
} from './overides';

export default createTheme({
  typography: {
    fontFamily: 'Poppins'
  },
  components: {
    MuiButton,
    MuiDialog,
    MuiContainer,
    ...MuiInput,
    MuiTypography
  }
});
