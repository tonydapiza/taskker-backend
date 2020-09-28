import * as jot from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

/**
 *
 * @param {Request} req object containing all request information
 * @param {Response} res object containing all response informatin
 * @param {NextFunction} next the next function to be called
 */
async function jotMiddleware(req: Request, res: Response, next: NextFunction) {
  let authToken = req.header('authorization');

  if (!authToken) {
    return res.status(401).send('Access Denied');
  }

  try {
    if (authToken.startsWith('Bearer ')) {
      // Remove Bearer from string
      authToken = authToken.slice(7, authToken.length).trimLeft();
    }
    const verified = await jot.verify(authToken, process.env.APP_SECRET);
    req.cookies.id = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

export default jotMiddleware;
