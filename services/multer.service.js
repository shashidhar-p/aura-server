const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadsDir = path.join(__dirname, '../uploads');
console.log(uploadsDir);


// check if uploads dir exists
fs.mkdir(uploadsDir, { recursive: true }, (err) => {
    console.log(err);
});


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
        console.log('Req '+ req);
        cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({ storage: storage });

module.exports = upload;
