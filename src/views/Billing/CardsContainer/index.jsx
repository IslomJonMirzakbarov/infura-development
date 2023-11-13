import { Grid } from '@mui/material'
import BillingCard from 'components/BillingCard'
import React from 'react'
import poolStore from 'store/pool.store'

const CardsContainer = ({ onSelect }) => {
  const isSelected = poolStore.isSelected
  const items = poolStore.billingItems
  if (isSelected) {
    items[0].isCurrentPlan = true
    items[0].disabled = true
  }
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
