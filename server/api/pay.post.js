import { Client } from "square";
import { randomUUID } from "crypto";

const { paymentsApi } = new Client({
  accessToken: 'EAAAEIBRuXsLcqyQRNVwyt6abQu6r6uzIz0jlHLSwhbCOPoiVtFeEE8AUw7Mihfb',
  environment: "sandbox",
});

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export default defineEventHandler(async (event) => {
  const { locationId, sourceId } = await readBody(event);

  try {
    const { result } = await paymentsApi.createPayment({
      locationId,
      sourceId,
      idempotencyKey: randomUUID(),
      amountMoney: {
        amount: 100,
        currency: "JSY",
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
});
