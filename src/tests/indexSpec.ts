import request from 'supertest';
import app from '../index';
import { transformImage } from '../utils/utils';

describe('Test api/images endpoint', () => {
  it('gets resized image from api endpoint', async () => {
    const response = await request(app).get('/api/images').query({
      filename: 'fjord',
      width: 200,
      height: 200
    });
    expect(response.status).toBe(200);
  });

  it('errors while getting resized image from api endpoint because image does not exist', async () => {
    const response = await request(app).get('/api/images').query({
      filename: 'fjorddd',
      width: 200,
      height: 200
    });
    expect(response.status).toBe(400);
  });

  it('errors while getting resized image from api endpoint because image size is invalid', async () => {
    const response = await request(app).get('/api/images').query({
      filename: 'fjorddd',
      width: 'a',
      height: 200
    });
    expect(response.status).toBe(400);
  });
});

describe('Test image processing functions', () => {
  it('expects process to succeed', async () => {
    const response = await transformImage('fjord', 200, 200, true);
    expect(response.success).toBe(true);
  });

  it('expects process to error because of size', async () => {
    const response = await transformImage('fjord', 0, 0, true);
    expect(response.error).toEqual('Image size cannot be 0 or negative.');
  });

  it('expects process to error because image does not exist', async () => {
    const response = await transformImage('fjordd', 200, 200, true);
    expect(response.error).toEqual("Image doesn't exist.");
  });
});
