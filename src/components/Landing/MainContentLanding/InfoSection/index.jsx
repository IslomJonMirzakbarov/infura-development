import { Box, Grid, useMediaQuery } from '@mui/material'
import { ReactComponent as DataIcon } from 'assets/images/landing/data-assurance.svg'
import { ReactComponent as DeveloperIcon } from 'assets/images/landing/developer.svg'
import { ReactComponent as EmpowerIcon } from 'assets/images/landing/empower.svg'
import { ReactComponent as WorldwideIcon } from 'assets/images/landing/worldwide.svg'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './style.module.scss'

const optionsData = {
  worldwide: {
    icon: <WorldwideIcon data-testid='WorldwideIcon' />,
    title: 'worldwide_title',
    description: 'worldwide_description'
  },
  empower: {
    icon: <EmpowerIcon data-testid='EmpowerIcon' />,
    title: 'empower_title',
    description: 'empower_description'
  },
  developer: {
    icon: <DeveloperIcon data-testid='DeveloperIcon' />,
    title: 'developer_title',
    description: 'developer_description'
  },
  dataAssurance: {
    icon: <DataIcon data-testid='DataIcon' className={styles.dataIcon} />,
    title: 'data_assurance_title',
    description: 'data_assurance_description'
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
  const { t } = useTranslation()

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
            dangerouslySetInnerHTML={{
              __html: t('oceandrive_infura_empowers')
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: formatDescription(
                t('your_business_description'),
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
                    : undefined
                }
              >
                <p
                  className={styles.text}
                  dangerouslySetInnerHTML={{
                    __html: `${isMobile ? `0${index + 1} ` : ''}${t(
                      optionsData[key].title
                    )}`
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
                selectedOption.title === 'data_assurance_title'
                  ? styles.specialIcon
                  : undefined
              }
            >
              {selectedOption.icon}
            </div>
            <h2
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: t(selectedOption.title) }}
            />
            <p
              className={styles.desc}
              dangerouslySetInnerHTML={{
                __html: formatDescription(
                  t(selectedOption.description),
                  isMobile
                )
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default InfoSection
