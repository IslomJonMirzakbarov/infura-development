import { Box, Button, LinearProgress, Modal, Typography } from '@mui/material'
import BasicModal from 'components/BasicModal'
import { ReactComponent as LoaderIcon } from 'assets/icons/loader_infinite.svg'
import { ReactComponent as ProtsentCloud } from 'assets/icons/protsent-cloud.svg'
import { ReactComponent as CloseIcon } from 'assets/icons/x-btn.svg'
import styles from './style.module.scss'
import styled from '@emotion/styled'

const CancelBtn = styled(Button)({
  width: '150px',
  height: '55px',
  borderRadius: '10px',
  background: '#3F3F5D',
  fontWeight: '700',
  fontSize: '14px',
  lineHeight: '21px',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#141332',
    borderColor: 'none',
    boxShadow: 'none'
  }
})

const LinearPr = styled(LinearProgress)({
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#27e6d6',
    borderRadius: '100px'
  }
})

const ProgressLoader = ({
  open,
  toggle,
  title = { title: 'Uploading...', percent: 0 },
  onSubmit
}) => {
  return (
    <Modal
      open={open}
      handleClose={toggle}
      submitLabel='loader'
      onCancel={toggle}
    >
      <Box className={styles.loader}>
        <CloseIcon className={styles.closeIcon} onClick={toggle} />

        <Typography className={styles.title}>
          {title?.title || 'Uploading...'}
        </Typography>
        <Typography className={styles.text}>
          Just give us a moment to process your file.
        </Typography>

        {title?.title === 'Downloading...' ? (
          <div className={styles.downloading}>
            <LoaderIcon />
          </div>
        ) : (
          <div className={styles.progressDiv}>
            <LinearPr
              variant='determinate'
              value={title?.percent || 0}
              className={styles.progressBar}
            />
            <Box className={styles.protsentChecker}>
              <p>{title?.percent || 0}%</p>
              <ProtsentCloud />
            </Box>
          </div>
        )}

        <Box className={styles.buttonContainer}>
          <CancelBtn onClick={toggle}>Cancel</CancelBtn>
        </Box>
      </Box>
    </Modal>
  )
}

export default ProgressLoader
