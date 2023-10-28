import { Box } from '@mui/material'
import BasicModal from 'components/BasicModal'
import HFTextField from 'components/ControlledFormElements/HFTextField'

const GatewayModal = ({
  open,
  toggle,
  onSubmit,
  control,
  error,
  isLoading
}) => {
  console.log('error: ', error)
  return (
    <BasicModal
      open={open}
      handleClose={toggle}
      cancelLabel='Cancel'
      submitLabel='Continue'
      onCancel={toggle}
      onSubmit={onSubmit}
      title='Storage Pool name'
      isLoading={isLoading}
    >
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <HFTextField
          name='name'
          control={control}
          placeholder='Enter pool name'
          fullWidth
          required
          color='secondary'
        />

        {error && (
          <p
            style={{
              color: 'red',
              margin: '-20px 0 14px 10px',
              fontSize: '14px'
            }}
          >
            {error}
          </p>
        )}

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
