# MERN Stack Book Review Platform

A comprehensive full-stack book review platform built with the MERN stack (MongoDB, Express, React, Node.js). This project allows users to sign up, log in, browse books, and add, edit, or delete their own books and reviews.

## Live Demo

* **Frontend (Vercel):** [Live Application](https://book-review-app-topaz.vercel.app/)
* **Backend (Render):** [Live API](https://pravalika-book-review-api.onrender.com)
## Features

- **User Authentication:** Secure user registration and login with JWT (JSON Web Tokens).
- **Book Management (CRUD):**
  - Users can add, edit, and delete their own books.
  - All users can view a paginated list of all books.
- **Review System (CRD):**
  - Logged-in users can add and delete their own reviews for any book.
  - Checks to prevent a user from reviewing the same book twice.
- **Bonus Features:**
  - **Dynamic Search:** Real-time search for books by title or author.
  - **Dark/Light Mode:** Professional theme toggle for user comfort.
  - **Fully Deployed:** Backend and Frontend are live on the internet.

## Technologies Used

* **Frontend:** React, Vite, React Router, Axios, Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** JWT, bcrypt.js
* **Deployment:**
    * Frontend deployed on Vercel.
    * Backend deployed on Render.

## Local Setup & Installation

To run this project on your local machine, follow these steps:

**1. Clone the repository:**
```bash
git clone [https://github.com/YourUsername/book-review-app.git](https://github.com/YourUsername/book-review-app.git)
cd book-review-app
```

**2. Backend Setup:**
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory and add the following variables:
```
MONGO_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<your_jwt_secret>
```
Start the backend server:
```bash
npm run server
```
The backend will be running on `http://localhost:5000`.

**3. Frontend Setup:**
```bash
cd frontend
npm install
```
Create a `.env.development` file in the `frontend` directory and add the following variable:
```
VITE_API_URL=http://localhost:5000
```
Start the frontend development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## API Documentation

### User Routes

| Method | Endpoint             | Description              | Access  |
| :----- | :------------------- | :----------------------- | :------ |
| `POST` | `/api/users/register`| Register a new user      | Public  |
| `POST` | `/api/users/login`   | Authenticate a user & get token | Public  |

### Book Routes

| Method   | Endpoint             | Description              | Access  |
| :------- | :------------------- | :----------------------- | :------ |
| `GET`    | `/api/books`         | Get all books (paginated & searchable) | Public  |
| `GET`    | `/api/books/:id`     | Get a single book and its reviews | Public  |
| `POST`   | `/api/books`         | Create a new book        | Private |
| `PUT`    | `/api/books/:id`     | Update a book created by the user | Private |
| `DELETE` | `/api/books/:id`     | Delete a book created by the user | Private |

### Review Routes

| Method   | Endpoint                   | Description              | Access  |
| :------- | :------------------------- | :----------------------- | :------ |
| `POST`   | `/api/books/:id/reviews`   | Add a review to a book   | Private |
| `DELETE` | `/api/reviews/:id`         | Delete a review created by the user | Private |