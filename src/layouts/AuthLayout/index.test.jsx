/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}))

describe('AuthLayout Component', () => {
  const mockNavigate = jest.fn()
  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate)
  })

  test('renders the logo', () => {
    render(
      <MemoryRouter>
        <AuthLayout />
      </MemoryRouter>
    )
    expect(screen.getByAltText('right-bottom-img')).toBeInTheDocument()
    expect(screen.getByAltText('right-bottom-img')).toBeInTheDocument()
  })

  test('navigates to home on logo click', () => {
    render(
      <MemoryRouter>
        <AuthLayout />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('img', { hidden: true }))
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  test('renders the Outlet', () => {
    render(
      <MemoryRouter>
        <AuthLayout />
      </MemoryRouter>
    )

    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
  })
})
