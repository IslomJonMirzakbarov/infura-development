/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { MemoryRouter } from 'react-router-dom'
import { useLoginMutation } from 'services/auth.service'
import Login from './Login'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: jest.requireActual('react-router-dom').NavLink,
  useNavigate: jest.fn()
}))

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn()
}))

jest.mock('services/auth.service', () => ({
  useLoginMutation: jest.fn()
}))

jest.mock('store/auth.store', () => ({
  login: jest.fn()
}))

jest.mock('store/wallet.store', () => ({
  logout: jest.fn()
}))

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

describe('Login Component', () => {
  const mockNavigate = jest.fn()
  const mockMutate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    // eslint-disable-next-line no-undef
    useNavigate.mockReturnValue(mockNavigate)
    useForm.mockReturnValue({
      control: {},
      handleSubmit: (fn) => (e) => {
        e.preventDefault()
        fn()
      }
    })
    useLoginMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false
    })
  })

  test('renders the login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    expect(screen.getByText('login')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('email_placeholder')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText('password_placeholder')
    ).toBeInTheDocument()
    expect(screen.getByText('forgot_password')).toBeInTheDocument()
    expect(screen.getByText('login')).toBeInTheDocument()
    expect(screen.getByText('dont_have_account')).toBeInTheDocument()
    expect(screen.getByText('sign_up')).toBeInTheDocument()
  })

  test('handles form submission successfully', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    const mockData = { email: 'test@example.com', password: 'password123' }
    fireEvent.change(screen.getByPlaceholderText('email_placeholder'), {
      target: { value: mockData.email }
    })
    fireEvent.change(screen.getByPlaceholderText('password_placeholder'), {
      target: { value: mockData.password }
    })

    fireEvent.click(screen.getByText('login'))
    expect(mockMutate).toHaveBeenCalledWith(mockData, expect.any(Object))
  })

  test('handles form submission error with navigation', () => {
    useLoginMutation.mockReturnValue({
      mutate: (data, { onError }) => {
        onError({ status: 404 })
      },
      isLoading: false
    })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('login'))
    expect(mockNavigate).toHaveBeenCalledWith('/auth/register')
  })

  test('handles sign up navigation', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByText('sign_up'))
    expect(mockNavigate).toHaveBeenCalledWith('/auth/register')
  })
})
