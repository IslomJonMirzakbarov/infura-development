import { Box } from '@mui/material'
import Container from 'components/Container'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CardsContainer from './CardsContainer'
import GatewayModal from './GatewayModal'
import { useNavigate } from 'react-router-dom'
import { usePoolCheckMutation } from 'services/pool.service'

const Billing = () => {
  const { control, handleSubmit } = useForm()
  const { mutate } = usePoolCheckMutation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState(null)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const toggle = () => {
    setOpen((prev) => !prev)
  }

  const onSelect = (data) => {
    setItem(data)
    toggle()
  }

  const onSubmit = (data) => {
    const formData = { pool_name: data.name }
    setIsLoading(true)
    mutate(formData, {
      onSuccess: (res) => {
        setSuccess(res?.success)
        setIsLoading(false)
        if (item.isFree) {
          navigate('/main/billing/confirm', {
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
        setError(error?.data?.message)
      }
    })
  }

  return (
    <Container maxWidth={true}>
      <GatewayModal
        error={error}
        open={open}
        cancelLabel='Cancel'
        submitLabel='Continue'
        toggle={toggle}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        isLoading={isLoading}
      />
      <CardsContainer onSelect={onSelect} />
    </Container>
  )
}

export default Billing
