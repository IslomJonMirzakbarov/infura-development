import Container from 'components/Container'
import Header from 'components/Header'
import PageTransition from 'components/PageTransition'
import { Outlet } from 'react-router-dom'

export default function ProfileLayout() {
  return (
    <PageTransition>
      <Header title='Profile' />
      <Container>
        <Outlet />
      </Container>
    </PageTransition>
  )
}
