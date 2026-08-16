import { useEffect, useState } from "react";
import {
  BarChart3,
  ChevronDown,
  Cog,
  Home,
  LogOut,
  Pencil,
  PackagePlus,
  Search,
  Shield,
  Trash2,
  Users,
  UserPlus,
  X,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router";
import { adminSessionKey, initialUsers, usersStorageKey } from "../auth/adminAuth.js";

const statCards = [
  { label: "Total sales anually", value: "500,000" },
  { label: "total stock in inventory", value: "300 pieces" },
  { label: "Total sales monthly", value: "100,000" },
  { label: "Website logins", value: "3,000" },
];

const initialProducts = [
  { id: 1, name: "Alternator", vehicle: "Toyota Hilux 2KD", partNo: "27060-0L050", category: "Electrical", quantity: 8, price: "KSh 12,500", tone: "silver" },
  { id: 2, name: "Headlight Right", vehicle: "Toyota Prado 2015", partNo: "81110-60F30", category: "Lighting", quantity: 5, price: "KSh 18,000", tone: "amber" },
  { id: 3, name: "Brake Disc Front", vehicle: "Mitsubishi L200", partNo: "4615A097", category: "Braking", quantity: 12, price: "KSh 6,800", tone: "steel" },
  { id: 4, name: "Side Mirror Left", vehicle: "Nissan Navara D40", partNo: "96302-EB300", category: "Body parts", quantity: 6, price: "KSh 7,500", tone: "charcoal" },
  { id: 5, name: "Radiator Assembly", vehicle: "Ford Ranger 3.2", partNo: "AB39-8005", category: "Cooling", quantity: 4, price: "KSh 21,500", tone: "blue" },
  { id: 6, name: "Suspension Arm", vehicle: "Subaru Forester", partNo: "20202-SC000", category: "Suspension", quantity: 9, price: "KSh 9,200", tone: "red" },
];

const productsStorageKey = "legacy-auto-parts-products";

const navSections = [
  {
    title: "DASHBOARDS",
    items: [
      { label: "Dashboard", icon: Home },
      { label: "Parts still in stock", icon: BarChart3 },
    ],
  },
  {
    title: "REPORTS",
    items: [
      { label: "Staff and users", icon: Users },
    ],
  },
  {
    title: "PRICE CHANGE",
    items: [
      { label: "Price change", icon: Zap },
    ],
  },
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = window.localStorage.getItem(productsStorageKey);
      return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    } catch {
      return initialProducts;
    }
  });
  const [users, setUsers] = useState(() => {
    try {
      const savedUsers = window.localStorage.getItem(usersStorageKey);
      return savedUsers
        ? JSON.parse(savedUsers).filter((user) => user.role !== "Reader")
        : initialUsers;
    } catch {
      return initialUsers;
    }
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("All");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", phone: "", email: "", password: "", role: "Customer" });
  const [editingUser, setEditingUser] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: "", vehicle: "", partNo: "", category: "", quantity: "", price: "", image: "" });
  const [expandedSections, setExpandedSections] = useState({
    DASHBOARDS: true,
    REPORTS: true,
    "PRICE CHANGE": false,
  });

  const toggleSection = (sectionTitle) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  useEffect(() => {
    window.localStorage.setItem(usersStorageKey, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    window.localStorage.setItem(productsStorageKey, JSON.stringify(products));
  }, [products]);

  const visibleProducts = products.filter((product) =>
    [product.name, product.vehicle, product.partNo, product.category]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const visibleUsers = users.filter((user) => {
    const matchesRole = userRoleFilter === "All" || user.role === userRoleFilter;
    const matchesSearch = [user.name, user.phone, user.email, user.role]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const addProduct = (event) => {
    event.preventDefault();
    if (!newProduct.name || !newProduct.vehicle || !newProduct.partNo || !newProduct.quantity) return;

    setProducts((currentProducts) => [
      ...currentProducts,
      {
        ...newProduct,
        id: Date.now(),
        quantity: Number(newProduct.quantity),
        price: newProduct.price || "Price pending",
        tone: "blue",
      },
    ]);
    setNewProduct({ name: "", vehicle: "", partNo: "", category: "", quantity: "", price: "", image: "" });
    setShowAddProduct(false);
  };

  const updateProductPrice = (productId, price) => {
    const trimmedPrice = price.trim();
    if (!trimmedPrice) return;
    setProducts((currentProducts) => currentProducts.map((product) => (
      product.id === productId ? { ...product, price: trimmedPrice } : product
    )));
  };

  const handleProductImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => setNewProduct((currentProduct) => ({
      ...currentProduct,
      image: reader.result,
    }));
    reader.readAsDataURL(file);
  };

  const removeProduct = (product) => {
    if (!window.confirm(`Delete ${product.name} from inventory?`)) return;
    setProducts((currentProducts) => currentProducts.filter((item) => item.id !== product.id));
  };

  const removeUser = (user) => {
    if (!window.confirm(`Delete ${user.name} from staff and users?`)) return;
    setUsers((currentUsers) => currentUsers.filter((item) => item.id !== user.id));
  };

  const saveUser = (event) => {
    event.preventDefault();
    setUsers((currentUsers) => currentUsers.map((user) => (
      user.id === editingUser.id ? editingUser : user
    )));
    setEditingUser(null);
  };

  const addUser = (event) => {
    event.preventDefault();
    if (!newUser.name || !newUser.phone || !newUser.email || (newUser.role === "Admin" && !newUser.password)) return;

    setUsers((currentUsers) => [
      ...currentUsers,
      { ...newUser, id: Date.now() },
    ]);
    setNewUser({ name: "", phone: "", email: "", password: "", role: "Customer" });
    setShowAddUser(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      {/* LEFT SIDEBAR - Dark blue */}
      <div className="w-[30%] flex-shrink-0 bg-gradient-to-b from-[#1a3a52] to-[#0f2438] px-6 py-8 flex flex-col overflow-y-auto border-r border-[#5cd9e0]/20">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-[#5cd9e0]/20">
          <h2 className="text-lg font-bold text-[#5cd9e0]">Admin</h2>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 space-y-2">
          {navSections.map((section) => {
            const isExpanded = expandedSections[section.title];
            return (
              <div key={section.title}>
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold uppercase text-[#5cd9e0]/60 hover:text-[#5cd9e0] transition-colors"
                >
                  <span>{section.title}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isExpanded ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                </button>

                {/* Section Items */}
                {isExpanded && (
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = item.label === activeItem;
                      return (
                        <button
                          key={item.label}
                          onClick={() => setActiveItem(item.label)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors ${
                            isActive
                              ? "bg-[#5cd9e0]/20 text-[#5cd9e0]"
                              : "text-[#b0d4e3] hover:bg-[#1a3a52]/80 hover:text-white"
                          }`}
                        >
                          <Icon size={18} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem(adminSessionKey);
            navigate("/admin/login", { replace: true });
          }}
          className="mt-6 flex w-full items-center gap-3 rounded px-4 py-3 text-sm font-medium text-[#b0d4e3] transition-colors hover:bg-[#1a3a52]/80 hover:text-white"
        >
          <LogOut size={18} />
          <span>Sign out</span>
        </button>
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden bg-black relative">
        {/* Car background image using img tag */}
        <img
          src="/car-bg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 0.6 }}
        />
        
        {/* Dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.4) 100%)",
          }}
        />

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between bg-gradient-to-r from-[#5cd9e0] to-[#f5b8d1] px-12 py-5 text-4xl font-bold text-white shadow-lg">
          Admin &gt; {activeItem}
        </header>

        <main className="relative z-10 flex-1 overflow-auto px-10 py-10">
          {activeItem === "Price change" ? (
            <section className="max-w-7xl">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#5cd9e0]">Inventory controls</p>
                  <h1 className="text-4xl font-bold text-white">Price change</h1>
                  <p className="mt-2 text-sm text-[#b0d4e3]">Update the selling price of any part in your inventory.</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/50 px-4 py-3 text-sm text-[#b0d4e3]">{products.length} products in inventory</div>
              </div>

              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d151a]/95 shadow-xl">
                <div className="hidden grid-cols-[2fr_1.4fr_1fr_1.4fr] gap-4 border-b border-white/10 bg-[#15242c] px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#b0d4e3] md:grid">
                  <span>Product</span><span>Part number</span><span>Stock</span><span>Price</span>
                </div>
                {products.map((product) => (
                  <div key={product.id} className="grid gap-4 border-b border-white/10 px-5 py-4 last:border-b-0 md:grid-cols-[2fr_1.4fr_1fr_1.4fr] md:items-center">
                    <div>
                      <span className="mr-2 text-[10px] font-bold uppercase text-[#5cd9e0] md:hidden">Product</span>
                      <span className="font-semibold text-[#7eeaf0]">{product.name}</span>
                      <span className="mt-1 block text-xs text-[#91a8b2]">{product.vehicle}</span>
                    </div>
                    <div className="text-sm text-[#b0d4e3]"><span className="mr-2 text-[10px] font-bold uppercase text-[#5cd9e0] md:hidden">Part number</span>{product.partNo}</div>
                    <div className="text-sm text-[#b0d4e3]"><span className="mr-2 text-[10px] font-bold uppercase text-[#5cd9e0] md:hidden">Stock</span>{product.quantity} available</div>
                    <form className="flex items-center gap-2" onSubmit={(event) => { event.preventDefault(); updateProductPrice(product.id, event.currentTarget.elements.price.value); }}>
                      <label className="sr-only" htmlFor={`price-${product.id}`}>Price for {product.name}</label>
                      <input id={`price-${product.id}`} name="price" defaultValue={product.price} className="min-w-0 flex-1 rounded-lg border border-white/20 bg-[#080d10] px-3 py-2.5 text-[#f8fafc] caret-[#5cd9e0] outline-none focus:border-[#5cd9e0] focus:ring-1 focus:ring-[#5cd9e0]" style={{ color: "#f8fafc", WebkitTextFillColor: "#f8fafc" }} />
                      <button type="submit" className="rounded-lg bg-[#5cd9e0] px-3 py-2.5 text-xs font-bold text-[#102b40] transition hover:bg-white">Save</button>
                    </form>
                  </div>
                ))}
              </div>
            </section>
          ) : activeItem === "Staff and users" ? (
            <section className="max-w-7xl">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#5cd9e0]">Access management</p>
                  <h1 className="text-4xl font-bold text-white">Staff and users</h1>
                  <p className="mt-2 text-sm text-[#b0d4e3]">Manage accounts, roles, and customer access.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-[#b0d4e3]"><Shield size={18} className="text-[#5cd9e0]" /> {visibleUsers.length} users shown</div>
                  <button type="button" onClick={() => setShowAddUser(true)} className="flex items-center gap-2 rounded-lg bg-[#5cd9e0] px-4 py-3 text-sm font-bold text-[#102b40] transition hover:bg-white">
                    <UserPlus size={18} />
                    Add user
                  </button>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                <div className="relative mr-2 min-w-[250px] flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8aa8b7]" size={18} />
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search name or phone..."
                    className="w-full rounded-lg border border-white/10 bg-[#111a20] py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-[#5cd9e0]"
                  />
                </div>
                {["All", "Customer", "Manager", "Admin"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setUserRoleFilter(role)}
                    className={`rounded-lg border px-5 py-3 text-sm font-semibold transition ${userRoleFilter === role ? "border-[#5cd9e0] bg-[#5cd9e0]/15 text-[#5cd9e0]" : "border-white/10 bg-[#111a20] text-[#b0d4e3] hover:border-[#5cd9e0]/50 hover:text-white"}`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d151a]/95 shadow-xl">
                <div className="hidden grid-cols-[2fr_1.2fr_2fr_1fr_100px] gap-4 border-b border-white/10 bg-[#15242c] px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#b0d4e3] md:grid">
                  <span>Name</span><span>Phone</span><span>Email</span><span>Role</span><span className="text-right">Actions</span>
                </div>
                <div>
                  {visibleUsers.map((user) => (
                    <div key={user.id} className="grid gap-3 border-b border-white/10 px-5 py-4 last:border-b-0 md:grid-cols-[2fr_1.2fr_2fr_1fr_100px] md:items-center md:gap-4">
                      <div><span className="mr-2 text-[10px] font-bold uppercase text-[#5cd9e0] md:hidden">Name</span><span className="font-semibold text-[#7eeaf0]">{user.name}</span></div>
                      <div className="text-sm text-[#b0d4e3]"><span className="mr-2 text-[10px] font-bold uppercase text-[#5cd9e0] md:hidden">Phone</span>{user.phone}</div>
                      <div className="break-all text-sm text-[#b0d4e3]"><span className="mr-2 text-[10px] font-bold uppercase text-[#5cd9e0] md:hidden">Email</span>{user.email}</div>
                      <div><span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${user.role === "Admin" ? "bg-fuchsia-400/20 text-fuchsia-300" : user.role === "Manager" ? "bg-blue-400/20 text-blue-300" : "bg-slate-400/20 text-slate-200"}`}><Shield size={13} />{user.role}</span></div>
                      <div className="flex items-center gap-3 justify-self-start md:justify-self-end">
                        <button type="button" onClick={() => setEditingUser({ ...user })} aria-label={`Edit ${user.name}`} title={`Edit ${user.name}`} className="text-[#b0d4e3] transition hover:text-[#5cd9e0]"><Pencil size={19} /></button>
                        <button type="button" onClick={() => removeUser(user)} aria-label={`Delete ${user.name}`} title={`Delete ${user.name}`} className="text-red-300 transition hover:text-red-100"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
                {visibleUsers.length === 0 && <p className="p-10 text-center text-[#b0d4e3]">No users match these filters.</p>}
              </div>
            </section>
          ) : activeItem === "Parts still in stock" ? (
            <section className="max-w-7xl">
              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#5cd9e0]">Inventory control</p>
                  <h1 className="text-4xl font-bold text-white">Parts in stock</h1>
                  <p className="mt-2 text-sm text-[#b0d4e3]">View available parts and add new inventory records.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddProduct(true)}
                  className="flex items-center gap-2 rounded-lg bg-[#5cd9e0] px-5 py-3 text-sm font-bold text-[#102b40] shadow-lg transition hover:bg-white"
                >
                  <PackagePlus size={18} />
                  Add product
                </button>
              </div>

              <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-black/50 p-3">
                <div className="relative min-w-[240px] flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8aa8b7]" size={18} />
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search parts, vehicles, or part numbers"
                    className="w-full rounded-lg border border-white/10 bg-[#111a20] py-3 pl-10 pr-4 text-sm text-white outline-none transition focus:border-[#5cd9e0]"
                  />
                </div>
                <div className="rounded-lg border border-white/10 px-4 py-3 text-sm text-[#d5e6ec]">{visibleProducts.length} products shown</div>
              </div>

              <div className="grid grid-cols-1 gap-5 xl:grid-cols-3 md:grid-cols-2">
                {visibleProducts.map((product) => (
                  <article key={product.id} className="overflow-hidden rounded-xl border border-white/10 bg-[#11171b]/95 shadow-xl">
                    <div className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-[#222d32] via-[#101416] to-[#050606] product-${product.tone}`}>
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="h-full w-full object-contain p-3" />
                      ) : (
                        <div className="product-shape" aria-hidden="true" />
                      )}
                      <span className="absolute left-4 top-4 rounded bg-[#2b9c2b] px-3 py-1 text-xs font-bold text-white">IN STOCK</span>
                      <span className="absolute right-4 top-4 text-xs font-semibold text-[#b0d4e3]">{product.quantity} available</span>
                    </div>
                    <div className="p-5">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-lg font-bold text-white">{product.name}</h2>
                          <p className="mt-1 text-sm text-[#b0d4e3]">{product.vehicle}</p>
                        </div>
                        <span className="rounded-full border border-[#5cd9e0]/30 px-2 py-1 text-[10px] uppercase tracking-wider text-[#5cd9e0]">{product.category || "General"}</span>
                      </div>
                      <p className="border-b border-white/10 pb-4 text-xs text-[#91a8b2]">Part No: {product.partNo}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-lg font-bold text-[#ff5f5f]">{product.price}</span>
                        <button
                          type="button"
                          onClick={() => removeProduct(product)}
                          aria-label={`Delete ${product.name}`}
                          title="Delete product"
                          className="flex items-center gap-1.5 rounded-lg border border-red-400/30 px-3 py-2 text-xs font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-500/15 hover:text-white"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              {visibleProducts.length === 0 && <p className="rounded-xl border border-white/10 bg-black/40 p-10 text-center text-[#b0d4e3]">No inventory matches that search.</p>}
            </section>
          ) : (
            <div className="grid grid-cols-2 gap-12 max-w-4xl">
              {statCards.map((card) => (
                <div key={card.label} className="flex flex-col items-center justify-start">
                  <div className="rounded-full bg-[#fffbea] px-8 py-3 font-bold text-base text-[#1a1a1a] shadow-lg mb-8 text-center min-h-[50px] flex items-center justify-center">
                    {card.label}
                  </div>
                  <p className="text-5xl font-light text-white mt-4">{card.value}</p>
                </div>
              ))}
            </div>
          )}
        </main>

        {showAddProduct && (
          <div className="absolute inset-0 z-30 flex items-start justify-center overflow-y-auto bg-black/75 p-6 backdrop-blur-sm">
            <form onSubmit={addProduct} className="my-auto max-h-[calc(100vh-3rem)] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#5cd9e0]/30 bg-[#101a20] p-7 shadow-2xl [scrollbar-color:#5cd9e0_#101a20] [scrollbar-width:thin]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#5cd9e0]">Inventory record</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">Add product</h2>
                </div>
                <button type="button" onClick={() => setShowAddProduct(false)} className="text-[#b0d4e3] transition hover:text-white" aria-label="Close add product form"><X size={22} /></button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[{ key: "name", label: "Product name" }, { key: "vehicle", label: "Vehicle" }, { key: "partNo", label: "Part number" }, { key: "category", label: "Category" }, { key: "quantity", label: "Quantity", type: "number" }, { key: "price", label: "Price" }].map((field) => (
                  <label key={field.key} className="text-sm text-[#b0d4e3]">{field.label}
                    <input required={field.key !== "category" && field.key !== "price"} type={field.type || "text"} value={newProduct[field.key]} onChange={(event) => setNewProduct({ ...newProduct, [field.key]: event.target.value })} className="mt-2 w-full rounded-lg border border-white/20 bg-[#080d10] px-3 py-3 text-[#f8fafc] caret-[#5cd9e0] placeholder:text-[#8aa8b7] outline-none focus:border-[#5cd9e0] focus:ring-1 focus:ring-[#5cd9e0]" style={{ color: "#f8fafc", WebkitTextFillColor: "#f8fafc" }} />
                  </label>
                ))}
                <label className="text-sm text-[#b0d4e3] sm:col-span-2">Spare-part image
                  <span className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#5cd9e0]/50 bg-[#080d10] px-4 py-5 text-center transition hover:border-[#5cd9e0] hover:bg-[#102b40]">
                    <span className="font-semibold text-[#7eeaf0]">Click to choose an image</span>
                    <span className="mt-1 text-xs text-[#b0d4e3]">JPG, PNG, or WebP spare-part photo</span>
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleProductImage} className="sr-only" />
                  </span>
                  {newProduct.image && <img src={newProduct.image} alt="Selected spare part preview" className="mt-3 h-28 w-full rounded-lg border border-[#5cd9e0]/30 bg-[#080d10] object-contain p-2" />}
                </label>
              </div>
              <button type="submit" className="mt-6 w-full rounded-lg bg-[#5cd9e0] py-3 font-bold text-[#102b40] transition hover:bg-white">Save to inventory</button>
            </form>
          </div>
        )}

        {editingUser && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm">
            <form onSubmit={saveUser} className="w-full max-w-lg rounded-2xl border border-[#5cd9e0]/30 bg-[#101a20] p-7 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#5cd9e0]">User profile</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">Edit {editingUser.name}</h2>
                </div>
                <button type="button" onClick={() => setEditingUser(null)} className="text-[#b0d4e3] transition hover:text-white" aria-label="Close edit user form"><X size={22} /></button>
              </div>
              <div className="grid gap-4">
                <label className="text-sm text-[#b0d4e3]">Phone number
                  <input required value={editingUser.phone} onChange={(event) => setEditingUser({ ...editingUser, phone: event.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-[#080d10] px-3 py-3 text-white outline-none focus:border-[#5cd9e0]" />
                </label>
                <label className="text-sm text-[#b0d4e3]">Email address
                  <input required type="email" value={editingUser.email} onChange={(event) => setEditingUser({ ...editingUser, email: event.target.value })} className="mt-2 w-full rounded-lg border border-white/10 bg-[#080d10] px-3 py-3 text-white outline-none focus:border-[#5cd9e0]" />
                </label>
              </div>
              <button type="submit" className="mt-6 w-full rounded-lg bg-[#5cd9e0] py-3 font-bold text-[#102b40] transition hover:bg-white">Save changes</button>
            </form>
          </div>
        )}

        {showAddUser && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm">
            <form onSubmit={addUser} className="w-full max-w-lg rounded-2xl border border-[#5cd9e0]/30 bg-[#101a20] p-7 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#5cd9e0]">Access management</p>
                  <h2 className="mt-1 text-2xl font-bold text-white">Add new user</h2>
                </div>
                <button type="button" onClick={() => setShowAddUser(false)} className="text-[#b0d4e3] transition hover:text-white" aria-label="Close add user form"><X size={22} /></button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-[#b0d4e3]">Full name
                  <input required value={newUser.name} onChange={(event) => setNewUser({ ...newUser, name: event.target.value })} className="mt-2 w-full rounded-lg border border-white/20 bg-[#080d10] px-3 py-3 text-[#f8fafc] caret-[#5cd9e0] placeholder:text-[#8aa8b7] outline-none focus:border-[#5cd9e0] focus:ring-1 focus:ring-[#5cd9e0]" style={{ color: "#f8fafc", WebkitTextFillColor: "#f8fafc" }} />
                </label>
                <label className="text-sm text-[#b0d4e3]">Phone number
                  <input required value={newUser.phone} onChange={(event) => setNewUser({ ...newUser, phone: event.target.value })} className="mt-2 w-full rounded-lg border border-white/20 bg-[#080d10] px-3 py-3 text-[#f8fafc] caret-[#5cd9e0] placeholder:text-[#8aa8b7] outline-none focus:border-[#5cd9e0] focus:ring-1 focus:ring-[#5cd9e0]" style={{ color: "#f8fafc", WebkitTextFillColor: "#f8fafc" }} />
                </label>
                <label className="text-sm text-[#b0d4e3] sm:col-span-2">Email address
                  <input required type="email" value={newUser.email} onChange={(event) => setNewUser({ ...newUser, email: event.target.value })} className="mt-2 w-full rounded-lg border border-white/20 bg-[#080d10] px-3 py-3 text-[#f8fafc] caret-[#5cd9e0] placeholder:text-[#8aa8b7] outline-none focus:border-[#5cd9e0] focus:ring-1 focus:ring-[#5cd9e0]" style={{ color: "#f8fafc", WebkitTextFillColor: "#f8fafc" }} />
                </label>
                <label className="text-sm text-[#b0d4e3] sm:col-span-2">Password for Admin access
                  <input required={newUser.role === "Admin"} type="password" value={newUser.password} onChange={(event) => setNewUser({ ...newUser, password: event.target.value })} placeholder="Required for Admin role" className="mt-2 w-full rounded-lg border border-white/20 bg-[#080d10] px-3 py-3 text-[#f8fafc] caret-[#5cd9e0] placeholder:text-[#8aa8b7] outline-none focus:border-[#5cd9e0] focus:ring-1 focus:ring-[#5cd9e0]" style={{ color: "#f8fafc", WebkitTextFillColor: "#f8fafc" }} />
                </label>
                <label className="text-sm text-[#b0d4e3] sm:col-span-2">Role
                  <select value={newUser.role} onChange={(event) => setNewUser({ ...newUser, role: event.target.value })} className="mt-2 w-full rounded-lg border border-white/20 bg-[#080d10] px-3 py-3 text-[#f8fafc] caret-[#5cd9e0] outline-none focus:border-[#5cd9e0] focus:ring-1 focus:ring-[#5cd9e0]" style={{ color: "#f8fafc", WebkitTextFillColor: "#f8fafc" }}>
                    <option>Customer</option>
                    <option>Manager</option>
                    <option>Admin</option>
                  </select>
                </label>
              </div>
              <button type="submit" className="mt-6 w-full rounded-lg bg-[#5cd9e0] py-3 font-bold text-[#102b40] transition hover:bg-white">Save user</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
