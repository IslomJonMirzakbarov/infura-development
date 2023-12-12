import React, { useState } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import styles from '../style.module.scss'
import demoCardPhoto from 'assets/images/landing/demo_card_photo.png'
import leftArrow from 'assets/images/landing/left_arrow.svg'
import rightArrow from 'assets/images/landing/right_arrow.svg'
import nextBtn from 'assets/images/landing/next_btn.svg'
import { items } from '../data'

const WhatsNew = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleClick = () => {}
  const mobileItems = [items[0]]

  return (
    <div className={styles.whatsNewContainer}>
      <Typography variant='h5'>What's New</Typography>
      <div className={styles.itemsContainer}>
        <img
          src={leftArrow}
          alt='left'
          className={styles.arrow}
          onClick={() => handleClick()}
        />
        <div className={styles.items}>
          {(isMobile ? mobileItems : items).map((item, index) => (
            <div key={index} className={styles.item}>
              <img
                src={
                  item.image === 'demoCardPhoto' ? demoCardPhoto : item.image
                }
                alt={`Item ${index + 1}`}
              />
              <div className={styles.titleDesc}>
                <Typography variant='h6'>{item.title}</Typography>
                <Typography variant='body2'>{item.description}</Typography>
                <Box className={styles.nextBtn}>
                  <img src={nextBtn} alt='next-btn' />
                </Box>
              </div>
            </div>
          ))}
        </div>
        <img
          src={rightArrow}
          className={styles.arrow}
          alt='right'
          onClick={() => handleClick()}
        />
      </div>
    </div>
  )
}

export default WhatsNew
