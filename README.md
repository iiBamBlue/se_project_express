# WTWR (What to Wear?) - Express API

## Project Description

The WTWR (What to Wear?) Express API is a robust backend server that powers the WTWR application. This RESTful API provides comprehensive functionality for managing users and clothing items, helping users make informed decisions about what to wear based on weather conditions.

## Technologies

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Helmet** - Security middleware
- **Validator** - Input validation

## Installation and Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/iiBamBlue/se_project_express.git
   cd se_project_express
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up MongoDB**

   - Ensure MongoDB is running on `mongodb://127.0.0.1:27017/wtwr_db`

4. **Start the server**

   ```bash
   npm run start    # Production mode
   npm run dev      # Development mode with hot reload
   ```

## Project Structure

```text
se_project_express/
├── app.js                 # Main application entry point
├── package.json           # Dependencies and scripts
├── models/                # Mongoose schemas and models
│   ├── user.js           # User model with validation
│   └── clothingItem.js   # Clothing item model
├── routes/               # Express route definitions
│   ├── index.js         # Main router with 404 handling
│   ├── users.js         # User-related routes
│   └── clothingItems.js # Clothing item routes
├── controllers/          # Route handler logic
│   ├── users.js         # User controller functions
│   └── clothingItems.js # Clothing item controllers
├── utils/               # Utility modules
│   ├── constants.js     # HTTP status codes and error handling
│   └── errors.js        # Error message definitions
└── .eslintrc.js         # ESLint configuration
```

## Running the Project

- `npm run start` — Launch the server in production mode
- `npm run dev` — Launch the server with hot reload for development
- `npm run lint` — Run ESLint to check code quality

## Documentation

For detailed information about the project architecture, API endpoints, error handling, and contributing guidelines, please refer to:

- `docs/architecture.md` - Application structure, design patterns, and architectural decisions
- `docs/error-handling.md` - Comprehensive error handling philosophy and implementation details
- `CONTRIBUTING.md` - API endpoints, data schemas, contribution guidelines, and development workflow

## Author

Darien Johnas

- GitHub: [@iiBamBlue](https://github.com/iiBamBlue)

## License

This project is licensed under the ISC License
