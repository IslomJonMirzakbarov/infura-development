import React, { useState } from 'react'
import { Box, Grid, useMediaQuery } from '@mui/material'
import styles from './style.module.scss'
import { ReactComponent as WorldwideIcon } from 'assets/images/landing/worldwide.svg'
import { ReactComponent as EmpowerIcon } from 'assets/images/landing/empower.svg'
import { ReactComponent as DeveloperIcon } from 'assets/images/landing/developer.svg'
import { ReactComponent as DataIcon } from 'assets/images/landing/data-assurance.svg'

const optionsData = {
  worldwide: {
    icon: <WorldwideIcon />,
    title: 'Worldwide',
    description:
      'OceanDrive Infura provides secure and accessible decentralized <br /> storage solutions that function as a global storage network, bringing <br /> together storage resources from around the world.'
  },
  empower: {
    icon: <EmpowerIcon />,
    title: 'Empower',
    description:
      'OceanDrive Infura empowers users to take control <br /> of their data and digital assets, ensuring they remain <br /> secure and accessible on a global scale'
  },
  developer: {
    icon: <DeveloperIcon />,
    title: 'Developer',
    description:
      'OceanDrive Infura facilitate seamless integration of <br /> decentralized storage solutions through APIs, allowing developers <br /> to securely store digital assets within their applications.'
  },
  dataAssurance: {
    icon: <DataIcon className={styles.dataIcon} />,
    title: 'Data Assurance',
    description:
      "You'll never have to worry about losing your data, <br /> ensuring its safety and accessibility."
  }
}

const formatDescription = (description, isMobile) => {
  if (isMobile) {
    return description.replace(/<br\s*\/?>/gi, ' ')
  }
  return description
}

const InfoSection = () => {
  const [selectedOption, setSelectedOption] = useState(optionsData.worldwide)
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleOptionSelect = (optionKey) => {
    setSelectedOption(optionsData[optionKey])
  }

  const handleOptionHover = (optionKey) => {
    setSelectedOption(optionsData[optionKey])
  }
  return (
    <Box className={styles.infoSection}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h2
            className={styles.header}
            dangerouslySetInnerHTML={{ __html: 'OceanDrive Infura empowers' }}
          />
        </Grid>
        <Grid item xs={12}>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: formatDescription(
                `
      Your business by providing a robust and secure decentralized storage
      and synchronization platform. <br /> We help you work efficiently,
      deliver content seamlessly, and foster innovation across the globe,
      ensuring <br /> your data is accessible and protected wherever you
      go.
    `,
                isMobile
              )
            }}
          />
        </Grid>

        <Grid item xs={12} className={styles.options}>
          <ul>
            {Object.keys(optionsData).map((key, index) => (
              <li
                key={key}
                onMouseEnter={() => handleOptionHover(key)}
                onClick={() => handleOptionSelect(key)}
                className={
                  selectedOption.title === optionsData[key].title
                    ? styles.activeOption
                    : ''
                }
              >
                <p
                  className={styles.text}
                  dangerouslySetInnerHTML={{
                    __html: `${isMobile ? `0${index + 1} ` : ''}${
                      optionsData[key].title
                    }`
                  }}
                />
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12}>
          <Box className={styles.optionDesc}>
            <div
              className={
                selectedOption.title === 'Data Assurance' && styles.specialIcon
              }
            >
              {selectedOption.icon}
            </div>
            <h2
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: selectedOption.title }}
            />
            <p
              className={styles.desc}
              dangerouslySetInnerHTML={{
                __html: formatDescription(selectedOption.description, isMobile)
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default InfoSection
