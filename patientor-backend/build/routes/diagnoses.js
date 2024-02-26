"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesService_1 = __importDefault(require("../services/diagnosesService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(diagnosesService_1.default.getEntries());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        const diagnosis = diagnosesService_1.default.getEntry(id);
        if (diagnosis) {
            res.json(diagnosis);
        }
        else {
            res.status(404).send('Diagnosis not found');
        }
    }
    catch (error) {
        res.status(500).send('An error occurred');
    }
});
router.post('/', (_req, res) => {
    res.send('Saving a diagnoses!');
});
exports.default = router;
