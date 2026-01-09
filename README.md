# 🐾 ForeverHome – Pet Adoption & Donation Platform

A full-stack **MERN-based web application** designed to help pets find loving homes and enable users to support animals through donation campaigns. The platform includes secure authentication, role-based dashboards, adoption request handling, and Stripe-powered donations.

---

## 🔗 Live Demo

👉 **Live Site:** [https://foreverhome-21484.web.app/](https://foreverhome-21484.web.app/)
👉 **Client Repo:** [https://github.com/ashik-amante/ForeverHome-pet-adoption](https://github.com/ashik-amante/ForeverHome-pet-adoption)
👉 **Server Repo:** [https://github.com/ashik-amante/ForeverHome-Server](https://github.com/ashik-amante/ForeverHome-Server)

---

## ✨ Key Features

### 🏠 Public Features

* Browse available pets with **search, category filtering, and infinite scrolling**
* View detailed pet profiles and submit **adoption requests**
* Explore donation campaigns with progress tracking
* Secure online donations using **Stripe**

### 👤 Authentication & Security

* Firebase Authentication (Email/Password, Google, GitHub)
* JWT-based authorization
* Role-based access control (**User & Admin**)
* Protected routes for dashboards and sensitive actions

### 📊 User Dashboard

* Add, update, and manage pets
* View and manage adoption requests
* Create and manage donation campaigns
* Track personal donation history

### 🛠️ Admin Dashboard

* Manage all users and assign admin roles
* View, update, or delete any pet
* Manage all donation campaigns (edit, pause/unpause)

---

## 🧰 Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* ShadCN UI / Chakra UI
* TanStack Table
* Formik / React Hook Form

### Backend

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT Authentication

### Authentication & Payments

* Firebase Authentication
* Stripe Payment Gateway

### Tools & Deployment

* Vercel (Frontend)
* Cloudinary / imgbb (Image Uploads)
* Git & GitHub

---

## 📂 Project Structure

```bash
foreverhome-client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── routes/
│   └── utils/

foreverhome-server/
├── routes/
├── controllers/
├── models/
├── middleware/
└── index.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repositories

```bash
git clone https://github.com/your-username/foreverhome-client.git
git clone https://github.com/your-username/foreverhome-server.git
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in both client & server:

#### Client

```env
VITE_FIREBASE_API_KEY=your_key
VITE_STRIPE_PUBLIC_KEY=your_key
```

#### Server

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_key
```

### 4️⃣ Run the project

```bash
# Client
npm run dev

# Server
npm start
```

---

## 🚀 Deployment

* Frontend deployed on **Vercel**
* Backend deployed on **Render / Railway / Vercel Serverless**
* Environment variables secured via hosting dashboards

---

## 📌 Future Improvements

* Email notifications for adoption status
* Admin analytics dashboard
* Refund handling via Stripe Webhooks
* Server-side caching for performance

---

## 👨‍💻 Author

**Abdullah Al Ashik**
MERN Stack Developer
📧 Email: your-email
🔗 LinkedIn: your-linkedin
💻 GitHub: [https://github.com/your-username](https://github.com/your-username)

---

⭐ If you like this project, don’t forget to give it a star!
