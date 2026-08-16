import { useState } from "react";
import { Link, useParams } from "react-router";
import useFetch from "../hooks/useFetch";

function ProductPage() {
  const { id } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useFetch(`http://localhost:3000/products/${id}`);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  const displayProduct = draft || product;

  const handleEditClick = () => {
    setDraft(product);
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    })
      .then((response) => response.json())
      .then(() => {
        setIsEditing(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen bg-[#f5f4f2] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#f7f5f3] p-4 shadow-[0_20px_40px_rgba(15,36,56,0.08)] sm:p-6 lg:p-8">
        {loading ? (
          <p className="text-admin-900">Loading...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : displayProduct ? (
          <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="overflow-hidden rounded-[2rem] bg-[#0f2438] p-3 shadow-[0_18px_34px_rgba(15,36,56,0.18)]">
              <img
                src={displayProduct.image}
                alt={displayProduct.name}
                className="h-[360px] w-full rounded-[1.5rem] object-cover sm:h-[390px]"
              />
            </div>

            <div className="flex flex-col justify-center px-2 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-admin-accent">
                only the best
              </p>

              <h2 className="mt-4 text-5xl font-black leading-none tracking-[-0.07em] text-admin-900 sm:text-6xl">
                {displayProduct.name}
              </h2>

              <p className="mt-3 text-4xl font-bold leading-none tracking-[-0.05em] text-admin-900 sm:text-5xl">
                {displayProduct.brand}
              </p>

              <p className="mt-8 text-lg font-medium text-slate-600">
                {isEditing ? (
                  <input
                    type="number"
                    name="price"
                    value={draft.price}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-admin-accent/20 bg-white px-4 py-3 text-lg text-admin-900 outline-none focus:border-admin-accent"
                  />
                ) : (
                  <span className="text-admin-900">
                    Only the best in all of kenya
                  </span>
                )}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="rounded-full bg-admin-accent px-5 py-3 text-sm font-bold text-admin-700 shadow-[0_12px_24px_rgba(92,217,224,0.35)] transition hover:bg-admin-800 hover:text-white"
                  >
                    Save price
                  </button>
                ) : (
                  <button
                    onClick={handleEditClick}
                    className="rounded-full bg-admin-accent px-5 py-3 text-sm font-bold text-admin-700 shadow-[0_12px_24px_rgba(92,217,224,0.35)] transition hover:bg-admin-800 hover:text-white"
                  >
                    Edit price
                  </button>
                )}

                <Link
                  to="/shop"
                  className="rounded-full bg-admin-accent px-5 py-3 text-sm font-bold text-admin-700 shadow-lg shadow-admin-accent/20 transition hover:bg-admin-accent-soft"
                >
                  Back to shop
                </Link>
              </div>

              <div className="mt-6 rounded-2xl border border-admin-accent/15 bg-white/85 p-4 shadow-[0_10px_25px_rgba(15,36,56,0.04)]">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-admin-accent">
                  Product details
                </p>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  {displayProduct.description}
                </p>
                <p className="mt-4 text-2xl font-bold text-admin-pink">
                  KSh {displayProduct.price}
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
