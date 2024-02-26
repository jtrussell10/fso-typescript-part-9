import patients from '../data/patients';
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender, 
    occupation
  }));
};

const getEntry = (id: string): PatientEntry  => {
  try {
    const patient = patients.find(patient => patient.id === id);
    if (!patient) {
      throw new Error('Patient not found');
    }
    return patient;
  } catch (error) {
    throw new Error('An error occurred');
  }
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry: PatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: any): PatientEntry => {
  const patient = patients.find(patient => patient.id === id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient.entries.push(newEntry);
  return patient;
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getEntry, 
  addEntry
};