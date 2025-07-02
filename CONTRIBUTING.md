# Contributing to WTWR Express API

Thank you for your interest in contributing to the WTWR Express API project! This document provides guidelines and information for contributors.

## Getting Started

1. **Fork the repository** and clone your fork locally
2. **Install dependencies**: `npm install`
3. **Set up MongoDB** locally on `mongodb://127.0.0.1:27017/wtwr_db`
4. **Start the development server**: `npm run dev`

## Development Guidelines

1. Follow the existing code style and conventions
2. Run `npm run lint` before committing to ensure code quality
3. Ensure all tests pass (when tests are implemented)
4. Update documentation as needed
5. Use meaningful commit messages
6. Keep commits focused and atomic

## Development Workflow

1. **Create a feature branch** from `main`
2. **Make your changes** following the code style guidelines
3. **Test your changes** manually using the API endpoints
4. **Run linting**: `npm run lint` to check code quality
5. **Commit your changes** with a descriptive message
6. **Push your branch** and create a pull request
7. **Address review feedback** if any

### Commit Message Format

Use clear, descriptive commit messages:

- `feat: add user authentication endpoint`
- `fix: resolve validation error in clothing items`
- `docs: update API documentation`
- `refactor: improve error handling structure`

## Code Style

- Use ESLint with Airbnb configuration
- Use Prettier for code formatting
- Follow RESTful API conventions
- Use async/await for asynchronous operations
- Implement proper error handling with status codes

## API Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:userId` - Get user by ID
- `POST /users` - Create new user

### Clothing Items

- `GET /items` - Get all clothing items
- `POST /items` - Create new clothing item
- `DELETE /items/:itemId` - Delete clothing item by ID
- `PUT /items/:itemId/likes` - Like a clothing item
- `DELETE /items/:itemId/likes` - Unlike a clothing item

## Data Models

### User Schema

```javascript
{
  name: String (required, 2-30 characters),
  avatar: String (required, valid URL)
}
```

### Clothing Item Schema

```javascript
{
  name: String (required, 2-30 characters),
  weather: String (required, enum: ['hot', 'warm', 'cold']),
  imageUrl: String (required, valid URL),
  owner: ObjectId (required, reference to User),
  likes: [ObjectId] (array of User references),
  createdAt: Date (default: Date.now)
}
```

## Error Handling

The API uses centralized error handling. For detailed implementation, see `docs/error-handling.md`.

Key points for contributors:

- Use the constants from `utils/constants.js` for status codes and error messages
- Use `mapErrorToResponse()` function for consistent error mapping
- Follow the established error response format

## Request/Response Examples

### Create User

**Request:**

```bash
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "avatar": "https://example.com/avatar.jpg",
  "__v": 0
}
```

### Create Clothing Item

**Request:**

```bash
POST /items
Content-Type: application/json

{
  "name": "Winter Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/jacket.jpg"
}
```

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Winter Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/jacket.jpg",
  "owner": "507f1f77bcf86cd799439011",
  "likes": [],
  "createdAt": "2025-07-02T12:00:00.000Z",
  "__v": 0
}
```

## Project Architecture

For detailed application structure and design decisions, see `docs/architecture.md`.

Quick reference for contributors:

- **Routes** (`routes/`): Define API endpoints
- **Controllers** (`controllers/`): Handle business logic
- **Models** (`models/`): Define data schemas
- **Utils** (`utils/`): Shared constants and utilities

## Testing and Debugging

### Quick Testing Commands

```bash
# Get all users
curl -X GET http://localhost:3001/users

# Create a new user
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "avatar": "https://example.com/avatar.jpg"}'
```

### Common Issues

- **400 Bad Request**: Check data validation and required fields
- **404 Not Found**: Verify the resource ID exists in the database
- **500 Internal Server Error**: Check server logs for detailed error messages

For more detailed debugging information, see the documentation files.

## Need Help?

If you encounter issues or have questions:

1. **Check the documentation**:
   - `docs/architecture.md` - Application structure and design decisions
   - `docs/error-handling.md` - Error handling implementation details
2. **Review existing code** for patterns and conventions
3. **Check server logs** for error messages and stack traces
4. **Create an issue** for bugs or feature requests

## Additional Resources

- Project setup and overview: `README.md`
- Detailed architecture: `docs/architecture.md`
- Error handling guide: `docs/error-handling.md`
