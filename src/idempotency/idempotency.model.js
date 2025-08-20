import mongoose from 'mongoose';

const idempotencySchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    responseBody: { type: Object, required: true },
    statusCode: { type: Number, required: true },
  },
  { timestamps: true }
);

export const IdempotencyRecord = mongoose.models.IdempotencyRecord || mongoose.model('IdempotencyRecord', idempotencySchema);


