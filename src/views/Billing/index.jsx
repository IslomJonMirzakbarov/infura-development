import { Box } from '@mui/material'
import Container from 'components/Container'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import CardsContainer from './CardsContainer'
import GatewayModal from './GatewayModal'
import { useNavigate } from 'react-router-dom'

const Billing = () => {
  const { control, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((prev) => !prev)

  const onSelect = (data) => {
    toggle()
  }

  const onSubmit = (data) => {
    navigate('/main/billing/confirm')
  }

  return (
    <Container maxWidth={true}>
      <GatewayModal
        open={open}
        cancelLabel='Cancel'
        submitLabel='Continue'
        toggle={toggle}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
      />
      <CardsContainer onSelect={onSelect} />
    </Container>
  )
}

export default Billing
