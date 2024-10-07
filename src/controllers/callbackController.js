const phonepeService = require('../services/phonepeService');

exports.handleCallback = async (req, res) => {
    try {
        const callbackData = req.body;
        const isValid = phonepeService.verifyChecksum(callbackData);

        if (isValid) {
            // Process the payment status
            if (callbackData.status === 'SUCCESS') {
                console.log('Payment successful:', callbackData);
                // Update your database or perform other actions as needed
            } else if (callbackData.status === 'FAILED') {
                console.log('Payment failed:', callbackData);
                // Handle the failed payment (e.g., notify the user, log the failure, etc.)
            } else if (callbackData.status === 'PENDING') {
                console.log('Payment pending:', callbackData);
                // Handle the pending payment (e.g., wait for further updates)
            }
            res.status(200).send('Callback received and processed');
        } else {
            res.status(400).send('Invalid checksum');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
