"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const getEntry = (id) => {
    try {
        const patient = patients_1.default.find(patient => patient.id === id);
        if (!patient) {
            throw new Error('Patient not found');
        }
        return patient;
    }
    catch (error) {
        throw new Error('An error occurred');
    }
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    getEntry
};
