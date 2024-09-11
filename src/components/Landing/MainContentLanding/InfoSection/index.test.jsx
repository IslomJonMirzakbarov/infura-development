/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react'
import InfoSection from '.'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

describe('InfoSection Component', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width:600px)',
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))
  })

  test('renders the header text', () => {
    render(<InfoSection />)
    expect(screen.getByText('oceandrive_infura_empowers')).toBeInTheDocument()
  })

  test('renders the description text', () => {
    render(<InfoSection />)
    expect(screen.getByText('your_business_description')).toBeInTheDocument()
  })

  test('renders all option titles and handles selection', () => {
    render(<InfoSection />)
    const optionTitles = [
      'worldwide_title',
      'empower_title',
      'developer_title',
      'data_assurance_title'
    ]

    optionTitles.forEach((title, index) => {
      const optionElement = screen.getByText(
        new RegExp(`0${index + 1} ${title}`, 'i')
      )
      expect(optionElement).toBeInTheDocument()

      fireEvent.mouseEnter(optionElement)
      expect(screen.getByText(title)).toBeInTheDocument()

      fireEvent.click(optionElement)
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })

  test('formats description correctly on mobile', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(max-width:600px)',
      addListener: jest.fn(),
      removeListener: jest.fn()
    }))

    render(<InfoSection />)
    expect(screen.getByText('your_business_description')).toBeInTheDocument()
  })

  test('renders the correct icon and description for selected option', () => {
    render(<InfoSection />)

    const developerOption = screen.getByText(/developer_title/i)
    fireEvent.click(developerOption)
    expect(screen.getByText('developer_description')).toBeInTheDocument()
    expect(screen.getByTestId('DeveloperIcon')).toBeInTheDocument()

    const dataAssuranceOption = screen.getByText(/data_assurance_title/i)
    fireEvent.click(dataAssuranceOption)
    expect(screen.getByText('data_assurance_description')).toBeInTheDocument()
    expect(screen.getByTestId('DataIcon')).toBeInTheDocument()
  })
})
