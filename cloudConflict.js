const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.could_Name,
    api_key: process.env.api_Key,
    api_secret: process.env.api_Secret,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedFormat: ['jpeg', 'png', 'jpg'],
    },
  });

  module.exports = {
    cloudinary,
    storage
  };