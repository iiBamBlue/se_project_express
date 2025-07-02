# WTWR (What to Wear?) - Express API

## Project Description

The WTWR (What to Wear?) Express API is a robust backend server that powers the WTWR application. This RESTful API provides comprehensive functionality for managing users and clothing items, including features for creating, reading, updating, and deleting data, as well as a sophisticated like/unlike system for clothing items.

The API is designed to help users make informed decisions about what to wear based on weather conditions by managing a database of clothing items categorized by weather types (hot, warm, cold).

## Features

- **User Management**: Create and retrieve user profiles with avatar support
- **Clothing Items**: Full CRUD operations for clothing items
- **Weather Integration**: Clothing items categorized by weather conditions
- **Like System**: Users can like and unlike clothing items
- **Data Validation**: Comprehensive input validation and error handling
- **MongoDB Integration**: Persistent data storage with MongoDB
- **RESTful Design**: Clean, predictable API endpoints

## Technologies and Techniques Used

### Project Documentation

- [Architecture Overview](./docs/architecture.md)
- [Error Handling Strategy](./docs/error-handling.md)
- [API Reference](./docs/api-reference.md)

### Backend Technologies

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - ODM for MongoDB, providing schema validation

### Development Tools

- **ESLint** - Code linting with Airbnb style guide
- **Prettier** - Code formatting
- **Nodemon** - Development server with hot reload
- **Validator** - Input validation library

### Modern JavaScript Features (ES6+)

- **Arrow Functions** - Concise function syntax
- **Destructuring Assignment** - Extract values from objects and arrays
- **Template Literals** - String interpolation
- **Const/Let** - Block-scoped variable declarations
- **Async/Await** - Promise-based asynchronous operations

### API Design Patterns

- **RESTful Architecture** - Stateless, cacheable API design
- **MVC Pattern** - Separation of concerns with Models, Views, and Controllers
- **Middleware Pattern** - Request processing pipeline
- **Error Handling** - Centralized error management with appropriate HTTP status codes

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

## Running the Project

- `npm run start` — Launch the server in production mode
- `npm run dev` — Launch the server with hot reload for development
- `npm run lint` — Run ESLint to check code quality

## Code Quality

- **ESLint Configuration** - Airbnb style guide with custom rules
- **Prettier Integration** - Consistent code formatting
- **Input Validation** - Mongoose schemas with custom validators
- **Error Logging** - Detailed error messages for debugging

## Future Enhancements

- User authentication and authorization
- Image upload functionality
- Weather API integration
- Advanced filtering and search
- Rate limiting and security middleware
- Unit and integration testing

## Author

**Darien Johnas**
- GitHub: [@iiBamBlue](https://github.com/iiBamBlue)

## License

This project is licensed under the ISC License. to Wear?): Back End

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12



