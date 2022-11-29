export const MuiButton = {
  styleOverrides: {
    root: {
      fontSize: '15px',
      lineHeight: '22.5px',
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
    containedPrimary: {
      backgroundColor: 'var(--text-color)',
      '&:hover': {
        backgroundColor: 'var(--text-color)',
        color: '#fff',
        opacity: 0.8
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
};
