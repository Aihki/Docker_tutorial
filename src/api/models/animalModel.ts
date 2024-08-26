import mongoose from "mongoose";
import { Animal, AnimalModel } from "../../types/Animal";
import speciesModel from "./speciesModel"; // Import the species model

const animalSchema = new mongoose.Schema<Animal>({
  animal_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  species: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Species",
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

animalSchema.statics.findBySpecies = async function (speciesName: string): Promise<Animal[]> {
  const species = await speciesModel.findOne({ species_name: speciesName });
  if (!species) {
    throw new Error('Species not found');
  }
  return this.find({ species: species._id }).exec();
};

animalSchema.index({ location: "2dsphere" });

const Animal = mongoose.model<Animal, AnimalModel>("Animal", animalSchema);

export default Animal;
