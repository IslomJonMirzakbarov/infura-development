import { TextField } from '@mui/material';
import styles from './style.module.scss';

export default function Input({ placeholder, label, whiteBg, ...props }) {
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <TextField
        placeholder={placeholder}
        InputProps={{
          sx: {
            backgroundColor: whiteBg ? '#fff' : '#F1F3FF'
          }
        }}
        varaint="outlined"
        {...props}
      />
    </div>
  );
}
