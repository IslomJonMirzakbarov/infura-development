/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavbarLanding from 'components/Landing/NavbarLanding'
import LandingLayout from '.'

jest.mock('components/Landing/NavbarLanding', () => () => (
  <div data-testid='navbar-landing' />
))

describe('LandingLayout', () => {
  it('should render the NavbarLanding component and the Outlet', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <LandingLayout />
      </MemoryRouter>
    )

    expect(getByTestId('navbar-landing')).toBeInTheDocument()

    expect(getByTestId('container')).toBeInTheDocument()
  })
})
