import { Grid } from '@mui/material'
import BillingCard from 'components/BillingCard'
import React from 'react'
import poolStore from 'store/pool.store'

const CardsContainer = ({ onSelect }) => {
  const { isSelected, billingItems, poolCount } = poolStore
  const isSelectedPool = isSelected
  const items = billingItems
  const isDisabled = poolCount > 2
  console.log('isDisabled: ', isDisabled)
  if (isSelectedPool) {
    items[0].isCurrentPlan = true
    items[0].disabled = true
  }
  if (isDisabled) {
    items[0].disabled = true
    items[1].disabled = true
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
