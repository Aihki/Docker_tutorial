import mongoose from "mongoose";
import { Species, SpeciesModel } from "../../types/Species";
import { Polygon } from "geojson";

const speciesSchema = new mongoose.Schema<Species>({
  species_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
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

speciesSchema.index({ location: "2dsphere" });

speciesSchema.statics.findByArea = async function (
  polygon: Polygon,
): Promise<Species[]> {
  console.log('Polygon in Model:', JSON.stringify(polygon, null, 2));

  return this.find({
    location: {
      $geoWithin: {
        $geometry: {
          type: 'Polygon',
          coordinates: polygon.coordinates,
        },
      },
    },
  }).exec();
};

speciesSchema.statics.findByCategory = function (categoryId: mongoose.Types.ObjectId): Promise<Species[]> {
  return this.find({ category: categoryId }).exec();
};

const Species = mongoose.model<Species, SpeciesModel>("Species", speciesSchema);

export default Species;
