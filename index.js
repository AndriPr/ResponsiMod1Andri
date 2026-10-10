const express = require('express');
const cors = require('cors');
require('dotenv').config();
const loanRoutes = require('./routes/loanRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/loans', loanRoutes);

// Root route for Vercel and generic testing
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Library Loan API' });
});

// Avoid listening when deployed on Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

module.exports = app;
