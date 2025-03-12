import multer from 'multer';
import path from 'path';

export const upload = multer({
    dest: './uploads/', 
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif|webp/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
      if (extname && mimetype) {
        return cb(null, true);
      }
      cb(new Error('Only image files are allowed.'));
    }
  }).single('img'); 