import {Request, Response} from 'express';
import connection from '../database/';
import * as crypto from 'crypto';
// eslint-disable-next-line camelcase
import * as bcrypt_tools from 'bcrypt';
import jotSign from '../lib/helpers/jotHelper';
import {validationResult} from 'express-validator';

type authShape = {
  id: string,
  name: string,
  contact: string,
  password: string,
  // eslint-disable-next-line camelcase
  photo_url?: string
};

/**
 * @description message employed to store a resource from a data persistence
 * @param {Request} req  object containing all http request information
 * @param {Response} res  object containing all http response information
 * @return {Response<any>} Will returns a response body (which can be null)
 */
export async function register(req: Request, res: Response) {
  const body: authShape = req.body;
  const errors = validationResult(req);
  // eslint-disable-next-line camelcase
  const {contact, name, password, photo_url} = body;

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'request body element malformatteds',
      err_code: 400,
    });
  }

  const user = await connection('users').where({contact: body.contact});

  if (user.length > 0) {
    return res.status(200).json({
      message: 'This contact already has an associated accout',
    });
  }
  const id = `user_${await crypto.randomBytes(3).toString('base64')}`;
  const salt = await bcrypt_tools.genSaltSync(10);
  const passwordHashed = await bcrypt_tools.hashSync(password, salt);

  await connection('users')
      .insert({
        id, name, contact,
        password: passwordHashed,
        photo_url: photo_url});

  const savedUser = await connection('users')
      .select('id', 'contact', 'name', 'photo_url').where('id', id);

  const token = await jotSign(id);
  return res.json({savedUser, token});
};

/**
 * @description message employed to get a resource from a data persistence
 * @param {Request} req  object containing all http request information
 * @param {Response} res  object containing all http response information
 * @return {Response<any>} Will returns a response body (which can be null)
 */
export async function login(req: Request, res: Response) {
  const errors = validationResult(req);
  const body = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'request body element malformatteds',
      err_code: 400,
    });
  }

  const user: Array<authShape> = await connection('users')
      .select('*').where({
        contact: body.contact,
      });
  if (user.length === 0) {
    return res.json({
      message: 'User Not found',
      code: 404,
    });
  }
  console.log(user[0].password);
  const isPwd = await bcrypt_tools.compareSync(body.password, user[0].password);

  if (!isPwd) {
    return res.status(301).json({
      message: 'Password entered is wrong',
    });
  }
  // eslint-disable-next-line camelcase
  const {id, contact, name, photo_url} = user[0];


  const token = await jotSign(id);
  return res.json({id, contact, name, photo_url, token});
};
