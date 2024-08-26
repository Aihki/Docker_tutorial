import { Point } from "geojson";
import { Model, Types } from "mongoose";

type Animal = {
  animal_name: string;
  birthdate: Date;
  species: Types.ObjectId;
  location: Point;
};

 type AnimalModel = Model<Animal> & {
  findBySpecies(speciesId: string): Promise<Animal[]>;
};


export { Animal, AnimalModel };
