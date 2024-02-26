import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json());


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    // Destructure height and weight from req.query
    const { height, weight, ...otherParams } = req.query;
  
    // Check if both height and weight are provided and no extra parameters are included
    if (!height || !weight || Object.keys(otherParams).length > 0) {
      return res.status(400).json({ error: 'Only height and weight must be provided, and they must be present' });
    }
  
    const heightInMeters = Number(height) ; // Convert cm to meters
    const weightInKg = Number(weight); // Assuming weight is already in kg
  
    // Validate the converted numbers
    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters <= 0 || weightInKg <= 0) {
      return res.status(400).json({ error: 'Invalid height or weight. Both should be positive numbers.' });
    }
  
    // Proceed with valid input
    const bmiResponse = calculateBmi(heightInMeters, weightInKg);
    res.json({ weight: weight, height: height, bmi: bmiResponse });

    return;
});


import { Request, Response } from 'express';

app.post('/exercises', (req: Request, res: Response) => {
    // Assuming exerciseCalculator is defined elsewhere and properly typed
    // Destructure daily_exercises and target from req.body
    const { daily_exercises, target, ...otherParams } = req.body as {
        daily_exercises?: string;
        target?: string;
        [key: string]: unknown; // Use a more general type for the rest of the parameters
    };

    // Check if both daily_exercises and target are provided and no extra parameters are included
    if (!daily_exercises || !target || Object.keys(otherParams).length > 0) {
        return res.status(400).json({ error: 'parameters missing' });
    }

    // Convert daily_exercises to an array of numbers
    const dailyExercisesArray = daily_exercises.split(',').map(Number);

    // Validate the converted numbers
    if (dailyExercisesArray.some(isNaN) || isNaN(Number(target))) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    // Proceed with valid input
    const result = exerciseCalculator(dailyExercisesArray, Number(target));
    res.json(result);
    return;
});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});