{/* Neo Mwashi */}
import { Link, useParams } from "react-router";
import useFetch from "../hooks/useFetch";

function ProductPage() {
  const { id } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useFetch(`http://localhost:3000/products/${id}`);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-admin-900 via-[#102330] to-[#050a0f] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-5xl rounded-[2rem] bg-admin-panel/95 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.45)] sm:p-6 lg:p-8">
        {loading ? (
          <p className="text-admin-muted">Loading...</p>
        ) : error ? (
          <p className="text-red-300">Error: {error}</p>
        ) : product ? (
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="overflow-hidden rounded-[2rem] bg-[#0f2438] p-3 shadow-[0_18px_34px_rgba(0,0,0,0.35)]">
              <img
                src={product.image}
                alt={product.name}
                className="h-[360px] w-full rounded-[1.5rem] object-cover sm:h-[390px]"
              />
            </div>

            <div className="flex flex-col justify-center px-2 py-4">
              <p className="label">only the best</p>

              <h2 className="mt-4 text-5xl font-black leading-none tracking-[-0.07em] text-admin-ink sm:text-6xl">
                {product.name}
              </h2>

              <p className="mt-3 text-4xl font-bold leading-none tracking-[-0.05em] text-admin-accentSoft sm:text-5xl">
                {product.brand}
              </p>

              <p className="mt-8 text-lg font-medium text-admin-muted">
                <span className="text-admin-ink">
                  Only the best in all of kenya
                </span>
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/shop" className="btn btn-accent">
                  Back to shop
                </Link>
              </div>

              <div className="card mt-6">
                <p className="label">Product details</p>
                <p className="mt-3 text-base leading-7 text-admin-muted">
                  {product.description}
                </p>
                <p className="mt-4 text-2xl font-bold text-admin-pink">
                  KSh {product.price}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductPage;
