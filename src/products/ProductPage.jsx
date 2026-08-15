import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
    }, [id])

  return(
    loading ? (
        <p>Loading...</p>
    ) : error ? (
        <p>Error: {error}</p>
    ) : (
        <div>
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Brand: {product.brand}</p>
            <p>{product.description}</p>
            <p>Price: ksh {product.price}</p>
            <p>Category: {product.category}</p>
        </div>
    )
  )

}

export default ProductPage