import express from 'express';
import { deleteSpecies, getSpecie, getSpecies, getSpeciesByLocation, postSpecies, putSpecies, findSpeciesInArea } from '../controllers/speciesController';

const router = express.Router();

router.route('/location').get(getSpeciesByLocation);
router.route('/').get(getSpecies).post(postSpecies);
router.post('/area', findSpeciesInArea);
router.route('/:id').get(getSpecie).put(putSpecies).delete(deleteSpecies);


export default router;
