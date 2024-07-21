import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request as ExpRequest, Response as ExpResponse } from 'express';
import { createCustomTransactionUUID } from './utility/customTransactionId';
import { createSecretSignature } from './utility/createSignature';

interface Payload {
  amount: string;
}

@Controller()
export class AppController {
  @Post('create/order')
  handleOrder(@Req() req: ExpRequest, @Res() res: ExpResponse) {
    try {
      console.log(req.body as Payload);

      const customTransactionUUID = createCustomTransactionUUID();
      console.log(
        '🚀 ~ AppController ~ handleOrder ~ customTransactionUUID:',
        customTransactionUUID,
      );

      const signature = createSecretSignature(
        `total_amount=${req.body.amount},transaction_uuid=${customTransactionUUID},product_code=EPAYTEST`,
      );

      const formData = {
        amount: req.body.amount,
        failure_url: 'http://localhost:5173',
        product_delivery_charge: '0',
        product_service_charge: '0',
        product_code: 'EPAYTEST',
        signature: signature,
        signed_field_names: 'total_amount,transaction_uuid,product_code',
        success_url: 'http://localhost:3000/esewa/success',
        tax_amount: '0',
        total_amount: req.body.amount,
        transaction_uuid: customTransactionUUID,
      };

      console.log('🚀 ~ AppController ~ handleOrder ~ signature:', signature);
      res.json({
        message: 'Order Created Succesfully',
        Product: req.body,
        formData,
      });
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error' + error);
    }
  }

  @Get('esewa/success')
  handleEsewaSuccess(@Res() res: ExpResponse, @Req() req: ExpRequest) {
    console.log(req.body);

    res.json({
      message: 'Success',
    });
  }
}
