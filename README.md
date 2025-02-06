# DressAura - A Clothing E-commerce Website

DressAura is a full-stack clothing e-commerce website offering user authentication, product listings, and shopping cart functionality. Built with React and Node.js, this project allows users to browse clothing, add products to a cart, and proceed to checkout (planned for future).

## Installation

To run the project locally, follow these steps:

### Prerequisites:
- Node.js installed (version 14 or above)
- MongoDB for database storage
- A code editor like Visual Studio Code
- Git

### Steps:
1. **Clone the repository**:

    ```bash
    git clone https://github.com/AyushGhimire077/DressAura.git
    ```

2. **Navigate to the project folder**:

    ```bash
    cd DressAura
    ```

3. **Install dependencies**:

    - For the **client** (frontend):

        ```bash
        cd client
        npm install
        ```

    - For the **server** (backend):

        ```bash
        cd server
        npm install
        ```

4. **Environment setup**:

    Create a `.env` file in both the **client** and **server** directories for environment variables.

    Example for **server/.env**:
    ```
    PORT=5000
    MONGO_URI=<Your MongoDB URI>
    JWT_SECRET=<Your JWT Secret>
    ```

5. **Run the project**:

    - For the **client**:

        ```bash
        cd client
        npm start
        ```

    - For the **server**:

        ```bash
        cd server
        npm start
        ```

## Project Structure

Here’s an overview of the project structure:

DressAura/
├── client/                # React frontend
│   ├── src/               # Source code for React
│   ├── public/            # Static files like index.html
│   └── package.json       # Frontend dependencies and scripts
└── server/                # Node.js backend
    ├── controllers/       # Backend logic
    ├── models/            # Data models
    ├── routes/            # API routes
    ├── config/            # Configuration files
    └── package.json       # Backend dependencies and scripts


## Features

- **User Authentication**: Secure user authentication for sign-up, login, and password reset using JWT tokens.
- **Product Listing**: Browse a wide range of clothing items with categories and filters.
- **Shopping Cart**: Add, remove, and update product quantities in the shopping cart.
- **Responsive UI**: Mobile-friendly design built using React and styled-components.
- **Payment Integration**: *Planned* future integration with payment gateways like Stripe.

## Technologies Used

- **Frontend**: React, React Router (routing), Axios (API calls)
- **Backend**: Node.js, Express (REST API), MongoDB (database), Mongoose (ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS, styled-components
- **Tools**: Git, dotenv (environment variables)

## Contributing

If you’d like to contribute to DressAura, follow these steps:

1. Fork the repository.
2. Create your branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request with a detailed description of your changes.
