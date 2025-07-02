# Error Handling Architecture

This project uses a centralized error-handling strategy to ensure consistent and expressive API responses.

---

## Project Structure

```
├── app.js                     # Main application entry point
├── controllers/               # Request handlers
│   ├── users.js                 # User-related controllers
│   └── clothingItems.js         # Clothing item controllers
├── models/                    # Data models
│   ├── user.js                  # User schema
│   └── clothingItem.js          # Clothing item schema
├── routes/                    # API routes
│   ├── index.js                 # Main router
│   ├── users.js                 # User routes
│   └── clothingItems.js         # Clothing item routes
├── utils/                     # Utility functions
│   ├── errorHandler.js          # maps Mongoose errors to standardized HTTP responses
│   ├── constants.js             # General constants
│   └── errors.js                # Error messages
├── docs/                      # A dedicated folder for deeper dives
│   ├── architecture.md          # Explain the app’s structure, reasoning behind module layout, etc
│   ├── error-handling.md        # Dive deeper into my constants/errors philosophy and usage
│   └── api-reference.md         # Document available API endpoints, parameters, response formats
├── .eslintrc.js               # ESLint configuration
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation-High-level overview, setup instructions, and usage examples
```

### 🔄 Flow Overview

1. **Controllers** throw raw errors (e.g., Mongoose `CastError`, `ValidationError`, or custom errors).
2. **`mapErrorToResponse()`** in `errorHandler.js` maps these to:
   - `STATUS_CODES` (e.g., `BAD_REQUEST`, `CONFLICT`)
   - `ERROR_MESSAGES` (e.g., `INVALID_ID`, `DUPLICATE_ENTRY`)
3. **Route handlers** respond with clean, standardized JSON error objects.

### 🧠 Why This Matters

- Keeps route logic clean and focused
- Avoids hardcoded strings or status codes
- Makes debugging and testing easier (especially with Postman)
