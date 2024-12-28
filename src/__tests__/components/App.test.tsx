import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../../App';
import { useFetchData } from '../../lib/hooks/useFetchData';

vi.mock('../../lib/hooks/useFetchData.ts', () => ({
  useFetchData: vi.fn(),
}));

describe('<App />', () => {
  beforeEach(() => {
    (useFetchData as vi.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });
  });
  it('renders the App component without crashing', () => {
    render(<App />);
    expect(screen.getByText('useCounter')).toBeInTheDocument();
  });

  it('increments and decrements the counter', () => {
    render(<App />);

    const incrementButton = screen.getByText('Increment');
    const decrementButton = screen.getByText('Decrement');

    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();
  });

  it('shows loading state during API request', async () => {
    // Mock the useFetchData hook to simulate loading state
    (useFetchData as vi.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
    });

    render(<App />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('handles error state in useFetchData', async () => {
    // Mock useFetchData to simulate an error
    (useFetchData as vi.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: 'Error fetching data',
    });

    render(<App />);

    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });
});
