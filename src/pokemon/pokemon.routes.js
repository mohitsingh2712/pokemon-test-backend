import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import * as controller from './pokemon.controller.js';
import * as validator from './pokemon.validator.js';

const router = Router();

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || '';
    cb(null, `pokemon-${unique}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/by-name/:name', validator.validateGetByName, controller.getByName);
router.post('/', upload.single('image'), validator.validateCreate, controller.create);
router.put('/:id', upload.single('image'), validator.validateUpdate, controller.update);
router.delete('/:id', validator.validateGetById, controller.remove);

export default router;


