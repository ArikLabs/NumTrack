import express from 'express';
import { PORT, SERVICE_NAME } from './config';
import routes from './routes';
import { handleErrors } from './middlewares/error-handler';
import { initSequelize } from './services/db-service';
import countService from './services/count-service';
import cors from 'cors';
async function start() {
  try {
    const app = express();

    await initSequelize();
    await countService.init();

    app.use(cors());

    app
      .use(express.json({ limit: '10mb' }))
      .use(routes)
      .use(handleErrors);

    app.listen(PORT, function () {
      console.info(`${SERVICE_NAME} server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('The app has been crashed', { error });
  }
}

start();
