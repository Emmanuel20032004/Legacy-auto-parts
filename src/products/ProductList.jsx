import { useState } from 'react'
import { useSearchParams } from 'react-router'
import useFetch from '../hooks/useFetch'

function ProductList() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: products, loading, error } = useFetch('http://localhost:3000/products')

  const [searchParams] = useSearchParams()
  const brandFilter = searchParams.get('brand')

  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesBrand = brandFilter
      ? product.brand.toLowerCase() === brandFilter.toLowerCase()
      : true

    return matchesSearch && matchesBrand
  })

  return (
    loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredProducts.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Brand: {product.brand}</p>
            <p>Price: ksh {product.price}</p>
            <p>{product.category}</p>
          </div>
        ))}
      </div>
    )
  )
}

export default ProductList