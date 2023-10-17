import { TextField } from '@mui/material'
import styles from './style.module.scss'

export default function Textarea({ placeholder, label, whiteBg, ...props }) {
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <TextField
        multiline
        rows={3}
        InputProps={{
          sx: {
            backgroundColor: whiteBg ? '#fff' : '#F1F3FF'
          }
        }}
        placeholder={placeholder}
        varaint='outlined'
        {...props}
      />
    </div>
  )
}
