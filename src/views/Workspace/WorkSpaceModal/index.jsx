import { Box, Typography } from '@mui/material'
import { ReactComponent as DeleteTrashIcon } from 'assets/icons/delete_trash_icon.svg'
import { ReactComponent as HiFiveIcon } from 'assets/icons/hi_five.svg'
import BasicModal from 'components/BasicModal'

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
  const isLogout = title === 'Bye Bye'
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
          {isLogout
            ? 'Are you sure you want to log out?'
            : 'Are you sure you want to delete items?'}
        </Typography>
        {isLogout ? <HiFiveIcon /> : <DeleteTrashIcon />}
      </Box>
    </BasicModal>
  )
}

export default WorkSpaceModal
