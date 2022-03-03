import express from 'express';
import { transformImage } from '../utils/utils';

const router = express.Router();

router.get('/images', async (req, res) => {
  const { filename, width, height, flip, rotate } = req.query;

  const rotateDegreee = rotate ? parseInt(rotate as string) : 0;

  const processResponse = await transformImage(
    filename as string,
    parseInt(width as string),
    parseInt(height as string),
    flip == 'true',
    rotateDegreee
  );

  if (processResponse.success === false) {
    return res.status(400).send(processResponse.error);
  }

  return res.sendFile(processResponse.outputPath!);
});

export default router;
