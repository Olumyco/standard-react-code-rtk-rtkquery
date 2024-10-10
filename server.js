require('dotenv').config();
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 4000;
const appDir = process.env.MODE === 'development' ? 'public' : 'build';
const baseUrl = process.env.BASE_URL || '';

console.log(process.env.MODE);
console.log(appDir);
console.log(baseUrl);

app.use(express.static(path.join(__dirname, appDir), {index: false}));

app.use('/api', createProxyMiddleware({
    target: baseUrl,
    changeOrigin: true,
    // pathRewrite: {
    //     '^/api/': '/'
    // }
}));


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, appDir, 'index.html'));
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, appDir, 'index.html'));
});

app.listen(port, () => console.log(`Server is running on port ${port}`));