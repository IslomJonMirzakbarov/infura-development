import BasicModal from 'components/BasicModal'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import { useTranslation } from 'react-i18next'

const GatewayModal = ({
  open,
  toggle,
  onSubmit,
  control,
  isLoading,
  serverError,
  setServerError
}) => {
  const { t } = useTranslation()
  const error =
    serverError === 'pool already exists' ? 'pool_exist' : serverError

  return (
    <BasicModal
      open={open}
      handleClose={toggle}
      cancelLabel={t('cancel')}
      submitLabel={t('Create')}
      onCancel={toggle}
      onSubmit={onSubmit}
      title='Create folder'
      isLoading={isLoading}
    >
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <BasicTextField
          name='name'
          control={control}
          placeholder={t('Folder name')}
          fullWidth
          required
          color='secondary'
          // minLength={5}
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
            {t(error)}
          </p>
        )}
      </form>
    </BasicModal>
  )
}

export default GatewayModal
