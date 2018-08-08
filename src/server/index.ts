import * as dotenv from 'dotenv';
import * as path from 'path';
import './server';

dotenv.config({path: path.join(__dirname, '../../.env.dev')});
