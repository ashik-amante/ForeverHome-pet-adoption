# 🐾 ForeverHome – Pet Adoption & Donation Platform

A full-stack **MERN-based web application** designed to help pets find loving homes and enable users to support animals through donation campaigns. The platform includes secure authentication, role-based dashboards, adoption request handling, and Stripe-powered donations.

---

## 🔗 Live Demo

👉 **Live Site:** [https://foreverhome-21484.web.app/](https://foreverhome-21484.web.app/)
👉 **Client Repo:** [https://github.com/ashik-amante/ForeverHome-pet-adoption](https://github.com/ashik-amante/ForeverHome-pet-adoption)
👉 **Server Repo:** [https://github.com/ashik-amante/ForeverHome-Server](https://github.com/ashik-amante/ForeverHome-Server)

---

##  Key Features

###  Public Features

* Browse available pets with **search, category filtering**
* View detailed pet profiles and submit **adoption requests**
* Explore donation campaigns with progress tracking
* Secure online donations using **Stripe**

###  Authentication & Security

* Firebase Authentication (Email/Password, Google)
* JWT-based authorization
* Role-based access control (**User & Admin**)
* Protected routes for dashboards and sensitive actions

###  User Dashboard

* Add, update, and manage pets
* View and manage adoption requests
* Create and manage donation campaigns
* Track personal donation history

###  Admin Dashboard

* Manage all users and assign admin roles
* View, update, or delete any pet
* Manage all donation campaigns (edit, pause/unpause)

---

##  Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* ShadCN UI 
* TanStack Table
* React Hook Form

### Backend

* Node.js
* Express.js
* MongoDB 
* JWT Authentication

### Authentication & Payments

* Firebase Authentication
* Stripe Payment Gateway

### Tools & Deployment

* Vercel (Frontend)
* imgbb (Image Uploads)
* Git & GitHub



## ⚙️ Installation & Setup

### 1️⃣ Clone the repositories

```bash
git clone https://github.com/ashik-amante/ForeverHome-pet-adoption
git clone https://github.com/ashik-amante/ForeverHome-Server
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
STRIPE_SECRET_KEY=your_key
DB_USER=your user
DB_PASS=your password
```

### 4️⃣ Run the project

```bash
# Client
npm run dev

# Server
nodemon index.js
```

---

## 🚀 Deployment

* Frontend deployed on **Firebase**
* Backend deployed on **Vercel**

---

## 📌 Future Improvements

* Email notifications for adoption status
* Admin analytics dashboard
* Refund handling via Stripe Webhooks
* Server-side caching for performance

---

