import { Box, Typography } from '@mui/material'
import BasicModal from 'components/BasicModal'
import { ReactComponent as DeleteTrashIcon } from 'assets/icons/delete_trash_icon.svg'

const WorkSpaceModal = ({
  open,
  handleClose,
  onSubmit,
  cancelLabel,
  isLoading,
  submitLabel,
  onCancel,
  title
}) => {
  return (
    <BasicModal
      open={open}
      handleClose={handleClose}
      cancelLabel={cancelLabel}
      submitLabel={submitLabel}
      onCancel={onCancel}
      onSubmit={onSubmit}
      title={title}
      isLoading={isLoading}
    >
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography
          fontWeight='500'
          fontSize='13px'
          lineHeight='19.5px'
          color='#292929'
          marginBottom='35px'
        >
          Are you sure you want to delete items?
        </Typography>
        <DeleteTrashIcon />
      </Box>
    </BasicModal>
  )
}

export default WorkSpaceModal
