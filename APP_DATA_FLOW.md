# E-Commerce App – Full App Dataflow Roadmap  
(Stack: Express.js (JS) + MongoDB/Prisma + Next.js (TS))

---

## PHASE 1: MVP (Finish Fast)

---

## 1. Authentication Flow (MVP)

### Signup
1. User submits signup form
2. Frontend → `POST /auth/signup`
3. Backend:
   - Validate input
   - Hash password
   - Save user (`is_verified = true`)
4. Backend → success
5. Frontend → redirect to login

### Login
1. User submits credentials
2. Frontend → `POST /auth/login`
3. Backend:
   - Verify credentials
   - Generate JWT
4. Backend → returns token + user
5. Frontend:
   - Save token in `localStorage`
   - Save user state
   - Redirect to dashboard

### Authenticated Requests
1. Frontend reads token from `localStorage`
2. Sends request with:
   ```
   Authorization: Bearer JWT_TOKEN
   ```
3. Backend middleware:
   - Verify token
   - Attach `req.user`

---

## 2. Product & Category Flow (MVP)

### Admin – Create Category
1. Admin submits category form
2. Frontend → `POST /admin/categories`
3. Backend:
   - Verify admin role
   - Save category in DB
4. Backend → success
5. Frontend → update admin UI

### Admin – Create Product
1. Admin submits product data
2. Frontend → `POST /admin/products`
3. Backend:
   - Verify admin role
   - Save product with category relation
4. Backend → success

### Customer – View Products
1. Customer opens shop page
2. Frontend → `GET /products`
3. Backend:
   - Fetch products + categories
4. Backend → product list
5. Frontend → render products

---

## 3. Cart Flow (MVP – Frontend Managed)

1. Customer clicks "Add to Cart"
2. Frontend:
   - Store cart items in local state / localStorage
3. Cart page reads from local cart state
4. No backend call until checkout

---

## 4. Order Flow (MVP)

### Place Order
1. Customer clicks checkout
2. Frontend → `POST /orders`
3. Backend:
   - Verify user
   - Create Order
   - Create OrderItems
   - Calculate total
   - Set status = PENDING
4. Backend → order success
5. Frontend → redirect to order confirmation

### Customer – View Orders
1. Frontend → `GET /orders/my`
2. Backend:
   - Fetch orders by `user_id`
3. Backend → orders list

---

## 5. Payment Flow (MVP – COD Only)

1. Customer selects "Cash on Delivery"
2. Backend:
   - Create Payment record
   - status = PENDING
3. Order remains PENDING until admin update

---

## 6. Admin Order Management (MVP)

1. Admin opens orders page
2. Frontend → `GET /admin/orders`
3. Backend:
   - Verify admin
   - Fetch all orders
4. Admin updates order status
5. Frontend → `PATCH /admin/orders/:id`
6. Backend:
   - Update order status (PROCESSING / SHIPPED / DELIVERED)

---

## 7. Address Flow (MVP)

1. Customer adds address
2. Frontend → `POST /address`
3. Backend:
   - Save address linked to user
4. Address used during checkout

---

## PHASE 2: POLISHED / PRODUCTION

---

## 8. Authentication Upgrade (Secure)

### Login with Cookies
1. Frontend → `POST /auth/login`
2. Backend:
   - Generate access + refresh token
   - Set HTTP-only cookies
3. Frontend stores nothing

### Token Refresh
1. Access token expires
2. Backend validates refresh token
3. Issues new access token

---

## 9. Email Verification

1. Signup sets `is_verified = false`
2. Backend sends email with verify link
3. User clicks link
4. Backend verifies account

---

## 10. Cart Flow Upgrade (Backend Cart)

1. Add to cart
2. Frontend → `POST /cart`
3. Backend:
   - Save cart items per user
4. Cart synced across devices

---

## 11. Online Payment Flow (Stripe / PayPal)

1. Customer selects online payment
2. Frontend → `POST /payments/create`
3. Backend:
   - Create payment intent
4. Payment provider processes payment
5. Webhook → backend updates:
   - Payment = COMPLETED
   - Order = PROCESSING

---

## 12. AI Chat Flow

1. User sends message
2. Frontend → `POST /ai/chat`
3. Backend:
   - Save prompt
   - Generate AI response
   - Save response
4. Frontend displays chat

---

## 13. Search & Filter Flow

1. User applies filters
2. Frontend → `GET /products?category=&price=`
3. Backend:
   - Query DB with filters
4. Return filtered products

---

## Security Comparison

| Feature            | MVP          | Polished          |
|--------------------|--------------|-------------------|
| Token storage      | localStorage | HTTP-only cookies |
| Cart storage       | Frontend     | Backend           |
| Payments           | COD          | Stripe / PayPal   |
| Email verification | ❌           | ✅                |
| Refresh tokens     | ❌           | ✅                |
| Production ready   | ❌           | ✅                |

---

## Recommended Build Order

1. MVP Auth
2. Products & Categories
3. Cart + Orders
4. Admin Dashboard
5. Deploy MVP
6. Security upgrades
7. Payments & AI

---

## Time Summary

- MVP full app: 3–4 weeks
- Polished upgrade: +2–3 weeks
