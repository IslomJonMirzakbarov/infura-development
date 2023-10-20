import { Box } from '@mui/material'
import BasicModal from 'components/BasicModal'
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg'
import styles from './style.module.scss'

const ApiKeyModal = ({ open, toggle, title, onSubmit }) => {
  return (
    <BasicModal
      open={open}
      handleClose={toggle}
      submitLabel='Continue'
      onCancel={toggle}
      onSubmit={onSubmit}
      title={title || 'Your API key'}
    >
      <Box className={styles.text}>
        <p>f2aa6f1c48e66fdd537d</p>
        <CopyIcon />
      </Box>
    </BasicModal>
  )
}

export default ApiKeyModal
