import { NextFunction, Request, Response } from "express";
import CustomError from "../../classes/CustomError";
import { MessageResponse } from "../../types/Messages";
import { Species } from "../../types/Species";
import speciesModel from "../models/speciesModel";
import geojsonValidation from "geojson-validation";

type DBMessageResponse = MessageResponse & {
  data: Species | Species[];
};

const postSpecies = async (req: Request<{}, {}, Species>, res: Response<DBMessageResponse>, next: NextFunction) => {
  try {
    const newSpecies = new speciesModel(req.body);
    const savedSpecies = await newSpecies.save();
    res.json({ message: "Species added successfully", data: savedSpecies });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const getSpecies = async (req: Request, res: Response<DBMessageResponse>, next: NextFunction) => {
  try {
    const species = await speciesModel.find();
    res.json({ message: "Species fetched successfully", data: species });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const getSpecie = async (req: Request<{ id: string }>, res: Response<DBMessageResponse>, next: NextFunction) => {
  try {
    const species = await speciesModel.findById(req.params.id);
    if (!species) {
      throw new Error("Species not found");
    }
    res.json({ message: "Species fetched successfully", data: species });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const putSpecies = async (req: Request<{ id: string }, {}, Species>, res: Response<DBMessageResponse>, next: NextFunction) => {
  try {
    const updatedSpecies = await speciesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSpecies) {
      throw new Error("Species not found");
    }
    res.json({ message: "Species updated successfully", data: updatedSpecies });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const deleteSpecies = async (req: Request<{ id: string }>, res: Response<DBMessageResponse>, next: NextFunction) => {
  try {
    const deletedSpecies = await speciesModel.findByIdAndDelete(req.params.id);
    if (!deletedSpecies) {
      throw new Error("Species not found");
    }
    res.json({ message: "Species deleted successfully", data: deletedSpecies });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const getSpeciesByLocation = async (req: Request, res: Response<DBMessageResponse>, next: NextFunction) => {
  try {
    const topRight = req.query.topRight as string;
    const bottomLeft = req.query.bottomLeft as string;
    const topRightArray = topRight.split(',').map(Number);
    const bottomLeftArray = bottomLeft.split(',').map(Number);
    const species = await speciesModel.find({
      'location.coordinates': {
        $geoWithin: {
          $box: [bottomLeftArray, topRightArray]
        }
      }
    });
    res.json({ message: "Species fetched successfully", data: species });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

const findSpeciesInArea = async (
  req: Request,
  res: Response<DBMessageResponse>,
  next: NextFunction
) => {
  try {
    console.log('Request Body:', req.body);

    const polygon = req.body;

    console.log('Extracted Polygon:', polygon);

    if (!geojsonValidation.isPolygon(polygon)) {
      throw new CustomError('Invalid GeoJSON polygon provided', 400);
    }

    const speciesInArea = await speciesModel.findByArea(polygon);
    if (!speciesInArea || speciesInArea.length === 0) {
      throw new CustomError('No species found in the specified area', 404);
    }

    res.status(200).json({
      message: 'Species Retrieved',
      data: speciesInArea
    });
  } catch (error) {
    next(new CustomError((error as Error).message, 500));
  }
};

export { postSpecies, getSpecies, getSpecie, putSpecies, deleteSpecies, getSpeciesByLocation, findSpeciesInArea };
