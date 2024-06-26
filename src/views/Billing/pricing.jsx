import Container from 'components/Container'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CardsContainer from './CardsContainer'
import GatewayModal from './GatewayModal'
import { useNavigate } from 'react-router-dom'
import { usePoolCheckMutation } from 'services/pool.service'
import walletStore from 'store/wallet.store'
import PageTransition from 'components/PageTransition'
import styles from './style.module.scss'

const Billing = () => {
  const { control, handleSubmit } = useForm()
  const { mutate } = usePoolCheckMutation()
  const navigate = useNavigate()
  const walletAddress = walletStore.address
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState(null)
  const [success, setSuccess] = useState(null)
  const [serverError, setServerError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const toggle = () => {
    setOpen((prev) => !prev)
  }

  const onSelect = (data) => {
    console.log('data: ', data.name)
    if (data.name === 'Enterprise' && walletAddress) {
      navigate('/main/billing/pool')
    } else if (data.name === 'Enterprise' && !walletAddress) {
      navigate('/main/billing/connect')
    } else {
      setItem(data)
      toggle()
    }
  }

  const onSubmit = (data) => {
    const formData = { pool_name: data.name }
    setIsLoading(true)
    mutate(formData, {
      onSuccess: (res) => {
        setSuccess(res?.success)
        setIsLoading(false)
        if (item.isFree) {
          navigate('/main/pricing/confirm', {
            state: {
              poolName: data.name
            }
          })
        } else {
          navigate('/main/billing/pool')
        }
      },
      onError: (error) => {
        setIsLoading(false)
        setServerError(error?.data?.message)
      }
    })
  }

  return (
    <PageTransition>
      <Container maxWidth={true} className={styles.container}>
        <GatewayModal
          serverError={serverError}
          open={open}
          cancelLabel='Cancel'
          submitLabel='Continue'
          toggle={toggle}
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          isLoading={isLoading}
          setServerError={setServerError}
        />
        <CardsContainer onSelect={onSelect} />
      </Container>
    </PageTransition>
  )
}

export default Billing


{/* <Modal
        open={isCreateFolderModalOpen}
        onClose={() => setCreateFolderModalOpen(false)}
        aria-labelledby='create-folder-modal-title'
        aria-describedby='create-folder-modal-description'
      >
        <Box>
          <Typography id='create-folder-modal-title' variant='h6'>
            Create Folder
          </Typography>
          <TextField
            fullWidth
            label='Folder Name'
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box>
            <Button
              onClick={() => setCreateFolderModalOpen(false)}
              variant='outlined'
              color='primary'
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFolder}
              variant='contained'
              color='secondary'
              sx={{
                background: 'linear-gradient(90deg, #27E6D6 0%, #0052D9 100%)',
                color: '#fff'
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal> */}
