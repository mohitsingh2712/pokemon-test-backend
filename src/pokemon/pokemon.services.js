import mongoose from 'mongoose';
import { PokemonMaster } from './pokemon.model.js';
import { PokemonAbility } from './ability.model.js';

export const createPokemon = async (body, file) => {
  const { name, status = 'active', imageUrl, abilities = [] } = body;
  if (abilities.length > 3) throw new Error('A Pokémon can have at most 3 abilities');
  const doc = {name, status };
  if (file) {
    // store only relative path under /uploads
    doc.image = `/uploads/${file.filename}`;
  } else if (imageUrl) {
    doc.image = imageUrl;
  }
  const master = await PokemonMaster.create({ ...doc });
  let createdAbilities = [];
  if (abilities.length) {
    try {
      createdAbilities = await PokemonAbility.insertMany(
        abilities.map((ab) => ({
          masterId: master._id,
          ability: ab.ability,
          type: ab.type,
          damage: ab.damage,
          status: ab.status ?? 'active',
        }))
      );
    } catch (err) {
      await PokemonMaster.deleteOne({ _id: master._id });
      throw err;
    }
  }
  return { master: master.toObject?.() ?? master, abilities: createdAbilities };
};


export const getPokemonByName = async (name) => {
  const exactCi = new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
  const abilityCollection = PokemonAbility.collection.name;
  const result = await PokemonMaster.aggregate([
    { $match: { name: { $regex: exactCi } } },
    {
      $lookup: {
        from: abilityCollection,
        localField: '_id',
        foreignField: 'masterId',
        as: 'abilities',
      },
    },
    { $limit: 1 },
  ]);
  return result[0] || null;
};

export const updatePokemon = async (id, updates, file) => {
  const master = await PokemonMaster.findOne({ _id:id });
  console.log(master)
  if (!master) return null;
  const { name, status, imageUrl, abilities } = updates;
  if (name !== undefined) master.name = name;
  if (status !== undefined) master.status = status;
  if (file) {
    master.image = `/uploads/${file.filename}`;
  } else if (imageUrl !== undefined) {
    master.image = imageUrl || undefined;
  }
  await master.save();

  let finalAbilities;
  if (Array.isArray(abilities)) {
    if (abilities.length > 3) throw new Error('A Pokémon can have at most 3 abilities');
    const previous = await PokemonAbility.find({ masterId: id }).lean();
    try {
      await PokemonAbility.deleteMany({ masterId: id });
      if (abilities.length) {
        await PokemonAbility.insertMany(
          abilities.map((ab) => ({
            masterId: id, 
            ability: ab.ability,
            type: ab.type,
            damage: ab.damage,
            status: ab.status ?? 'active',
          }))
        );
        
      }
    } catch (err) {
      // attempt to restore previous state
      await PokemonAbility.deleteMany({ masterId: id });
      if (previous.length) {
        await PokemonAbility.insertMany(previous.map(({ masterId, ability, type, damage, status }) => ({ masterId, ability, type, damage, status })));
      }
      throw err;
    }
  }
  finalAbilities = await PokemonAbility.find({ masterId: id }).lean();
  return { master: master.toObject(), abilities: finalAbilities };
};

export const deletePokemon = async (id) => {
  const master = await PokemonMaster.findOneAndDelete({ id });
  if (!master) return null;
  await PokemonAbility.deleteMany({ masterId: id });
  return master;
};


