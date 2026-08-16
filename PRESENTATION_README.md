# Legacy Auto Parts

## Project Overview

Legacy Auto Parts is a React web application for an automotive spare-parts business. It has two main areas:

- A public storefront where customers can browse the business, categories, products, services, and contact information.
- A protected administrator portal where authorised administrators can manage inventory, prices, users, and product information.

The project uses Vite for development and production builds.

## Technologies Used

### React

React is used to build the user interface from reusable components. Each major page or feature is represented by a component.

Examples:

- `src/Components/LandingPage.jsx` contains the public storefront homepage.
- `src/products/ProductList.jsx` displays the product list.
- `src/products/ProductPage.jsx` displays one product and supports price editing.
- `src/Components/administratornavbar.jsx` contains the main administrator dashboard and its management controls.
- `src/Components/AdminLogin.jsx` contains the administrator login form.

React state is used for interactive values such as:

- Search text
- The selected administrator section
- Product and user lists
- Login form values
- Open and closed forms or navigation sections

### JavaScript and JSX

JavaScript provides the application logic, while JSX allows JavaScript to describe the HTML-like interface.

Examples in the project include:

- `useState` stores changing values inside React components.
- `useEffect` runs side effects such as saving user data or updating fetched products.
- Array methods such as `map` render lists of products, users, navigation sections, and statistics.
- `filter` searches products and filters users by role.
- Event handlers such as `onClick`, `onChange`, and `onSubmit` respond to user actions.
- `fetch` sends requests to the local product API.

### React Router

React Router controls navigation without requiring a full page reload.

Routes are defined in `src/App.jsx`:

- `/` - public storefront
- `/shop` - product list
- `/product/:id` - individual product page
- `/admin/login` - administrator login
- `/admin` - protected administrator dashboard

`ProtectedAdminRoute` prevents unauthenticated users from opening the administrator dashboard. Users who are not authenticated are redirected to `/admin/login`.

### Tailwind CSS

Tailwind CSS is used for most of the dashboard layout and styling. Utility classes define:

- Flexbox and grid layouts
- Spacing and sizing
- Colours and borders
- Typography
- Responsive layouts
- Hover and focus states
- Modal and form appearance

Examples include classes such as `flex`, `grid`, `px-6`, `rounded-lg`, `text-white`, and responsive prefixes such as `md:` and `xl:`.

### Regular CSS

Regular CSS is used where shared or custom styling is needed.

- `src/index.css` contains global styles and Tailwind directives.
- `src/App.css` contains shared application and product visual styles.
- `src/Components/LandingPage.css` contains storefront-specific styling when used by the landing page.

### Lucide React

`lucide-react` provides interface icons instead of manually drawing icons. The administrator dashboard uses icons for navigation, search, editing, deleting, adding users, adding products, signing out, and security actions.

### Vite

Vite provides:

- The development server
- Fast module updates during development
- The production build process
- Integration with the React plugin

Commands are defined in `package.json`.

### JSON Server and Fetch API

The project includes `db.json` and a JSON Server command for local product data.

The `fetch` API is used to:

- Read products from `http://localhost:3000/products`
- Add products with `POST`
- Update prices with `PATCH`
- Delete products with `DELETE`

`src/hooks/useFetch.js` is a reusable hook for loading API data and tracking loading and error states.

## Important Files

| File | Responsibility |
| --- | --- |
| `src/main.jsx` | Starts React and renders the root application. |
| `src/App.jsx` | Defines the storefront, product, login, and protected admin routes. |
| `src/Components/LandingPage.jsx` | Public customer-facing storefront. |
| `src/products/ProductList.jsx` | Product search, product display, and brand filtering. |
| `src/products/ProductPage.jsx` | Individual product details and price editing. |
| `src/Components/AdminLogin.jsx` | Administrator login form and authentication check. |
| `src/auth/adminAuth.js` | Shared administrator session key, user storage key, default account data, and admin records. |
| `src/Components/administratornavbar.jsx` | Main working administrator dashboard. |
| `src/Components/AdminSidebar.jsx` | Earlier dashboard demonstration component. |
| `src/hooks/useFetch.js` | Reusable data-fetching hook. |
| `db.json` | Local JSON Server product data. |
| `tailwind.config.js` | Tailwind theme and custom admin colours. |
| `vite.config.js` | Vite and React configuration. |
| `package.json` | Dependencies and development scripts. |

## Administrator Authentication

Only users whose role is `Admin` can enter the administrator portal.

The login process is:

1. The user enters an email and password.
2. The application loads the configured administrator records and saved local users.
3. The email is compared without case differences.
4. The role must be `Admin`.
5. The password must match the saved password or the legacy default password for older demo Admin records.
6. A successful login stores an authentication marker in `sessionStorage`.
7. The user is redirected to `/admin`.
8. Signing out removes the session marker and returns the user to the login page.

Demo administrator account:

- Email: `emmanuel.admin@legacyauto.test`
- Password: `LegacyAdmin2026!`

This is a frontend demonstration. A production application should validate credentials on a secure backend and store password hashes instead of checking credentials in browser code.

## Administrator Features

The administrator can use the dashboard to:

- View business statistics
- View products in stock
- Search inventory
- Add a product
- Upload a product image
- Change a product price
- Delete a product
- View staff and customer records
- Filter users by role
- Search users
- Add users
- Edit user contact details
- Delete users
- Sign out of the administrator portal

## Running the Project

From the project directory:

```bash
npm install
npm run dev
```

The Vite application normally opens at:

```text
http://localhost:5173
```

To run the local product API in another terminal:

```bash
npm run server
```

The JSON Server API normally runs at:

```text
http://localhost:3000
```

To create a production build:

```bash
npm run build
```

To run lint checks:

```bash
npm run lint
```

## Suggested Presentation Explanation

> This project is a React and JavaScript spare-parts application. React divides the interface into components such as the landing page, product pages, login page, and administrator dashboard. JavaScript controls the state and behaviour, including searching, filtering, form submission, user management, and API requests. React Router provides navigation between the public storefront and the protected admin portal. Tailwind CSS and regular CSS provide the responsive design and visual styling. JSON Server provides a local API for products, while the Fetch API connects the frontend to that data. The admin login checks the user's role and redirects authorised administrators into the dashboard.

## Development Note

The source files contain `Emmanuel wema` markers in the files associated with Emmanuel's work so that contributions can be identified during the presentation. `package.json` is intentionally not marked with a JSX comment because JSON does not allow JSX comment syntax.
