const pdf = require('../controllers/pdf.controller.js');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const mongoURI = 'mongodb://test:password1@ds151282.mlab.com:51282/pdf-db';
const express = require('express')
const router = express.Router();


const storage = new GridFsStorage({
url: mongoURI,
file: (req, file) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return reject(err);
            }
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    });
}
});
const upload = multer({ storage });

// Create a new Note
router.post('/upload',upload.single('file') ,pdf.create);

// Retrieve all Notes
router.get('/',pdf.findAll);

router.get('/files', pdf.files);

router.get('/file/:fileid', pdf.getSingleFile);

module.exports = router;
