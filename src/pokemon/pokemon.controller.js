import { validationResult } from 'express-validator';
import * as service from './pokemon.services.js';
import { getIdempotentResponse, saveIdempotentResponse } from '../idempotency/idempotency.service.js';

const ensureValid = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation failed');
    err.status = 400;
    err.details = errors.array();
    throw err;
  }
};


export const getByName = async (req, res, next) => {
  try {
    ensureValid(req);
    const name = String(req.params.name);
    const result = await service.getPokemonByName(name);
    if (!result) return res.status(404).json({ error: 'Pokemon not found' });
    return res.json(result);
  } catch (err) {
    return next(err);
  }
};


export const create = async (req, res, next) => {
  try {
    ensureValid(req);
    const idemKey = req.header('Idempotency-Key');
    if (idemKey) {
      const existing = await getIdempotentResponse(idemKey);
      if (existing) return res.status(existing.statusCode).json(existing.responseBody);
    }
    const created = await service.createPokemon(req.body, req.file);
    if (idemKey) await saveIdempotentResponse(idemKey, 201, created);
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    ensureValid(req);
    const id = req.params.id
    const updated = await service.updatePokemon(id, req.body, req.file);
    if (!updated) return res.status(404).json({ error: 'Pokemon not found' });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    ensureValid(req);
    const id = Number(req.params.id);
    const deleted = await service.deletePokemon(id);
    if (!deleted) return res.status(404).json({ error: 'Pokemon not found' });
    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
};


