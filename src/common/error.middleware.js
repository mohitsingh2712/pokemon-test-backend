
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
};


export const errorHandler = (err, req, res, next) => {
  if (err?.name === 'MongoServerError' && err?.code === 11000) {
    return res.status(409).json({ error: 'Duplicate key', details: err.keyValue });
  }
  const status = err.status || 500;
  const payload = { error: err.message || 'Internal Server Error' };
  if (err.details) payload.details = err.details;
  res.status(status).json(payload);
};


