import { useState } from 'react'
import { useParams } from 'react-router'
import useFetch from '../hooks/useFetch'

function ProductPage() {
  const { id } = useParams()
  const { data: product, loading, error } = useFetch(`http://localhost:3000/products/${id}`)

  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(null)

  const displayProduct = draft || product

  const handleEditClick = () => {
    setDraft(product)
    setIsEditing(true)
  }

  const handleChange = (e) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
    })
      .then((response) => response.json())
      .then(() => {
        setIsEditing(false)
      })
      .catch((err) => console.error(err))
  }

  return (
    loading ? (
      <p>Loading...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : (
      <div>
        <img src={displayProduct.image} alt={displayProduct.name} />
        <h2>{displayProduct.name}</h2>
        <p>Brand: {displayProduct.brand}</p>
        <p>{displayProduct.description}</p>

        {isEditing ? (
          <input
            type="number"
            name="price"
            value={draft.price}
            onChange={handleChange}
          />
        ) : (
          <p>Price: ksh {displayProduct.price}</p>
        )}

        <p>Category: {displayProduct.category}</p>

        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
    )
  )
}

export default ProductPage