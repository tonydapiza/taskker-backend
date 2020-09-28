import http, {Server} from 'http';
import express, {Application} from 'express';
import bodyParser from 'body-parser';
import {config} from 'dotenv';
import morgan from 'morgan';
import routes from './routes/';
config();

const app: Application = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
routes(app);

const server: Server = http.createServer(app);

server.listen(process.env.NODE_PORT || 3000, function() {
  process.stdout.write(`Server running at ${process.env.NODE_PORT} \n`);
});

