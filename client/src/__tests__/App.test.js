import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders header correctly', () => {
    render(<App />);
    const headerElement = screen.getByText(/Employee Management System online/i);
    expect(headerElement).toBeInTheDocument();
})