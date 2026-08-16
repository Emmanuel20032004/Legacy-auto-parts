import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import ProductPage from './ProductPage'

describe('ProductPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  function renderProductPage(id = '1') {
    return render(
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>,
    )
  }

  it('shows a loading message before data arrives', () => {
    global.fetch.mockReturnValue(new Promise(() => {}))

    renderProductPage()

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders the product name, brand, and price once loaded', async () => {
    const fakeProduct = {
      id: 1,
      name: 'Tie rod',
      brand: 'Toyota',
      price: 6000,
      description: 'connects the steering gear box',
      image: 'https://example.com/tie-rod.jpg',
    }

    global.fetch.mockResolvedValue({
      json: () => Promise.resolve(fakeProduct),
    })

    renderProductPage()

    await waitFor(() => {
      expect(screen.getByText('Tie rod')).toBeInTheDocument()
    })

    expect(screen.getByText('Toyota')).toBeInTheDocument()
    expect(screen.getByText(/6000/)).toBeInTheDocument()
  })

  it('shows an error message if the fetch fails', async () => {
    global.fetch.mockRejectedValue(new Error('Failed to fetch'))

    renderProductPage()

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})