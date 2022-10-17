const path = require('path');
const client = require('../db/pg');

const controllerUpload = {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns
   */

  uploadImage: (req, res) => {
    const public = path.join(__dirname, '..', '..', 'public', 'uploads');
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    const file = req.files.file;
    const split = file.name.split('.');
    const fileExtension = split[split.length - 1];
    const fileName = file.name.replace(/\W+/, '');
    const fileNameBis = fileName.replace(/[.].*$/, '');
    const newfileName = `${fileNameBis}-${Date.now()}.${fileExtension}`;

    file.mv(`${public}/${newfileName}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      const photo_url = `/uploads/${newfileName}`;
      const type = req.headers.type;
      let query = '';
      let values = '';
      /*eslint-disable */
      switch (type) {
        case 'profile':
          query = 'UPDATE public.user SET photo_url = $1 WHERE id = $2';
          values = [photo_url, req.headers.userid];
          break;
        case 'restaurant':
          query = 'UPDATE restaurant SET photo_url = $1 WHERE id = $2';
          values = [photo_url, req.headers.restaurantid];
          break;
        case 'meal':
          query = 'UPDATE meal SET photo_url = $1 WHERE id = $2';
          values = [photo_url, req.headers.mealid];
          break;

        default:
          res.status(500).json({ message: 'Type non reconnu' });
          break;
      }
      /*eslint-enable */

      client.query(query, values, (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: err.message });
        }
        res.status(200).json({
          fileName: newfileName,
          filePath: `/uploads/${newfileName}`,
        });
      });
    });
  },
};

module.exports = controllerUpload;
