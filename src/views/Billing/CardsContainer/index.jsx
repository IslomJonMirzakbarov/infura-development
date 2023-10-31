import { Grid } from '@mui/material'
import BillingCard from 'components/BillingCard'
import React from 'react'
import poolStore from 'store/pool.store'

// const items = [
//   {
//     name: 'Free',
//     price: 0,
//     storage: '100 GB',
//     gatewayCount: 1,
//     replication: 1,
//     isFree: true
//   },
//   {
//     name: 'Enterprise',
//     text: 'This plan is custom plan for who wants to offer custom packaging. Feel free to contact us.',
//     priceText: 'Get apersonalized plan',
//     isEnterprise: true
//   }
// ]

const CardsContainer = ({ onSelect }) => {
  const items = poolStore.billingItems
  return (
    <>
      <Grid container spacing={2}>
        {items.map((item, key) => (
          <Grid item lg={3}>
            <BillingCard key={item.name} item={item} onSelect={onSelect} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default CardsContainer
