const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');
const callbackRoutes = require('./routes/callbackRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/api/payments', paymentRoutes);
app.use('/api/callback', callbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
