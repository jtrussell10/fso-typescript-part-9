import diagnoses from '../data/diagnoses';
import { DiagnosisEntry } from '../types';


const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

const getEntry = (id: string): DiagnosisEntry | undefined => {
  return diagnoses.find(diagnosis => diagnosis.code === id);
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getEntry
};