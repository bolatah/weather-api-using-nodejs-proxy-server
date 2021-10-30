const express = require('express');
const cors = require('cors');
const ratelimit = require('express-rate-limit');

require('dotenv').config();
// hasan test
const PORT = process.env.PORT || 5000;

const app = express();

// Rate limiting

const limiter = ratelimit({
    windowsMs: 10*60*1000, // 10 Mins
    max: 5 
});
app.use(limiter);
app.set('trust proxy', 1)

// Set static folder
app.use(express.static('public')); 

// Routes
app.use('/api', require('./routes'));

// enable cors
app.use(cors());

app.listen(PORT, () => console.log(`Server run port ${PORT}`));