
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');



// Mongo URI
const mongoURI = require('../../config/database.config.js');
// Create mongo connection
const conn = mongoose.createConnection(mongoURI.url);

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    gfs.files.find().toArray((err, files) => {
        console.log(files);
        // Check if files
        if (!files || files.length === 0) {
            res({ files: false });
        } else {
            res.json(files);
        }
    });
};

exports.create = (req,res) => {
    res.redirect('/');
};

exports.files = (req,res) => {
    gfs.files.find().toArray((err, files) => {
        // Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            });
        }
        // Files exist
        return res.json(files);
    });
};

exports.getSingleFile = (req, res) => {
    let fileId = req.params.fileid;
    gfs.files.findOne({_id : mongoose.Types.ObjectId(fileId)}, (err, file)=>{
        if (!file || file.length === 0){
            return res.status(404).json({
                err : 'File not found'
            });
        }
        let readstream = gfs.createReadStream({
            _id : file._id
        });
        res.set('Content-Type', file.contentType);
        return readstream.pipe(res);
    });

};