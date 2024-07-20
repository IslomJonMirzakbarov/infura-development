/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react'
import FooterLanding from '.'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

describe('FooterLanding Component', () => {
  beforeEach(() => {
    process.env.REACT_APP_BASE_URL = 'https://mainnet.example.com'
  })

  test('renders the mainnet logo when on mainnet', () => {
    render(<FooterLanding />)
    expect(screen.getByTestId('LogoM')).toBeInTheDocument()
  })

  test('renders the testnet logo when not on mainnet', () => {
    process.env.REACT_APP_BASE_URL = 'https://testnet.example.com'
    render(<FooterLanding />)
    expect(screen.getByTestId('LogoT')).toBeInTheDocument()
  })

  test('renders the description text', () => {
    render(<FooterLanding />)
    expect(screen.getByText('oceanDrive_description')).toBeInTheDocument()
  })
})
