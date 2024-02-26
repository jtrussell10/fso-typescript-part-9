"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const types_1 = require("./types");
const toNewPatientEntry = (object) => {
    // Validate and parse each field individually.
    const newEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
    return newEntry;
};
// Example validation/parsing functions for each field
const parseName = (name) => {
    if (!name || typeof name !== 'string') {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || typeof dateOfBirth !== 'string') {
        throw new Error('Incorrect or missing dateOfBirth');
    }
    return dateOfBirth;
};
const parseSsn = (ssn) => {
    if (!ssn || typeof ssn !== 'string') {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || typeof occupation !== 'string') { // Use typeof operator to check if occupation is a string
        throw new Error('Incorrect or missing occupation');
    }
    return occupation.toString();
};
// Helper validation functions
const isGender = (gender) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(gender);
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.default = toNewPatientEntry;
