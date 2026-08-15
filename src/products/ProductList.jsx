import { useState, useEffect } from 'react'

function ProductList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        fetch('http://localhost:3000/products')
        .then((response) => response.json())
        .then((data) => {
            setProducts(data)
            setLoading(false)
        })
        .catch((err) => {
            setError(err.message)
            setLoading(false)
        })
    }, [])

    return(
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