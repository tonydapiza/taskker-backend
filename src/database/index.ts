import Knex from 'knex';
import {development} from '../knexfile';

// eslint-disable-next-line new-cap
const connection: Knex = Knex(development);

export default connection;
