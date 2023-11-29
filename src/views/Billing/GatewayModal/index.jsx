import { Box } from '@mui/material'
import BasicModal from 'components/BasicModal'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import HFTextField from 'components/ControlledFormElements/HFTextField'

const GatewayModal = ({
  open,
  toggle,
  onSubmit,
  control,
  isLoading,
  serverError,
  setServerError
}) => {
  return (
    <BasicModal
      open={open}
      handleClose={toggle}
      cancelLabel='Cancel'
      submitLabel='Continue'
      onCancel={toggle}
      onSubmit={onSubmit}
      title='Storage Pool Name'
      isLoading={isLoading}
    >
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <BasicTextField
          name='name'
          control={control}
          placeholder='Enter pool name'
          fullWidth
          required={!serverError}
          color='secondary'
          minLength={!serverError ? 5 : 0}
          serverError={serverError}
          setServerError={setServerError}
        />

        {serverError && (
          <p
            style={{
              color: 'red',
              margin: '-20px 0 5px 10px',
              fontSize: '14px'
            }}
          >
            {serverError}
          </p>
        )}

        {/* <Box>
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
        </Box> */}
      </form>
    </BasicModal>
  )
}

export default GatewayModal
