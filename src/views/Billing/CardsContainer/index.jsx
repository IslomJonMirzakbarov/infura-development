import { Grid } from '@mui/material'
import BillingCard from 'components/BillingCard'
import React from 'react'

const items = [
  {
    name: 'Free',
    price: 0,
    storage: '100 GB',
    gatewayCount: 1,
    replication: 1,
    isCurrentPlan: true
  },
  // {
  //   name: 'Intro',
  //   price: 50,
  //   storage: '1 TB',
  //   gatewayCount: 3,
  //   replication: 3
  //   // disabled: true
  // },
  // {
  //   name: 'Popular',
  //   price: 100,
  //   storage: '10 TB',
  //   gatewayCount: 5,
  //   replication: 10
  //   // disabled: true
  // },
  {
    name: 'Enterprise',
    text: 'This plan is custom plan for who wants to offer custom packaging. Feel free to contact us.',
    priceText: 'Get apersonalized plan',
    isEnterprise: true
  }
]

const CardsContainer = ({ onSelect }) => {
  return (
    <>
      <Grid container spacing={2}>
        {items.map((item, key) => (
          <Grid item lg={3}>
            <BillingCard key={key} {...item} onSelect={onSelect} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default CardsContainer
