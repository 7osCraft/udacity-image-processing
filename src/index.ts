import express from 'express';
import apiRouter from './routes/apiRoutes';

const app = express();

app.use('/api', apiRouter);

app.listen(3000, () => {
  console.log('Server started and listening on port 3000!');
});

export default app;
