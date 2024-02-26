"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const id = req.params.id; // Access the id parameter from the request
    try {
        const patient = patientService_1.default.getEntry(id); // Assuming you have this method in your service
        if (patient) {
            res.json(patient);
        }
        else {
            res.status(404).send('Patient not found');
        }
    }
    catch (error) {
        // Error handling, e.g., if id format is incorrect or if there's an issue with the service
        res.status(500).send('An error occurred');
    }
});
router.post('/', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedEntry = patientService_1.default.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
        entries: []
    });
    res.json(addedEntry);
});
exports.default = router;
