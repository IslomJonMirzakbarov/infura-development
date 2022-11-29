// ----------------------------------------------------------------------

export const MuiInput = {
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: '15px',
        '&::placeholder': {
          color: '#292929;'
        }
      },
      root: {
        transition: '0.4s ease-in-out all',
        background: '#fff',
        fontSize: '15px',
        lineHeight: '22px',
        position: 'relative',
        height: '55px',
        borderRadius: '7px',
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--primary-color)'
          }
        },

        '& .MuiOutlinedInput-notchedOutline': {
          border: '1.5px solid #E8E8E8',
          transition: '0.4s ease-in-out all',
          borderWidth: '1.5px!important',
          '&:hover': {
            borderColor: 'var(--primary-color)'
          }
        },
        '&.MuiInputBase-sizeSmall': {
          height: '45px',
          '& .MuiInputBase-input': {
            padding: '11px 15px'
          }
        },
        '&.Mui-disabled ': {
          background: '#F3F3F3',
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1.5px solid #E8E8E8'
          }
        },
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--primary-color)'
          }
        },
        '&.MuiInputBase-multiline': {
          height: 'auto',
          '& .MuiInputBase-input': {
            padding: '0'
          }
        }
      }
    }
  }
};
