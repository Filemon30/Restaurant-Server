const { v4: uuidv4 } = require("uuid");

const generateID = () => {
    return uuidv4();
};

module.exports = generateID;