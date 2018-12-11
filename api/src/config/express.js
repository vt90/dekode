import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cors from 'cors';
import * as error from '../middlewares/error';
import environment from './environment';
import routes from '../api/routes';
import swaggerUi from 'swagger-ui-express';
import swagger from '../../public/swagger';

const app = express();

app.use(morgan(environment.logs));

//  parse body params and attach them to req.body
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

// gzip compression
app.use(compression());

app.use(methodOverride());

app.use(helmet());

app.use(cors());

app.use(routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

export default app;
