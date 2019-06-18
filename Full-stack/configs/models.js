const path = require('path');
const fs = require('fs');

const modelsPath = path.join(__dirname, "../models/");
fs.readdirSync(modelsPath).map(file => {
    require(modelsPath + file);
});