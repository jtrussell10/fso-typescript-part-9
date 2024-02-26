
export const calculateBmi = (height: number, weight: number) => {
  
  const bmi = weight / (height / 100 * height / 100);
  if (bmi < 18.5) {return "Underweight (not healthy)";
} if (bmi < 25) {return "Normal (healthy weight)";
} if (bmi < 30) {return "Overweight (not healthy)";
} else {return "Obese (very unhealthy)";}
};