import { IdempotencyRecord } from './idempotency.model.js';

export const getIdempotentResponse = async (key) => {
  if (!key) return null;
  return IdempotencyRecord.findOne({ key }).lean();
};

export const saveIdempotentResponse = async (key, statusCode, responseBody) => {
  if (!key) return null;
  try {
    return await IdempotencyRecord.create({ key, statusCode, responseBody });
  } catch (e) {
    return null;
  }
};


