# Setup Instructions

## MongoDB Setup

1. Install MongoDB Community Edition from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

2. Create a `.env` file in the `backend` directory with the following content:
```
MONGODB_URI=mongodb://localhost:27017/rc-test
PORT=5000
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Start MongoDB service:
- Windows: MongoDB should run as a service automatically
- Linux/Mac: `sudo service mongod start`

5. Populate the database with sample data:
```bash
cd backend
node
```
Then in the Node.js REPL:
```javascript
const mongoose = require('mongoose');
const sampleParagraph = require('./sampleData');
const Paragraph = mongoose.model('Paragraph', new mongoose.Schema({
  id: String,
  text: String,
  questions: [{
    id: String,
    text: String,
    options: [{
      id: String,
      text: String
    }],
    allowMultiple: Boolean
  }]
}));

mongoose.connect('mongodb://localhost:27017/rc-test')
  .then(() => Paragraph.create(sampleParagraph))
  .then(() => console.log('Sample data inserted'))
  .then(() => process.exit());
```

6. Start the backend server:
```bash
cd backend
npm run dev
```

## Frontend Setup

1. Install frontend dependencies:
```bash
cd ..  # Go back to root directory
npm install
```

2. Start the frontend development server:
```bash
npm start
```

The application should now be running with:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017

## Troubleshooting

1. If MongoDB connection fails:
   - Ensure MongoDB service is running
   - Check if the connection string in `.env` is correct
   - Verify MongoDB is installed correctly

2. If API calls fail:
   - Ensure both frontend and backend servers are running
   - Check if the API_URL in `src/App.tsx` matches your backend URL
   - Verify CORS is properly configured in the backend

3. If data is not loading:
   - Check MongoDB connection
   - Verify sample data was inserted correctly
   - Check browser console for any errors 