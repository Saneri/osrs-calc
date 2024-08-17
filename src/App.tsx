import { useState } from "react";
import "./App.css";
import DropProbabilityForm, { FormValues } from "./forms/dropProbabilityForm";

function App() {
  const [sum, setSum] = useState<number | null>(null);

  const onSubmit = (values: FormValues) => {
    const calculatedSum = values.integer1 + values.integer2;
    setSum(calculatedSum);
  };

  return (
    <>
      <h1>OSRS Drop Probability Calculator</h1>
      <DropProbabilityForm onSubmit={onSubmit} sum={sum} />
      <div>
        <h2>Sum: {sum ?? "n/a"}</h2>
      </div>
    </>
  );
}

export default App;
