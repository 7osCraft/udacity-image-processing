import sharp from 'sharp';
import { promises as fs, existsSync } from 'fs';
import path from 'path';

export const transformImage = async (
  filename: string,
  width: number,
  height: number,
  flip = false,
  rotation = 0,
  format = 'jpg'
): Promise<ProcessResponse> => {
  const imagePath = path.resolve('assets/full', `${filename}.jpg`);
  const outputPath = path.resolve(
    'assets/thumb',
    `${filename}-${width}x${height}${flip ? '-flipped' : ''}${
      rotation != 0 ? '-r' + rotation : ''
    }.${format}`
  );

  if (existsSync(outputPath)) {
    return { success: true, outputPath: outputPath };
  }

  if (isNaN(width) || isNaN(height)) {
    return { success: false, error: 'Invalid image size.' };
  }

  if (width <= 0 || height <= 0) {
    return { success: false, error: 'Image size cannot be 0 or negative.' };
  }

  if (!existsSync(imagePath)) {
    return { success: false, error: "Image doesn't exist." };
  }

  //Create thumb directory if doesn't exist
  const thumbDir = path.dirname(outputPath);
  if (!existsSync(thumbDir)) {
    await fs.mkdir(path.dirname(outputPath));
  }

  const imageBuffer = await fs.readFile(imagePath);
  return await sharp(imageBuffer)
    .resize(width, height)
    .flip(flip)
    .rotate(rotation)
    .toFile(outputPath)
    .then(() => {
      return { success: true, outputPath: outputPath };
    })
    .catch(() => {
      return { success: false, error: 'Processing failed.' };
    });
};
