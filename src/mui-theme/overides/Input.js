// ----------------------------------------------------------------------

export const MuiInput = {
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        padding: '15px',
        color: '#fff',
        '&::placeholder': {
          color: '#fff;'
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
        background: 'rgba(255, 255, 255, 0.15)',
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#27E6D6'
          }
        },

        '&.MuiInputBase-colorSecondary': {
          background: '#F3F4F6',
          '& .MuiOutlinedInput-notchedOutline': {
            border: '1.5px solid #E9E9E9',
            transition: '0.4s ease-in-out all',
            borderWidth: '1.5px!important',
            '&:hover': {
              borderColor: '#27E6D6'
            }
          },
          '& input': {
            color: '#fff',
            '&::placeholder': {
              color: '#7D8890;'
            }
          }
        },

        '& .MuiOutlinedInput-notchedOutline': {
          border: '1.5px solid #5C5A64',
          transition: '0.4s ease-in-out all',
          borderWidth: '1.5px!important',
          '&:hover': {
            borderColor: '#27E6D6'
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
            borderColor: '#27E6D6'
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
}
