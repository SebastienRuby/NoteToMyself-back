const path = require('path');
const client = require('../db/pg');

const controllerUpload = {

    uploadImage: (req, res) => {
        const public = path.join('../../public/uploads');
        if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
        }
        const file = req.files.file;
        const split = file.name.split('.');
        const fileExtension = split[split.length - 1];
        const fileName = file.name.replace(/\.[^/.]+$/, '');
        const newfileName = `${fileName}-${Date.now()}.${fileExtension}`;

        file.mv(`${public}/${newfileName}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: newfileName, filePath: `public/uploads/${newfileName}` });
        const photo_url = `/public/uploads/${newfileName}`;
        const type = req.headers.type;
        const query = ''
        const values = ''
        switch (type) {
            case 'profile':
                query = `UPDATE user SET photo_url = $1 WHERE id = $2`;
                values = [photo_url, req.body.id];
                break;
            case 'restaurant':
                query = `UPDATE restaurant SET photo_url = $1 WHERE id = $2`;
                values = [photo_url, req.body.id];
                break;
            case 'meal':
                query = `UPDATE meal SET photo_url = $1 WHERE id = $2`
                values = [photo_url, req.body.id];
                break;

            default:
                res.status(500).json({ message: 'Type non reconnu' });
                break;
        }

        client.query(query, values, (err) => {
            if (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: 'Image uploaded' });
        });
    });
    }
}

module.exports = controllerUpload;