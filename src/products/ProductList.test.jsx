import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import ProductList from './ProductList'

describe('ProductList', () => {
  const fakeProducts = [
    { id: 1, name: 'Tie rod', brand: 'Toyota', price: 6000, category: 'Steering', image: 'https://example.com/1.jpg' },
    { id: 2, name: 'Brake disk', brand: 'Ford', price: 15000, category: 'Brakes', image: 'https://example.com/2.jpg' },
    { id: 3, name: 'Brake caliper', brand: 'Nissan', price: 4000, category: 'Brakes', image: 'https://example.com/3.jpg' },
  ]

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(fakeProducts),
    })
  })

  function renderProductList() {
    return render(
      <MemoryRouter initialEntries={['/shop']}>
        <ProductList />
      </MemoryRouter>,
    )
  }

  it('renders all products once loaded', async () => {
    renderProductList()

    await waitFor(() => {
      expect(screen.getByText('Tie rod')).toBeInTheDocument()
    })

    expect(screen.getByText('Brake disk')).toBeInTheDocument()
    expect(screen.getByText('Brake caliper')).toBeInTheDocument()
  })

  it('filters the list when typing in the search box', async () => {
    const user = userEvent.setup()
    renderProductList()

    await waitFor(() => {
      expect(screen.getByText('Tie rod')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search products/i)
    await user.type(searchInput, 'brake')

    expect(screen.queryByText('Tie rod')).not.toBeInTheDocument()
    expect(screen.getByText('Brake disk')).toBeInTheDocument()
    expect(screen.getByText('Brake caliper')).toBeInTheDocument()
  })

  it('shows no matching products when the search has no results', async () => {
    const user = userEvent.setup()
    renderProductList()

    await waitFor(() => {
      expect(screen.getByText('Tie rod')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText(/search products/i)
    await user.type(searchInput, 'xyz-not-real')

    expect(screen.queryByText('Tie rod')).not.toBeInTheDocument()
    expect(screen.queryByText('Brake disk')).not.toBeInTheDocument()
    expect(screen.queryByText('Brake caliper')).not.toBeInTheDocument()
  })
})