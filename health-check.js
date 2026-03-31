const express = require('express');
const logger = require('./logger');
const app = express();
const PORT = process.env.WEB_PORT || 3000;

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.get('/health', (req, res) => {
    const health = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        memory: process.memoryUsage(),
        nodeVersion: process.version,
        platform: process.platform
    };
    
    res.status(200).json(health);
});

app.get('/status', (req, res) => {
    const status = {
        status: 'running',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: require('./package.json').version
    };
    
    res.status(200).json(status);
});

app.listen(PORT, () => {
    logger.info(`Health check server running on port ${PORT}`);
});

module.exports = app;
