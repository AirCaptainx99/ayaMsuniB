const { Discord, http, imagekit } = require('../core_module.js');

const deleteUserDB = (msg) => {
    imagekit.deleteFile();
    imagekit.upload({

    },
    )
}

module.exports = {
    deleteUserDB,
}