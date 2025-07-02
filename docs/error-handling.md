# 🚨 Error Handling Strategy

This project uses a centralized approach to error management:

- `constants.js`: Defines `STATUS_CODES`, `ERROR_MESSAGES`, and `mapErrorToResponse()` function
- `errors.js`: Defines error message constants for human-readable messages

---

## ✅ Benefits

- Centralized control over all error responses
- Clean, readable route handlers
- Easy to internationalize or customize messages later
- Consistent developer experience across the codebase
- No circular dependencies - all error handling logic in one place

---

## 🧠 Mongoose-Specific Error Mapping

The `mapErrorToResponse()` utility in `utils/constants.js` automatically translates common Mongoose and MongoDB errors into clean API responses.

| Error Type         | Status Code                   | Message                        |
|--------------------|-------------------------------|--------------------------------|
| `CastError`        | `STATUS_CODES.BAD_REQUEST`    | `ERROR_MESSAGES.INVALID_ID`   |
| `ValidationError`  | `STATUS_CODES.BAD_REQUEST`    | `ERROR_MESSAGES.INVALID_DATA` |
| `MongoError 11000` | `STATUS_CODES.CONFLICT`       | `ERROR_MESSAGES.DUPLICATE_ENTRY` |
| Unknown/Error      | `STATUS_CODES.INTERNAL_SERVER_ERROR` | `ERROR_MESSAGES.GENERIC_SERVER_ERROR` |

> 💡 Why this matters: Mapping Mongoose error types keeps backend responses clean and consistent for frontend consumers.

---

## 🛠️ Helper Function: `mapErrorToResponse()`

```js
// utils/constants.js
/**
 * Maps raw error objects to standardized status codes and messages.
 * @param {Error} err - The error object thrown by a controller or middleware
 * @returns {{ statusCode: number, message: string }}
 */
function mapErrorToResponse(err) {
  if (err.name === "CastError") {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGES.INVALID_ID,
    };
  }
  if (err.name === "ValidationError") {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGES.INVALID_DATA,
    };
  }
  if (err.code === 11000) {
    return {
      statusCode: STATUS_CODES.CONFLICT,
      message: ERROR_MESSAGES.DUPLICATE_ENTRY,
    };
  }
  return {
    statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
    message: ERROR_MESSAGES.GENERIC_SERVER_ERROR,
  };
}
```

## 📋 Usage Examples

### In Controllers

```js
// controllers/users.js
const getUser = (req, res, next) => {
  const { userId } = req.params;
  
  User.findById(userId)
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
      error.statusCode = STATUS_CODES.NOT_FOUND;
      return Promise.reject(error);
    })
    .then((user) => res.status(STATUS_CODES.OK).json(user))
    .catch((err) => {
      const { statusCode, message } = mapErrorToResponse(err);
      res.status(statusCode).json({ message });
    });
};
```

### Global Error Handler

```js
// app.js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
    .json({
      message: mapErrorToResponse(ERROR_MESSAGES.INTERNAL_SERVER_ERROR),
    });
});
```

## 🔍 Error Response Format

All error responses follow this consistent format:

```json
{
  "message": "Human-readable error message"
}
```

### Examples

**Invalid ID Format:**

```json
{
  "message": "Invalid ID format"
}
```

**Resource Not Found:**

```json
{
  "message": "User not found"
}
```

**Validation Error:**

```json
{
  "message": "Invalid data provided"
}
```

## 🎯 HTTP Status Codes Used

| Code | Constant | Description |
|------|----------|-------------|
| 200 | `OK` | Successful GET request |
| 201 | `CREATED` | Resource successfully created |
| 204 | `NO_CONTENT` | Successful request with no content |
| 400 | `BAD_REQUEST` | Invalid request data |
| 401 | `UNAUTHORIZED` | Authentication required |
| 403 | `FORBIDDEN` | Access denied |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Resource conflict |
| 500 | `INTERNAL_SERVER_ERROR` | Server error |

## 🔧 Adding New Error Types

To add new error handling:

1. **Add error message** to `utils/errors.js`:

```js
const ERROR_MESSAGES = {
  // existing messages...
  NEW_ERROR_TYPE: "Description of the new error",
};
```

1. **Update mapErrorToResponse()** in `utils/constants.js` if needed:

```js
function mapErrorToResponse(err) {
  // existing mappings...
  if (err.name === "NewErrorType") {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: ERROR_MESSAGES.NEW_ERROR_TYPE,
    };
  }
  // fallback...
}
```

1. **Use in controllers**:

```js
const error = new Error(ERROR_MESSAGES.NEW_ERROR_TYPE);
error.statusCode = STATUS_CODES.BAD_REQUEST;
return Promise.reject(error);
```
