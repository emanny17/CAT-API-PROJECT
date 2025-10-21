# 🐱 Cat Facts API

This project was built for the HNG13 Backend Internship (Stage 0).

It is a RESTful API that returns user information along with random cat facts from the Cat Facts API.

## 📋 Table of Contents

- Features
- Tech Stack
- Prerequisites
- Installation
- Environment Variables
- Running Locally
- API Endpoints
- Project Structure
- Error Handling
- Deployment
- Testing
- Troubleshooting
- Contributing
- License

---

## ✨ Features

- ✅ RESTful GET endpoint at `/me`
- ✅ Integration with Cat Facts API
- ✅ Dynamic timestamp generation (ISO 8601 format)
- ✅ Graceful error handling with fallback messages
- ✅ CORS enabled for cross-origin requests
- ✅ Request logging with timestamps
- ✅ Production-ready error handling
- ✅ Environment-based configuration
- ✅ API timeout protection (5 seconds)

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (v14+ required)
- **Framework**: Express.js (v4.18+)
- **HTTP Client**: Axios (v1.6+)
- **Middleware**: 
  - express-async-handler (v1.2+)
  - cors (v2.8+)
- **Environment Management**: dotenv (v16.3+)

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**
- **Git** (for cloning the repository)

Check your versions:
```bash
node --version
npm --version
git --version
```

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/cat-facts-api.git
cd cat-facts-api
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### Dependencies Installed:

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^4.18.2 | Web framework for Node.js |
| `axios` | ^1.6.0 | HTTP client for making API requests |
| `express-async-handler` | ^1.2.0 | Error handling for async routes |
| `cors` | ^2.8.5 | Enable CORS for cross-origin requests |
| `dotenv` | ^16.3.1 | Load environment variables from .env file |

---

## 🔐 Environment Variables

Create a `.env` file in the root directory of your project:

```bash
touch .env
```

Add the following environment variables to your `.env` file:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# User Information (REQUIRED)
USER_EMAIL=your.email@example.com
USER_NAME=Your Full Name
USER_STACK=Node.js/Express

# API Configuration
CAT_API_URL=https://catfact.ninja/fact
API_TIMEOUT=5000
```

### Environment Variables Explained:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 8080 | Port number where the server will run |
| `NODE_ENV` | No | development | Environment mode (development/production) |
| `USER_EMAIL` | **Yes** | N/A | Your email address |
| `USER_NAME` | **Yes** | N/A | Your full name |
| `USER_STACK` | **Yes** | N/A | Your backend technology stack |
| `CAT_API_URL` | No | https://catfact.ninja/fact | Cat Facts API endpoint |
| `API_TIMEOUT` | No | 5000 | API request timeout in milliseconds |

### ⚠️ Important Security Notes:

- **Never commit your `.env` file to version control!**
- Add `.env` to your `.gitignore` file:
  ```
  .env
  node_modules/
  ```

---

## 💻 Running Locally

### Step 1: Set Up Environment Variables

Make sure you've created your `.env` file with all required variables (see above).

### Step 2: Start the Server

**Development Mode:**
```bash
npm start
```

**With Auto-Restart (using nodemon):**
```bash
# Install nodemon globally (one-time)
npm install -g nodemon

# Or add to dev dependencies
npm install --save-dev nodemon

# Add to package.json scripts:
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

# Run with nodemon
npm run dev
```

### Step 3: Verify Server is Running

You should see output like:
```
[2025-10-21T14:30:45.789Z] Server is running on port 8080

```

### Step 4: Test the API

**Using curl:**
```bash
# Test the main endpoint
curl http://localhost:8080/me

```

**Using a browser:**
- Open: http://localhost:8080/me

**Using Postman:**
1. Create a new GET request
2. URL: `http://localhost:8080/me`
3. Click "Send"

---

## 📡 API Endpoints

### 1. GET /me

Returns user information along with a random cat fact.

**Request:**
```http
GET /me HTTP/1.1
Host: localhost:8080
```

**Response:** `200 OK`
```json
{
  "status": "success",
  "user": {
    "email": "your.email@example.com",
    "name": "Your Full Name",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-21T14:30:45.789Z",
  "fact": "Cats sleep 70% of their lives."
}
```

**Response Headers:**
```
Content-Type: application/json
Access-Control-Allow-Origin: *
```

