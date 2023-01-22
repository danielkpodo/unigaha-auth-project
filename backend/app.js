import 'express-async-errors';

import authRouter from './routes/auth.js';
import connectDb from './db/connect.js';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import notFoundMiddleware from './middlewares/not-found.js';
import xss from 'xss-clean';

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;
(async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    console.log('Connected to mongodb successfully ✅');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error(`Unable to connect to DB ❌: `, error);
  }
})();
