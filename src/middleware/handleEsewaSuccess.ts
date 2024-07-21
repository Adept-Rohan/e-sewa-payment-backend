import { Injectable, NestMiddleware } from '@nestjs/common';
import {
  Request as ExpRequest,
  Response as ExpResponse,
  NextFunction,
} from 'express';
import { createSecretSignature } from '../utility/createSignature';

@Injectable()
export class HandleEsewaSuccess implements NestMiddleware {
  use(req: ExpRequest, res: ExpResponse, next: NextFunction) {
    const { data } = req.query;

    const decodedData = JSON.parse(
      Buffer.from(data as string, 'base64').toString('utf-8'),
    );
    console.log('🚀 ~ HandleEsewaSuccess ~ use ~ decodedData:', decodedData);

    if (decodedData?.status !== 'COMPLETE') {
      return res.json({ message: 'Payment Failed' });
    }

    const message = decodedData?.signed_field_names
      .split(',')
      .map((field: string | number) => `${field}=${decodedData[field] || ''}`)
      .join(',');
    console.log('🚀 ~ HandleEsewaSuccess ~ use ~ message:', message);

    const signature = createSecretSignature(message);
    if (signature !== decodedData?.signature) {
      res.json({ message: 'Payment Failed' });
    }
    // req.transaction_uuid = decodedData?.transaction_uuid;
    // req.transaction_code = decodedData?.transaction_code;

    next();
  }
}
