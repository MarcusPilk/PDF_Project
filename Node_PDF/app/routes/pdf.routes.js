module.exports = (app) => {
    const pdf = require('../controllers/pdf.controller.js');
    const crypto = require('crypto');
    const multer = require('multer');
    const GridFsStorage = require('multer-gridfs-storage');
    const mongoURI = 'mongodb://test:password1@ds151282.mlab.com:51282/pdf-db';



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
    app.post('/upload',upload.single('file') ,pdf.create);

    // Retrieve all Notes
    app.get('/',pdf.findAll);

    app.get('/files', pdf.files);

    app.get('/file/:fileid', pdf.getSingleFile);

};
