import mongoose from 'mongoose';
import { PokemonMaster } from './pokemon.model.js';

const abilitySchema = new mongoose.Schema(
  {
    masterId: { type: mongoose.Types.ObjectId, required: true, ref: PokemonMaster.collection.name},
    ability: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    type: { type: String, required: true, trim: true, minlength: 2, maxlength: 30 },
    damage: { type: Number, required: true, min: 0, max: 99999 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);



export const PokemonAbility = mongoose.model('PokemonAbility', abilitySchema);


