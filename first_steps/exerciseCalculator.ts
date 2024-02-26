export interface ExerciseValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}



export const exerciseCalculator = (daily_exercises: number[], target: number,) : ExerciseValues => {
    const periodLength = daily_exercises.length;
    const trainingDays = daily_exercises.filter((currentElement) => currentElement > 0).length;
    const total = daily_exercises.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
    const average = total / periodLength;
    const success = average >= target;

    let rating;
    let ratingDescription;

    if (average / target >= 1) {
        rating = 3;
        ratingDescription = 'Great job, you reached your target!';
    } else if (average / target > 0.7) {
        rating = 2;
        ratingDescription = "So close, keep pushing!";
    } else {
        rating = 1;
        ratingDescription = "Terrible.";
    }

    return {
        periodLength,
        trainingDays,
        target,
        average,
        success,
        rating,
        ratingDescription,
    };
};

