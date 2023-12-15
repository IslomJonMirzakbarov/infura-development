export const MuiButton = {
  styleOverrides: {
    root: {
      fontSize: '14px',
      lineHeight: 'normal',
      fontWeight: '700',
      color: '#fff',
      minWidth: 150,
      transition: 'all 0.25s ease-in-out',
      textTransform: 'none',
      borderRadius: '10px',
      boxShadow: 'none',
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
      border: '1px solid #FFF',
      color: '#fff',
      '&:hover': {
        border: '1px solid #FFF',
        color: '#27E6D6'
      }
    },
    containedPrimary: {
      background: 'linear-gradient(97deg, #27E6D6 3.65%, #130FCC 81.9%)',
      '&:hover': {
        background: '#27E6D6',
        color: '#fff'
      },
      '& .MuiCircularProgress-root': {
        width: '20px!important',
        height: '20px!important'
      },
      '& .MuiCircularProgress-svg': {
        color: '#fff'
      }
    },
    containedInfo: {
      background: 'rgba(255, 255, 255, 0.15)',
      '@media (max-width: 600px)': {
        background: 'rgba(77, 77, 77, 0.15)',
        color: '#545454'
      },
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
    unstyled: {
      '&:hover': {
        background: 'transparent',
        color: '#27E6D6'
      }
    },
    sizeMedium: {
      padding: '11.5px 28px',
      height: 55
    },
    sizeSmall: {
      padding: '11px 13px',
      fontSize: '15px',
      lineHeight: 'normal',
      height: 45
    }
  }
}
