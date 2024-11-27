import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useDashboard } from 'services/pool.service'
import Dashboard from './index'

// Mock services and libraries
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}))

jest.mock('services/pool.service', () => ({
  useDashboard: jest.fn()
}))

jest.mock('store/pool.store', () => ({
  setPoolCount: jest.fn(),
  setSelected: jest.fn()
}))

jest.mock('components/ControlledFormElements/HFSelect', () => ({
  __esModule: true,
  default: ({ control, name, options, disabled }) => (
    <select data-testid={name} disabled={disabled}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}))

jest.mock('components/BarChart', () => ({
  __esModule: true,
  default: ({ upload, download }) => (
    <div data-testid='bar-chart'>
      Upload: {upload}, Download: {download}
    </div>
  )
}))

const mockData = {
  pools: [
    {
      id: '1',
      name: 'Pool 1',
      price: 'FREE',
      total_size: '1000',
      remaining_size: '500',
      subscribers_count: 10,
      uploaded_files_count: 50,
      downloaded_files_count: 25
    }
  ],
  all: {
    total_size: '2000',
    remaining_size: '1000',
    subscribers_count: 20,
    uploaded_files_count: 100,
    downloaded_files_count: 50
  },
  available_nodes_count: 5
}

describe('Dashboard Component', () => {
  beforeEach(() => {
    useDashboard.mockReturnValue({ data: mockData })
  })

  test('disables select if no pools are available', () => {
    useDashboard.mockReturnValueOnce({ data: { pools: [] } })

    render(
      <Router>
        <Dashboard />
      </Router>
    )

    expect(screen.getByTestId('dashboardPool')).toBeDisabled()
  })

  test('renders without crashing', () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    )

    expect(screen.getByText('create_storage')).toBeInTheDocument()
    expect(
      screen.getByText((content, element) =>
        content.includes('nodes_available')
      )
    ).toBeInTheDocument()
  })

  test('displays pool information correctly', () => {
    render(
      <Router>
        <Dashboard />
      </Router>
    )

    expect(screen.getByText(/pool_size/i)).toBeInTheDocument()
    expect(screen.getByText(/remaining_storage/i)).toBeInTheDocument()
    expect(screen.getByText(/subscribed_nodes/i)).toBeInTheDocument()
    expect(screen.getByText(/uploaded_files/i)).toBeInTheDocument()
  })
})
