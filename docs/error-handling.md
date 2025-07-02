# 🚨 Error Handling Strategy

This project uses a dual-layered approach to error management:

- `constants.js`: Defines `STATUS_CODES` (e.g., `OK`, `BAD_REQUEST`)
- `errors.js`: Defines `ERROR_MESSAGES` error keys to human-readable messages
- `errorHandler.js`: Centralized logic to map raw errors to standardized responses

---

## ✅ Benefits

- Centralized control over all error responses
- Clean, readable route handlers
- Easy to internationalize or customize messages later
- Consistent developer experience across the codebase

---

## 🧠 Mongoose-Specific Error Mapping

The `mapErrorToResponse()` utility in `utils/errorHandler.js` automatically translates common Mongoose and MongoDB errors into clean API responses.

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
// utils/errorHandler.js
 * Maps raw error objects to standardized status codes and messages.
 * @param {Error} err - The error object thrown by a controller or middleware
 * @returns {{ statusCode: number, message: string }}
