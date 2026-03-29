# 💰 Smart Expense Analyzer (AI-Powered Financial Assistant)

An AI-driven personal finance analytics platform that helps users track expenses, analyze spending patterns, detect unusual transactions, and interact with their financial data using an intelligent assistant.

The project combines **full-stack web development, machine learning, and AI retrieval systems** to build a real-world financial insights platform.

---

# 🚀 Key Features

### 👤 User Authentication
- Secure **JWT based authentication**
- Register and login functionality
- Each user has isolated financial data

### 💳 Expense Management
- Add expenses with description and amount
- Automatic **category classification using ML**
- Stores data per user in MongoDB

### 📊 Analytics Dashboard
Interactive dashboard displaying:

- Expense history table
- Category spending breakdown
- Spending distribution pie chart
- Monthly spending predictions

### 🤖 AI Financial Assistant
Users can ask natural language questions about their spending.

Example queries:

```
Where am I spending the most?
What was my highest expense?
How can I reduce my spending?
Show my food expenses
```

The assistant uses **Retrieval Augmented Generation (RAG)** and **semantic search** over user transactions.

### 🧠 Machine Learning Integration

The system integrates multiple ML models:

**1. Expense Category Classifier**
- Model: Logistic Regression / Naive Bayes
- Predicts category from description

Example:

```
Input: "swiggy order"
Output: Food
```

**2. Spending Prediction Model**
- Model: Linear Regression
- Predicts next month spending

Example:

```
Expected next month spending: ₹23,200
```

**3. Anomaly Detection**
- Model: Isolation Forest
- Detects unusual spending behavior

Example:

```
Alert: ₹7000 spent today
Your average daily spend: ₹1200
```

### 📄 Financial Report Generator
Users can download a PDF financial report including:

- Total spending
- Highest spending category
- Average daily spending
- AI insights

### 🔎 Semantic AI Search
Instead of keyword matching, the AI assistant uses **sentence embeddings** to retrieve relevant transactions.

Example:

```
Query: "rides I took"
Matches: Uber, Ola, Transport expenses
```

---

# 🧠 AI Architecture

The system uses a **Retrieval Augmented Generation (RAG)** approach.

```
User Question
     ↓
React AI Chat
     ↓
Node.js Backend
     ↓
MongoDB User Transactions
     ↓
RAG Service (Python)
     ↓
Sentence Embeddings + Semantic Search
     ↓
AI Response
```

Technologies used:

- Sentence Transformers
- Embedding similarity search
- Transaction retrieval
- Context-based responses

---

# 🏗️ System Architecture

```
Frontend (React)
       ↓
Node.js Backend (Express API)
       ↓
MongoDB Database
       ↓
Python ML + RAG Service
```

### Components

Frontend:
- React
- Axios
- Chart.js

Backend:
- Node.js
- Express
- JWT Authentication
- MongoDB

AI Services:
- Python
- FastAPI
- Sentence Transformers
- Scikit-learn

---

# 📂 Project Structure

```
smart-expense-analyzer
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── AddExpenseForm.jsx
│   │   │   ├── ExpenseTable.jsx
│   │   │   ├── SpendingChart.jsx
│   │   │   ├── PredictionCard.jsx
│   │   │   └── AIChat.jsx
│   │   ├── Dashboard.jsx
│   │   └── App.jsx
│
├── backend
│   ├── controllers
│   │   ├── authController.js
│   │   ├── expenseController.js
│   │   ├── analyticsController.js
│   │   ├── reportController.js
│   │   └── aiController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Expense.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── expenseRoutes.js
│   │   ├── analyticsRoutes.js
│   │   └── aiRoutes.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   └── server.js
│
├── ml
│   ├── rag_service.py
│   ├── classifier_model.pkl
│   └── prediction_model.pkl
│
└── README.md
```

---

# ⚙️ Installation Guide

## 1. Clone the Repository

```
git clone https://github.com/yourusername/smart-expense-analyzer.git
cd smart-expense-analyzer
```

---

# 🖥 Backend Setup

Install dependencies:

```
cd backend
npm install
```

Create `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Start backend server:

```
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

# 🎨 Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🧠 AI / ML Service Setup

Install Python dependencies:

```
pip install fastapi uvicorn sentence-transformers scikit-learn numpy
```

Start the AI service:

```
uvicorn rag_service:app --reload --port 9000
```

AI service runs on:

```
http://127.0.0.1:9000
```

---

# 🔌 API Endpoints

### Authentication

```
POST /auth/register
POST /auth/login
```

### Expenses

```
POST /api/add-expense
GET  /api/expenses
```

### Analytics

```
GET /analytics/category-summary
GET /analytics/prediction
```

### AI Assistant

```
POST /ai/ask
```

### Reports

```
GET /reports/download
```

---

# 📊 Example Workflow

1️⃣ User logs in

2️⃣ Adds expense

```
Description: Swiggy order
Amount: 300
```

3️⃣ System automatically predicts:

```
Category: Food
```

4️⃣ Anomaly detector checks:

```
Normal spending
```

5️⃣ Dashboard updates analytics

6️⃣ User asks AI:

```
Where am I spending the most?
```

7️⃣ AI retrieves transactions and responds.

---

# 💡 Technologies Used

Frontend
- React
- Chart.js
- Axios

Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

Machine Learning
- Scikit-learn
- Isolation Forest
- Linear Regression

AI
- Sentence Transformers
- Semantic Search
- Retrieval Augmented Generation (RAG)

---

# 📌 Future Enhancements

Potential upgrades:

- Receipt scanning with OCR
- Voice expense entry
- Smart budgeting advisor
- Mobile app version
- Vector database for scalable RAG
- Financial behavior insights

---

# 👨‍💻 Author

Developed as a **full-stack AI project combining MERN stack and machine learning** to demonstrate practical AI integration in modern web applications.

---

# ⭐ If you like this project

Give the repository a star and feel free to contribute improvements!
