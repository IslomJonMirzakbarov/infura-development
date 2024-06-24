import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Table from './index'

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}))

jest.mock('components/CopyButton', () => () => (
  <div data-testid='copy-button'>CopyButton</div>
))
jest.mock('utils/formatTime', () => jest.fn(() => 'formatted time'))
jest.mock('utils/utilFuncs', () => ({
  formatNumberWithCommas: jest.fn((number) => number.toString())
}))

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'domain', title: 'Domain' },
  { key: 'access', title: 'Access' },
  { key: 'created_at', title: 'Created At' },
  { key: 'price', title: 'Price' }
]

const data = [
  {
    id: '123',
    domain: 'example.com',
    access: 'Open',
    created_at: '2024-01-01',
    price: '100'
  }
]

test('renders Table component with column headers', () => {
  render(<Table columns={columns} data={data} isLoading={false} />)

  columns.forEach((column) => {
    expect(screen.getByText(column.title)).toBeInTheDocument()
  })
})
