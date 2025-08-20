import { body, param, query } from 'express-validator';


export const validateGetById = [
  param('id').isString()
];

export const validateGetByName = [
  param('name').isString().isLength({ min: 1, max: 50 }),
];

export const validateCreate = [
  body('name').exists({ checkFalsy: true }).isString().isLength({ min: 2, max: 50 }),
  body('status').optional().isIn(['active', 'inactive']),
  body('imageUrl').optional().isString().matches(/^(https?:\/\/)/),
  body('abilities')
    .optional()
    .customSanitizer((value) => {
      if (typeof value === 'string') {
        try { return JSON.parse(value); } catch { return value; }
      }
      return value;
    })
    .isArray({ max: 3 }),
  body('abilities.*.id').optional().isInt({ min: 1 }).toInt(),
  body('abilities.*.ability').optional().isString().isLength({ min: 2, max: 50 }),
  body('abilities.*.type').optional().isString().isLength({ min: 2, max: 30 }),
  body('abilities.*.damage').optional().isInt({ min: 0, max: 99999 }).toInt(),
  body('abilities.*.status').optional().isIn(['active', 'inactive']),
];

export const validateUpdate = [
  param('id').isString(),
  body('name').optional().isString().isLength({ min: 2, max: 50 }),
  body('status').optional().isIn(['active', 'inactive']),
  body('imageUrl').optional().isString().matches(/^(https?:\/\/)/),
  body('abilities')
    .optional()
    .customSanitizer((value) => {
      if (typeof value === 'string') {
        try { return JSON.parse(value); } catch { return value; }
      }
      return value;
    })
    .isArray({ max: 3 }),
  body('abilities.*.id').optional().isInt({ min: 1 }).toInt(),
  body('abilities.*.ability').optional().isString().isLength({ min: 2, max: 50 }),
  body('abilities.*.type').optional().isString().isLength({ min: 2, max: 30 }),
  body('abilities.*.damage').optional().isInt({ min: 0, max: 99999 }).toInt(),
  body('abilities.*.status').optional().isIn(['active', 'inactive']),
];


