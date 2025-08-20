import mongoose from 'mongoose';


const masterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    image: { type: String },
    imageData: { type: Buffer },
    imageContentType: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);


masterSchema.index({ name: 1 }, { unique: true, sparse: true });

export const PokemonMaster = mongoose.model('PokemonMaster', masterSchema);

