import express from 'express';
import patientService from '../services/patientService';
import { PatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});


router.get('/:id', (req, res) => {
  const id = req.params.id; // Access the id parameter from the request
  try {
    const patient : PatientEntry = patientService.getEntry(id); // Assuming you have this method in your service
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).send('Patient not found');
    }
  } catch (error) {
    // Error handling, e.g., if id format is incorrect or if there's an issue with the service
    res.status(500).send('An error occurred');
  }
});


router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation} = req.body;
  const addedEntry = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender, 
    occupation,
    entries: []
});
  res.json(addedEntry);
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const { description, date, specialist, diagnosisCodes, type, healthCheckRating, employerName, sickLeave, discharge } = req.body;
  const newEntry = {
    description,
    date,
    specialist,
    diagnosisCodes,
    type,
    healthCheckRating,
    employerName,
    sickLeave,
    discharge
  };
  const addedEntry = patientService.addEntry(id, newEntry);
  res.json(addedEntry);
}




export default router;