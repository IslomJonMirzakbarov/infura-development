import { Tooltip, tooltipClasses } from '@mui/material'
import { styled } from '@mui/material/styles'
import unionImage from 'assets/images/union.png'

export const poolNames = [
  'OD_EVENT_POOL_01',
  'OD_EVENT_POOL_02',
  'OD_EVENT_POOL_03',
  'OD_EVENT_POOL_04',
  'OD_EVENT_POOL_05',
  'OD_EVENT_POOL_06',
  'OD_EVENT_POOL_07',
  'OD_EVENT_POOL_08',
  'OD_EVENT_POOL_09',
  'OD_EVENT_POOL_10'
]

export const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    PopperProps={{
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, -40]
          }
        }
      ]
    }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background:
      'linear-gradient(90deg, #0E5DF8 0%, #0F4EE0 31.03%, #1026A3 96.31%, #10249F 100%)',
    borderRadius: '100px',
    width: '123px',
    height: '23px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '11px',
    color: '#fff',
    boxShadow: theme.shadows[1],
    backgroundImage: `url(${unionImage})`
  }
}))
