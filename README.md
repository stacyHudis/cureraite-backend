# CurerAIte Backend (Fixed Version)

### 1. Install dependencies
```
npm install
```

### 2. Set up environment
Copy `.env.example` to `.env` and add your OpenAI & Pinecone keys.

### 3. Run the server
```
node server.js
```

### 4. Test the API
POST to `http://localhost:3001/ask` with:
```
{ "question": "What can I take to stop bloating after meals?" }
```

Returns illness tag, 3 persona prompts, matching products, and a spicy debate.