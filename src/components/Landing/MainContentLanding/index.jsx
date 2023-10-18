import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import middleIcon from 'assets/images/landing/middle_icon2.svg'
import demoCardPhoto from 'assets/images/landing/demo_card_photo.png'
import leftArrow from 'assets/images/landing/left_arrow.svg'
import rightArrow from 'assets/images/landing/right_arrow.svg'
import nextBtn from 'assets/images/landing/next_btn.svg'
import { Box, Button, Typography } from '@mui/material'
import styles from './style.module.scss'
import { features, items, stats } from './data'

const MainContentLanding = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.mainContainer}>
      <Box className={styles.smallDescDiv}>
        <Box className={styles.titleSection}>
          <Typography variant='h1' className={styles.oceanDriveTxt}>
            OceanDrive
          </Typography>
          <Typography variant='h4' className={styles.infuraTxt}>
            Infura
          </Typography>
        </Box>

        <Typography className={styles.description}>
          OceanDrive is a decentralized storage platform that <br /> utilizes
          unused storage space among network participants <br /> to connect the
          global online and offline <br /> economy and provide a model for
          sustainable growth.
        </Typography>

        <Button className={styles.goToBtn}>Go to dashboard</Button>
      </Box>

      <Box className={styles.statsDiv}>
        <Typography
          variant='h6'
          color='white'
          gutterBottom
          className={styles.titleNS}
        >
          OceanDrive's <br /> Network Stats
        </Typography>

        {/* <div className={styles.statBoxesHolder}> */}
        {stats.map((stat) => (
          <Box className={styles.stats}>
            <Typography className={styles.statTitle}>
              {stat.statTitle}
            </Typography>
            <Box className={styles.statBox}>
              <Typography
                variant='subtitle1'
                color='white'
                className={styles.statNum}
              >
                {stat.statNum}
              </Typography>
              <Typography
                variant='body2'
                color='gray'
                className={styles.statCap}
              >
                {stat.statCap}
              </Typography>
            </Box>
          </Box>
        ))}
        {/* </div> */}
      </Box>

      <div className={styles.featuresContainer}>
        {features.map((feature) =>
          feature.middleIcon ? (
            <Box className={styles.middleIcon}>
              <img src={middleIcon} alt='middle-icon' />
            </Box>
          ) : (
            <Box className={styles.featureCol}>
              {feature.map((featureItem) => (
                <Box>
                  <Typography
                    className={styles.featureTitle}
                    dangerouslySetInnerHTML={{ __html: featureItem.title }}
                  />
                  <Typography
                    className={styles.featureText}
                    dangerouslySetInnerHTML={{ __html: featureItem.text }}
                  />
                </Box>
              ))}
            </Box>
          )
        )}
      </div>
      <div className={styles.whatsNewContainer}>
        <Typography variant='h5'>What's New</Typography>
        <div className={styles.itemsContainer}>
          <img src={leftArrow} alt='left' className={styles.arrow} />
          <div className={styles.items}>
            {items.map((item, index) => (
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
          <img src={rightArrow} className={styles.arrow} alt='right' />
        </div>
      </div>
    </div>
  )
}

export default MainContentLanding
