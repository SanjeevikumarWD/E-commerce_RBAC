# **Online Dress Sales Platform**

An advanced **E-commerce Platform** for online dress sales, designed with robust **role-based access control (RBAC)** and built using the **MERN stack**. This platform offers seamless user experiences, secure authentication mechanisms, and administrative control over product and user management.

---

## **Project Highlights**

- **Role-Based Access Control**:  
   - **Admin**: Full control over stock, users, and staff management.  
   - **Manager/Staff**: Manage product listings (add, edit, delete).  
   - **User**: Browse products, add items to the cart, and checkout.  

- **Advanced Security Implementations**:  
   - **JWT Authentication**: Ensures secure session management and route protection.  
   - **LocalStorage**: Safely stores session data to prevent unauthorized access.  
   - **Restricted Account Creation**: Admin is the sole authority to create Manager/Staff accounts.  
   - **Session Security**: If a page is refreshed, the user is automatically redirected to the homepage and logged out to prevent session hijacking.  
   - **Account Control**: Admin can deactivate Manager/Staff accounts when necessary.

- **Dynamic User Experience**:  
   - Product browsing categorized for **men**, **women**, and **kids**.  
   - Smooth navigation with **React Router**.  
   - Add-to-cart and checkout functionalities for registered users.  

---

## **Tech Stack**

- **Frontend**: React, React Router, Zustand (Global State Management), Tailwind CSS  
- **Backend**: Express.js, Node.js, MongoDB (via MongoDB Atlas), Multer (file uploads)  
- **Authentication**: JSON Web Tokens (JWT)  
- **Styling**: Tailwind CSS for clean and responsive design  
- **Deployment**: Render (for frontend and backend)  

---

## **Features**

### **Admin Features**
- View and manage:
  - **Users and Staff**: Create Manager/Staff accounts and deactivate them as needed.
  - **Stocks and Orders**: Monitor inventory and order statuses.
  - **Sales Data**: Access detailed sales reports for business insights.
- A dedicated **"Register Staff"** button for streamlined staff account creation.

### **Manager/Staff Features**
- Full control over product management:
  - **Add, Edit, Delete, and View Products**: Keep the catalog updated efficiently.
- Access to stock details to ensure inventory accuracy.

### **User Features**
- **Account Creation**: Only users can sign up and create accounts.  
- **Secure Product Interaction**: Add items to the cart and proceed to checkout only after logging in.  
- **Browsing Categories**: Toggle between categories like **Men**, **Women**, and **Kids**.  
- **Session Security**: Automatic logout and redirection to the homepage upon refresh.

---

## **Security Highlights**
- **JWT Authentication**:  
  Secures all routes and ensures encrypted user sessions.  
- **LocalStorage Implementation**:  
  Stores user-specific session data securely.  
- **Admin Account Management**:  
  Prevents unauthorized access by allowing only Admin to create Manager/Staff accounts.  
- **Session Logout on Refresh**:  
  Enhances security by logging users out and redirecting them to the homepage if the session is invalidated.

---


## **Database Models**

### **User Schema**
Tracks user details and shopping cart information:

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cartArray: [mongoose.Schema.Types.ObjectId], // Array of product IDs
});

### **Product Schema**
Defines product details for inventory:
```javascript
const productSchema = new mongoose.Schema({
  product_name: String,
  product_price: Number,
  product_discount: Number,
  product_image: String, // File path for product image
  sex: { type: String, enum: ["men", "women", "kids"] },
  best_seller: Boolean,
  featured: Boolean,
});
```

### **Staff Schema**
Handles Manager and Staff account details:
```javascript
const staffSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "STAFF" },
  active: { type: Boolean, default: true },
});
```



















