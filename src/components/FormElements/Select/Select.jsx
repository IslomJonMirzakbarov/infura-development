import styles from './style.module.scss'
import RcSelect from 'react-select'

const colourStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#fff',
    border: '1px solid #E8E8E8',
    borderColor: isFocused ? 'var(--primary-color)!important' : '#E8E8E8',
    boxShadow: 'none',
    height: '45px',
    transition: 'all .25s ease-in-out',
    '&:hover': {
      border: '1px solid var(--primary-color)'
    },
    borderRadius: '7px'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: 'transparent',
      color: 'white',
      cursor: isDisabled ? 'not-allowed' : 'default'
    }
  },
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({
    ...styles,
    color: '#7D8890',
    fontSize: '15px',
    lineHeight: '22px',
    fontWeight: 400
  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: '#292929',
    margin: 0,
    fontSize: '15px',
    lineHeight: '22px',
    fontWeight: 500
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: '5px 11px'
  })
  // menu: (styles) => ({
  //   ...styles,
  //   backgroundColor: '#262626'
  // })
}

export default function Select({ placeholder, label, options, ...props }) {
  return (
    <div className={styles.input}>
      <label>{label}</label>
      <RcSelect
        options={options}
        styles={colourStyles}
        components={{
          IndicatorSeparator: () => null
        }}
        {...props}
      />
    </div>
  )
}
