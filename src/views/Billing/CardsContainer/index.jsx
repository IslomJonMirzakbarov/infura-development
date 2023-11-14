import { Grid } from '@mui/material'
import BillingCard from 'components/BillingCard'
import React from 'react'
import poolStore from 'store/pool.store'

const CardsContainer = ({ onSelect }) => {
  const { isSelected, billingItems, poolCount } = poolStore
  const items = billingItems
  const isDisabled = poolCount > 2

  if (isDisabled && isSelected) {
    items[0].isCurrentPlan = true
    items[0].disabled = true
    items[1].disabled = true
  } else if (!isDisabled && isSelected) {
    items[0].isCurrentPlan = true
    items[0].disabled = true
    items[1].disabled = false
  } else if (isDisabled && !isSelected) {
    items[0].isCurrentPlan = false
    items[0].disabled = true
    items[1].disabled = true
  } else if (!isDisabled && !isSelected) {
    items[0].isCurrentPlan = false
    items[0].disabled = false
    items[1].disabled = false
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
