// Import React, useState, useEffect, useParams from 'react-router-dom', and your services
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPatient } from '../services/patients';
import { getDiagnosisInfo } from '../services/diagnoses'; // Import the new diagnostic service
import { Patient, Entry, HospitalEntry, OccupationalHealthEntry, HealthCheckEntry } from '../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import HealingIcon from '@mui/icons-material/Healing';
import { Box } from '@mui/material';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  // State to store diagnostic names
  const [diagnoses, setDiagnoses] = useState<{ [code: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const fetchedPatient = await getPatient(id);
        setPatient(fetchedPatient);

        const uniqueDiagnosisCodes = Array.from(new Set(fetchedPatient.entries.flatMap(entry => entry.diagnosisCodes || [])));

        // Fetch diagnostic information for each unique code
        const diagnosisnames = await Promise.all(uniqueDiagnosisCodes.map(async (code) => {
          const diagnosis = await getDiagnosisInfo(code);
          return { code, name: diagnosis?.name || 'name not found' };
        }));

        // Update state with the fetched diagnostic names
        setDiagnoses(diagnosisnames.reduce((acc, { code, name }) => ({
          ...acc,
          [code]: name,
        }), {}));
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h1>Patient</h1>
      <p>{patient?.name}</p>
      <p>{patient?.dateOfBirth}</p>
      <p>{patient?.occupation}</p>
      {patient?.entries.map(entry => (
       <Box key={entry.id} sx={{ border: '1px solid black', borderRadius: '4px', marginBottom: '10px', padding: '10px' }}>
          <EntryDetails entry={entry} />
          {entry.diagnosisCodes && (
            <div>
              <p>Diagnosis Codes:</p>
              <ul>
                {entry.diagnosisCodes.map(code => (
                  <li key={code}>{code} - {diagnoses[code]}</li> // Display code and fetched description
                ))}
              </ul>
            </div>
          )}
        </Box>
      ))}
    </div>
  );
};

export default PatientPage;

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <h3>{entry.date} <Icon name="hospital" /></h3>
      <p>{entry.description}</p>
      <p>Discharge: {entry.discharge.date} {entry.discharge.criteria}</p>
    </div>
  );
};

const OccupationalHealthEntryDetails: React.FC<{ entry: OccupationalHealthEntry }> = ({ entry }) => {
  return (
    <div>
      <h3>{entry.date} <Icon name="vaccine" /></h3>
      <p>{entry.description}</p>
      <p>Employer: {entry.employerName}</p>
      {entry.sickLeave && <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>}
    </div>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div>
      <h3>{entry.date} <Icon name="healing" /></h3>
      <p>{entry.description}</p>
      <p>Health rating: {entry.healthCheckRating}</p>
    </div>
  );
};

const Icon = ({ name }: { name: "hospital" | "vaccine" | "healing" }) => {
  switch (name) {
    case "hospital":
      return <LocalHospitalIcon />;
    case "vaccine":
      return <VaccinesIcon />;
    case "healing":
      return <HealingIcon />;
    default:
      return assertNever(name);
  }
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};