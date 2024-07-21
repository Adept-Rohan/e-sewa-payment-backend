import { createHmac } from 'crypto';

export const createSecretSignature = (message: string) => {
  const secret: string = '8gBm/:&EnhH.1/q';

  const hmac = createHmac('sha256', secret);
  hmac.update(message);

  const hashValueInBase64 = hmac.digest('base64');
  return hashValueInBase64;
};
