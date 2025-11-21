# API Documentation

## Overview
This is a REST API built with Express.js that provides two main services:
1. **Math Service** - Performs various mathematical calculations
2. **Quotes Service** - Manages and retrieves inspirational quotes

---

## Math Service Endpoints

### 1. Circle Calculator
**Endpoint:** `GET /math/circle/:radius`

**Description:** Calculates the area and circumference of a circle given its radius.

**Parameters:**
- `radius` (path parameter): The radius of the circle (number)

**Response:** JSON object containing:
- `radius`: The input radius
- `area`: The calculated area
- `circumference`: The calculated circumference

**Example Request:**
```
GET http://localhost:8000/math/circle/2
```

**Example Response:**
```json
{
  "radius": 2,
  "area": 12.566370614359172,
  "circumference": 12.566370614359172
}
```

---

### 2. Rectangle Calculator
**Endpoint:** `GET /math/rectangle/:length/:width`

**Description:** Calculates the area and perimeter of a rectangle given its length and width.

**Parameters:**
- `length` (path parameter): The length of the rectangle (number)
- `width` (path parameter): The width of the rectangle (number)

**Response:** JSON object containing:
- `length`: The input length
- `width`: The input width
- `area`: The calculated area
- `perimeter`: The calculated perimeter

**Example Request:**
```
GET http://localhost:8000/math/rectangle/4/2
```

**Example Response:**
```json
{
  "length": 4,
  "width": 2,
  "area": 8,
  "perimeter": 12
}
```

---

### 3. Power Calculator
**Endpoint:** `GET /math/power/:base/:exponent`

**Description:** Calculates the power of a base number raised to an exponent. Optionally calculates the root of the result.

**Parameters:**
- `base` (path parameter): The base number (number)
- `exponent` (path parameter): The exponent (number)
- `root` (query parameter, optional): The root to calculate (number)

**Response:** JSON object containing:
- `base`: The input base
- `exponent`: The input exponent
- `result`: The calculated result (power or root)
- `root`: The root parameter (null if not provided)

**Example Request:**
```
GET http://localhost:8000/math/power/2/8?root=3
```

**Example Response:**
```json
{
  "base": 2,
  "exponent": 8,
  "result": 4,
  "root": 3
}
```

---

## Quotes Service Endpoints

### 1.1 Get All Categories
**Endpoint:** `GET /quotebook/categories`

**Description:** Retrieves all available quote categories as plain text. Each category is prefixed with "a possible category is " and placed on its own line.

**Response:** Plain text with each category on a new line

**Example Request:**
```
GET http://localhost:8000/quotebook/categories
```

**Example Response:**
```
a possible category is successQuotes
a possible category is perseveranceQuotes
a possible category is happinessQuotes
```

---

### 1.2 Get Random Quote from Category
**Endpoint:** `GET /quotebook/quote/:category`

**Description:** Retrieves a random quote from the specified category. Returns an error if the category does not exist.

**Parameters:**
- `category` (path parameter): The name of the category (string)

**Response:** JSON object containing:
- `quote`: The quote text
- `author`: The author of the quote

**Status Codes:**
- `200 OK`: Successfully retrieved a quote
- `400 Bad Request`: Invalid or non-existent category

**Example Request:**
```
GET http://localhost:8000/quotebook/quote/happinessQuotes
```

**Example Response:**
```json
{
  "quote": "The purpose of our lives is to be happy.",
  "author": "Dalai Lama"
}
```

**Error Response:**
```json
{
  "error": "no category listed for invalidCategory"
}
```

---

### 1.3 Add New Quote
**Endpoint:** `POST /quotebook/quote/new`

**Description:** Adds a new quote to the specified category. Requires category, quote, and author in the request body.

**Request Body:** JSON object containing:
- `category` (string): The category to add the quote to (must be a valid existing category)
- `quote` (string): The quote text
- `author` (string): The author of the quote

**Response:** Plain text "Success!" on success, or error JSON on failure

**Status Codes:**
- `200 OK`: Quote successfully added
- `400 Bad Request`: Missing required parameters or invalid category

**Example Request:**
```
POST http://localhost:8000/quotebook/quote/new
Content-Type: application/json

{
  "category": "successQuotes",
  "quote": "Success is the sum of small efforts repeated day in and day out.",
  "author": "Robert Collier"
}
```

**Example Response:**
```
Success!
```

**Error Response:**
```json
{
  "error": "invalid or insufficient user input"
}
```

---

## Available Quote Categories

The API comes preloaded with three quote categories:
1. **successQuotes** - Quotes about success and achievement
2. **perseveranceQuotes** - Quotes about perseverance and persistence
3. **happinessQuotes** - Quotes about happiness and contentment

---

## Running the Server

To start the server:

```bash
npm run dev --prefix backend
```

The server will start on the port specified by the `PORT` environment variable, or default to port 8000.

Output:
```
Server is running on port 8000
```

---

## Testing

You can test these endpoints using:
- Your web browser (for GET requests)
- Bruno API client (installed via VS Code extension)
- Postman
- curl command line tool
- Any other HTTP client
