const phonepeService = require('../services/phonepeService');

exports.initiatePayment = async (req, res) => {
    try {
        const response = await phonepeService.initiatePayment(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.checkPaymentStatus = async (req, res) => {
    try {
        const response = await phonepeService.checkPaymentStatus(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
