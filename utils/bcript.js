const bcrypt = require('bcrypt');
const { compare } = require("bcrypt");

const hashedPassword = async (convert, password, userPass) => {
    if (convert === "hashedpass") {
        return password = await bcrypt.hash(password, 10);
    }
    if (convert === "compare") {
        return await bcrypt.compare(password, userPass);
    }

}

module.exports = { hashedPassword }
