# DressAura - A Clothing E-commerce Website

DressAura is a full-stack clothing e-commerce website with user authentication, product listing, and a shopping cart.

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
├── client/ # Frontend (React)
│ ├── public/ # Static assets
│ └── src/
│ ├── components/ # Reusable UI components (e.g., Header, ProductCard)
│ ├── pages/ # Page components (e.g., Home, Cart, Login)
│ ├── redux/ # Redux setup (actions, reducers, store)
│ ├── assets/ # Images, styles, fonts
│ ├── App.js # Main component with routing
│ └── index.js # React entry point
│
└── server/ # Backend (Node.js/Express)
├── routes/ # API routes (e.g., auth, products, cart)
├── controllers/ # Logic for handling route requests
├── models/ # MongoDB schemas (e.g., User, Product)
├── config/ # Database and middleware configuration
└── index.js # Server entry point


## Features

- **User Authentication**: Sign up, login, and password reset using JWT.
- **Product Listing**: Browse clothing items with categories and filters.
- **Shopping Cart**: Add/remove products and manage quantities.
- **Responsive UI**: Mobile-friendly design built with React and styled-components.
- **Payment Integration**: *Planned* integration with a payment gateway (e.g., Stripe).

## Technologies Used

- **Frontend**: React, Redux (state management), React Router (routing), Axios (API calls)
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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
