# udacity-image-processing

Image Processing API backend using Express and TypeScript for Egypt FWD Advanced Web Track.
Uses Jasmine for testing & eslint with prettier for formatting.

# Getting started

To run the server locally (Default port is 3000):

- Clone this repo
- `npm install` to install all required dependencies
- `npm run build` to build the project
- `npm run start` to start the local server

Other scripts:

- `npm run lint` to run eslint
- `npm run prettier` to run prettier
- `npm run test` to run tests

# Endpoints:

### /api/images

Used to resize image. Resized images are cached for faster serving.
Extra Functionality: Flipping and Rotating images.

#### Query Params:

| Param             | Functionality                               | Type    | Example          |
| ----------------- | ------------------------------------------- | ------- | ---------------- |
| filename          | Original Image filename                     | string  | `filename=image` |
| width             | New width to use                            | number  | `width=200`      |
| height            | New height to use                           | number  | `height=200`     |
| flip (optional)   | Whether to flip the image vertically or not | boolean | `flip=true`      |
| rotate (optional) | Rotation degree to rotate the image         | number  | `rotate=180`     |

#### Response:

Responds with code 200 and the processed image or code 400 with an error message.

---
