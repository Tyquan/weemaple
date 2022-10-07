const allowedOrigins = ["https://www.weegigs.net", "https:www.eezypeezyprint.com", "http://127.0.0.1:5000", "http://localhost:3000"];

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials