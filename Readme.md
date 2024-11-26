Online Dress Sales Website
This is an Online Dress Sales Website built using the MERN stack (MongoDB, Express.js, React, Node.js) with role-based access control, allowing different types of users (Admin, Manager/Staff, and User) to interact with the site based on their permissions.

Features
Admin Role:

View and manage users/staff, products, stock, and orders.
Register staff members and make them inactive.
Access stock details and sales data.
Manager/Staff Role:

Add, edit, delete, and view products.
Manage product listings for the website.
User Role:

Create an account and login.
Browse products, add items to the cart, and checkout.
Tech Stack
Frontend: React, React Router, Zustand (for global state management), Tailwind CSS
Backend: Express.js, MongoDB (via MongoDB Atlas), JWT Authentication, Multer (for file uploads)
Deployment: Render (for both frontend and backend)
Database Models
User Model
Stores details about regular users and their carts.

javascript
Copy code
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cartArray: [mongoose.Schema.Types.ObjectId],  // Array of product IDs
});
Product Model
Stores details about products listed for sale.

javascript
Copy code
const productSchema = new mongoose.Schema({
  product_name: String,
  product_price: Number,
  product_discount: Number,
  product_image: String,
  sex: String,  // "men", "women", "kids"
  best_seller: Boolean,
  featured: Boolean,
});
Staff Model
Stores staff (Manager or Admin) information.

javascript
Copy code
const staffSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String, // "STAFF", "MANAGER", "ADMIN"
  active: Boolean,
});
Usage
User Flow:
Admin: Can view users, orders, stocks, and sales. They can register staff members and make them inactive.
Manager/Staff: Can view and manage product listings (add, edit, delete).
User: Can create an account, add items to the cart, and proceed to checkout.
Authentication
Role-Based Access Control (RBAC) is implemented to ensure that only admins can create accounts for managers and staff, while users can only register themselves.
JWT Authentication is used to protect routes and manage user sessions.
Setup Instructions
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/yourproject.git
cd yourproject
Install dependencies:

For the backend:
bash
Copy code
cd backend
npm install
For the frontend:
bash
Copy code
cd frontend
npm install
Backend Setup:

Create a .env file in the backend folder with the following variables:
env
Copy code
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
Run the application:

For backend:
bash
Copy code
cd backend
npm start
For frontend:
bash
Copy code
cd frontend
npm start
Visit the website in your browser:
http://localhost:3000

Deployment Instructions
Create a Render account at Render.

Deploy Backend:

Go to Render and create a New Web Service.
Choose Node.js as the environment and connect your GitHub repository.
Set the Build Command: npm install and Start Command: npm start.
Set up environment variables such as MONGODB_URI and JWT_SECRET.
Deploy Frontend:

Create a New Static Site on Render, connect your frontend repository, and set the Build Command to npm run build and Publish Directory to build/.
MongoDB Atlas:

Use MongoDB Atlas for the database and configure the URI in your Render environment variables.
Custom Domain (Optional):

Configure your custom domain in Render’s settings.
Testing
Currently, no tests have been implemented. Future tests may include:

Unit tests for the backend using Jest or Mocha.
Component tests for the frontend using React Testing Library or Jest.
To run tests (once implemented), you can use:

bash
Copy code
npm test
Contributing
If you'd like to contribute to this project:

Fork the repository.
Create a new branch for your feature or fix.
Open a pull request with a detailed description of your changes.
License