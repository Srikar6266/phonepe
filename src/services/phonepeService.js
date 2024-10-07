const axios = require('axios');
require('dotenv').config();
const crypto = require('crypto');

const { PHONEPE_MERCHANT_ID, PHONEPE_MERCHANT_KEY, PHONEPE_BASE_URL } = process.env;

exports.initiatePayment = async (paymentData) => {
    const url = `${PHONEPE_BASE_URL}/pg/v1/pay`;
    const payload = {
        merchantId: PHONEPE_MERCHANT_ID,
        transactionId: paymentData.transactionId,
        amount: paymentData.amount,
        redirectUrl: paymentData.redirectUrl,
        callbackUrl: paymentData.callbackUrl,
        merchantUserId: paymentData.merchantUserId,
        storeId: paymentData.storeId,
        terminalId: paymentData.terminalId
    };
    const headers = {
        'Content-Type': 'application/json',
        'X-VERIFY': generateChecksum(payload, PHONEPE_MERCHANT_KEY)
    };

    const response = await axios.post(url, payload, { headers });
    return response.data;
};

exports.checkPaymentStatus = async (statusData) => {
    const url = `${PHONEPE_BASE_URL}/pg/v1/status/${statusData.transactionId}`;
    const headers = {
        'Content-Type': 'application/json',
        'X-VERIFY': generateChecksum(statusData.transactionId, PHONEPE_MERCHANT_KEY)
    };

    const response = await axios.get(url, { headers });
    return response.data;
};

exports.verifyChecksum = (data) => {
    const receivedChecksum = data['X-VERIFY'];
    delete data['X-VERIFY'];
    const generatedChecksum = generateChecksum(data, PHONEPE_MERCHANT_KEY);
    return receivedChecksum === generatedChecksum;
};

const generateChecksum = (data, key) => {
    const dataString = JSON.stringify(data);
    const hash = crypto.createHmac('sha256', key).update(dataString).digest('hex');
    return `${hash}###${key}`;
};
