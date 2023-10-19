import { Box } from '@mui/material'
import BasicModal from 'components/BasicModal'
import HFTextField from 'components/ControlledFormElements/HFTextField'

const GatewayModal = ({ open, toggle, onSubmit, handleSubmit, control }) => {
  return (
    <BasicModal
      open={open}
      handleClose={toggle}
      cancelLabel='Cancel'
      submitLabel='Continue'
      onCancel={toggle}
      onSubmit={onSubmit}
      title='Storage Pool name'
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <HFTextField
          name='name'
          control={control}
          placeholder='Enter gateway name'
          fullWidth
          required
          color='secondary'
        />

        <Box>
          <ul
            style={{
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '21px',
              color: '#959595',
              listStyle: 'none'
            }}
          >
            <li>- Description of gateway name.</li>
            <li>- What is gateway name?</li>
            <li>- Where can I use it?</li>
          </ul>
        </Box>
      </form>
    </BasicModal>
  )
}

export default GatewayModal
