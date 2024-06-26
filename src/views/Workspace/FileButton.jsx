import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'

const IconWrapper = styled(Box)({
  transition: 'transform 0.1s ease-in-out'
})

const StyledBox = styled(Box)({
  width: '120px',
  height: '38px',
  borderRadius: '7px',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '9px',
  cursor: 'pointer',
  '&:hover': {
    '& .icon': {
      transform: 'translateY(2px)'
    }
  }
})

export default function FileButton({ handleButtonClick, button }) {
  return (
    <StyledBox
      backgroundColor={button.bgColor}
      gap={button.text === 'Download' ? '7px' : '18px'}
      onClick={() => handleButtonClick(button.action)}
    >
      <IconWrapper className='icon'>{button.Icon}</IconWrapper>
      <Typography
        fontWeight='500'
        fontSize='12px'
        lineHeight='18px'
        color={button.color}
      >
        {button.text}
      </Typography>
    </StyledBox>
  )
}
