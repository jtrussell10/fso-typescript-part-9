
import express from 'express';
import diagnosesService from '../services/diagnosesService';
import { DiagnosisEntry } from '../types';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  try {
    const diagnosis: DiagnosisEntry | undefined = diagnosesService.getEntry(id);
    if (diagnosis) {
      res.json(diagnosis);
    } else {
      res.status(404).send('Diagnosis not found');
    }
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnoses!');
});

export default router;