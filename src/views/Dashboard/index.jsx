import Container from 'components/Container'
import Header from 'components/Header'
import React from 'react'
import { useForm } from 'react-hook-form'
import Boards from './Boards'
import DashboardFilter from './Filter'
import DashboardChart from './Chart'

const Dashboard = () => {
  const { control } = useForm()
  return (
    <>
      {/* <Header title="Dashboard" />
      <Container maxWidth={true}>
        <DashboardFilter control={control} />
        <Boards />
        <DashboardChart />
      </Container> */}
    </>
  )
}

export default Dashboard
