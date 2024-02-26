/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender } from './types';



const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  // Validate and parse each field individually.
  const newEntry: NewPatientEntry = {
    name: parseName((object as any).name),
    dateOfBirth: parseDateOfBirth((object as any).dateOfBirth),
    ssn: parseSsn((object as any).ssn),
    gender: parseGender((object as any).gender),
    occupation: parseOccupation((object as any).occupation),
    entries: []
  };

  return newEntry;
};

// Example validation/parsing functions for each field
const parseName = (name: unknown): string => {
  if (!name || typeof name !== 'string') {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || typeof dateOfBirth !== 'string') {
    throw new Error('Incorrect or missing dateOfBirth');
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || typeof ssn !== 'string') {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || typeof occupation !== 'string') { // Use typeof operator to check if occupation is a string
    throw new Error('Incorrect or missing occupation');
  }
  return occupation.toString();
};

// Helper validation functions
const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export default toNewPatientEntry;