**Features:**
- ✅ Fetches a new cat fact on every request
- ✅ Dynamic timestamp updates with each request
- ✅ Graceful fallback if Cat Facts API is unavailable
- ✅ 5-second timeout protection

---

### 2. Any Other Endpoint

**Request:**
```http
GET /unknown-route HTTP/1.1
Host: localhost:8080
```

**Response:** `404 Not Found`
```json
{
  "status": "error",
  "message": "Endpoint not found"
}
```

---

## 📁 Project Structure

```
cat-facts-api/
├── server.js              # Main application file
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked versions of dependencies
├── .env                   # Environment variables (not in repo)
├── .env.example           # Example environment variables
├── .gitignore            # Git ignore file
├── README.md             # This file
└── node_modules/         # Installed dependencies (not in repo)
```

---

## 🛡️ Error Handling

### API Timeout
If the Cat Facts API takes longer than 5 seconds to respond:

```json
{
  "status": "success",
  "user": { ... },
  "timestamp": "2025-10-21T14:30:45.789Z",
  "fact": "Cats are fascinating creatures! (Cat Facts API temporarily unavailable)"
}
```

### Cat Facts API Down
If the API returns an error or is unreachable:

```json
{
  "status": "success",
  "user": { ... },
  "timestamp": "2025-10-21T14:30:45.789Z",
  "fact": "Cats are fascinating creatures! (Cat Facts API temporarily unavailable)"
}
```

### Internal Server Error
If an unexpected error occurs:

**Development:**
```json
{
  "status": "error",
  "message": "Detailed error message",
  "timestamp": "2025-10-21T14:30:45.789Z"
}
```

**Production:**
```json
{
  "status": "error",
  "message": "Internal server error",
  "timestamp": "2025-10-21T14:30:45.789Z"
}
```

---

## 🚀 Deployment

This API can be deployed to various platforms. See detailed guides:

### Quick Deploy Options:

**Railway (Easiest):**
1. Push code to GitHub
2. Connect repository to Railway
3. Set environment variables in Railway dashboard
4. Deploy automatically

**Heroku:**
```bash
heroku create your-app-name
heroku config:set USER_EMAIL=your@email.com
git push heroku main
```

**Render:**
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `node server.js`
4. Add environment variables
5. Deploy

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🧪 Testing

### Manual Testing

**Test the /me endpoint:**
```bash
curl http://localhost:8080/me
```

Expected: JSON response with status, user, timestamp, and fact

**Test 404 handling:**
```bash
curl http://localhost:8080/invalid-route
```

Expected: 404 error with appropriate message

### Automated Testing (Optional)

To add automated tests, install testing dependencies:

```bash
npm install --save-dev jest supertest
```

Create `server.test.js`:
```javascript
import request from 'supertest';
import app from './server.js';

describe('GET /me', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/me');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });
});
```

Run tests:
```bash
npm test
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'express'"

**Solution:**
```bash
npm install
```

### Issue: "SyntaxError: Cannot use import statement outside a module"

**Solution:** Add `"type": "module"` to your `package.json`:
```json
{
  "type": "module",
  ...
}
```

### Issue: Port 8080 is already in use

**Solution:** 
1. Kill the process using port 8080:
   ```bash
   # macOS/Linux
   lsof -ti:8080 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :8080
   taskkill /PID <PID> /F
   ```
2. Or change the PORT in your `.env` file to a different number

### Issue: "Endpoint not found" for /me

**Solution:**
- Check that you're accessing the exact URL: `http://localhost:8080/me`
- Check capitalization (must be lowercase `/me`)
- Verify server is running (check terminal for startup logs)
- Ensure `package.json` has `"type": "module"`

### Issue: Cat fact not updating

**Solution:** This is expected behavior if the Cat Facts API is down. The fallback message will be used.

### Issue: Environment variables not loading

**Solution:**
- Verify `.env` file is in the root directory
- Check for typos in variable names
- Ensure no spaces around `=` in `.env` file
- Restart the server after changing `.env`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Emmanuel Nwosu**
- Email: emmanuelnwosu109@gmail.com
- GitHub: [@emanny17](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- [Cat Facts API](https://catfact.ninja/) for providing cat facts
- [Express.js](https://expressjs.com/) for the web framework
- [Axios](https://axios-http.com/) for HTTP requests

---

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Contact: emmanuelnwosu109@gmail.com





