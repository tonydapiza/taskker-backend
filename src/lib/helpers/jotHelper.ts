import * as jot from 'jsonwebtoken';
/**
 * @description this message processes a jot demand
 * @param {string | object} payload
 * @return {Promise<string>} A jot
 */
async function retrieveJotSign(payload: string | object): Promise<string> {
  return await jot.sign(
      {exp: Math.floor(Date.now() / 1000) + (60 * 60),
        payload},
      process.env.APP_SECRET);
};

export default retrieveJotSign;
