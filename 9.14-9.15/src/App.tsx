interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  },
];

const App = () => {
  const courseName = "Half Stack application development";

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <CourseParts parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

const Header = (props: { name: string }) => (
  <h1>{props.name}</h1>
);

const CourseParts = ({ parts }: { parts: CoursePart[] }) => (
  <div>
    {parts.map(part => (
      <div key={part.name}>
        <strong>{part.name}</strong> - Exercises: {part.exerciseCount}
        {'description' in part && <div><i> {part.description}</i></div>}
        {'groupProjectCount' in part && <div><i> Group projects: {part.groupProjectCount}</i></div>}
        {'backgroundMaterial' in part && <div><i> Background material: {part.backgroundMaterial}</i></div>}
      </div>
    ))}
  </div>
);


const Total = (props: { total: number }) => (
  <p>
    Number of exercises {props.total}
  </p>
);




export default App;