import { Container, Typography, useMediaQuery } from '@mui/material'
import styles from './style.module.scss'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { useTranslation } from 'react-i18next'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: '1px solid #4b4b4b'
  },
  background: 'transparent'
}))

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor: 'transparent',
    padding: '15px 0',
    '& .MuiAccordionSummary-content': {
      margin: 0
    },
    '& .MuiSvgIcon-root': {
      color: '#7D8890'
    }
  })
)

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '15px 17px',
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  background: 'rgba(255, 255, 255, 0.15)'
}))

const localFaqs = [
  {
    id: '1',
    question: 'why_create_storage',
    answer: 'storage_creation_explanation'
  },
  {
    id: '2',
    question: 'how_to_use_storage',
    answer: 'usage_explanation'
  },
  {
    id: '3',
    question: 'difference_from_oceandrive_app',
    answer: 'oceandrive_app_explanation'
  },
  {
    id: '4',
    question: 'where_to_use_api_key',
    answer: 'api_key_usage_explanation'
  },
  {
    id: '5',
    question: 'where_files_stored',
    answer: 'files_stored_explanation'
  },
  {
    id: '6',
    question: 'can_providers_access_files',
    answer: 'providers_access_explanation'
  }
]

export default function Faq({ faqs }) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [items, setItems] = useState([])
  const isMobile = useMediaQuery('(max-width:600px)')

  useEffect(() => {
    if (search) {
      setItems(
        localFaqs.filter(
          (item) =>
            item.question.toLowerCase().includes(search.toLowerCase()) ||
            item.answer.toLowerCase().includes(search.toLowerCase())
        )
      )
    } else {
      setItems(localFaqs)
    }
  }, [search, localFaqs])

  return (
    <Container className={styles.container}>
      <div className={styles.faq}>
        <Typography
          align='center'
          variant='h2'
          color='#fff'
          fontSize={isMobile ? '24px' : '55px'}
          fontWeight={700}
        >
          FAQ
        </Typography>
        <div className={styles.search}>
          <input
            name='search'
            placeholder='Search'
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className={styles.icon} />
        </div>
        <div className={styles.accordion}>
          {items?.length > 0 ? (
            items.map((item) => (
              <Accordion key={item.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography fontWeight='500' color='#fff' fontSize='15px'>
                    {t(item.question)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color='#fff' fontSize='12px'>
                    {t(item.answer)}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <div className={styles.empty}>
              {/* <img src='/images/faq.png' alt='faq' /> */}
              <p>No Results</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
