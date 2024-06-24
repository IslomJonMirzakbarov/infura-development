/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import Faq from '.'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

const theme = createTheme()

describe('Faq', () => {
  it('should render the FAQ title', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Faq />
      </ThemeProvider>
    )
    expect(getByText('FAQ')).toBeInTheDocument()
  })

  it('should filter FAQs based on search input', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <ThemeProvider theme={theme}>
        <Faq />
      </ThemeProvider>
    )

    const searchInput = getByPlaceholderText('Search')
    fireEvent.change(searchInput, { target: { value: 'storage' } })

    expect(getByText('why_create_storage')).toBeInTheDocument()
    expect(
      queryByText('difference_from_oceandrive_app')
    ).not.toBeInTheDocument()
  })

  it('should display "No Results" when no FAQs match the search input', () => {
    const { getByPlaceholderText, getByText } = render(
      <ThemeProvider theme={theme}>
        <Faq />
      </ThemeProvider>
    )

    const searchInput = getByPlaceholderText('Search')
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } })

    expect(getByText('No Results')).toBeInTheDocument()
  })
})
