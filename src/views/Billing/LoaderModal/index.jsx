import { Box } from '@mui/material'
import BasicModal from 'components/BasicModal'
import { ReactComponent as LoaderIcon } from 'assets/icons/loader_infinite.svg'
import styles from './style.module.scss'

const LoaderModal = ({ open, toggle, title, onSubmit }) => {
  return (
    <BasicModal
      open={open}
      handleClose={toggle}
      submitLabel='loader'
      onCancel={toggle}
    >
      <Box className={styles.loader}>
        <LoaderIcon />
        <p>Loading...</p>
      </Box>
    </BasicModal>
  )
}

export default LoaderModal
