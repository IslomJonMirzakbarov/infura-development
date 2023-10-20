export const MuiButton = {
  styleOverrides: {
    root: {
      fontSize: '14px',
      lineHeight: 'normal',
      fontWeigth: 700,
      color: '#fff',
      height: 55,
      minWidth: 150,
      transition: 'all 0.25s ease-in-out',
      textTransform: 'none',
      borderRadius: '10px',
      '&.Mui-disabled': {
        backgroundColor: '#858585',
        color: '#000'
      }
    },
    outlinedLight: {
      backgroundColor: 'transparent',
      border: '1px solid #fff',
      color: '#fff'
    },
    outlined: {
      backgroundColor: 'transparent',
      border: '1px solid #0E42E5',
      color: '#0E42E5'
    },
    containedPrimary: {
      background: 'linear-gradient(97deg, #27E6D6 3.65%, #130FCC 81.9%)',
      '&:hover': {
        background: '#27E6D6',
        color: '#fff'
      }
    },
    containedInfo: {
      background: 'rgba(255, 255, 255, 0.15)',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.15)',
        opacity: 0.7,
        color: '#fff'
      }
    },
    containedSecondary: {
      background: '#27E6D6',
      '&:hover': {
        background: 'linear-gradient(97deg, #27E6D6 3.65%, #130FCC 81.9%)',
        color: '#fff'
      }
    },
    textPrimary: {
      backgroundColor: 'var(--primary-color)',
      '&:hover': {
        backgroundColor: '#0433AA'
      }
    },
    sizeMedium: {
      padding: '11.5px 28px'
    },
    sizeSmall: {
      padding: '7px 13px',
      fontSize: '12px',
      lineHeight: '18px'
    }
  }
}
