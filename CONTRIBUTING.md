- CONTRIBUTING.md: Guidelines for contributing, coding standards, and commit message format.

## Contributing

1. Follow the existing code style and conventions
2. Run `npm run lint` before committing
3. Ensure all tests pass
4. Update documentation as needed


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

The API implements comprehensive error handling with appropriate HTTP status codes:

- **400 Bad Request** - Invalid data or malformed request
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server-side errors