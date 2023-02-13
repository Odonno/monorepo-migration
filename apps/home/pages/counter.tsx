import { useState } from "react";
import { Button } from "ui";

export default function Counter() {
  const [value, setValue] = useState(0);

  const onIncrementButtonClicked = () => {
    setValue(value + 1);
  };

  const onDecrementButtonClicked = () => {
    setValue(value - 1);
  };

  return (
    <div>
      <h1>Counter</h1>
      <p>Current value: {value}</p>
      <Button onClick={onIncrementButtonClicked}>Increment</Button>
      <Button onClick={onDecrementButtonClicked}>Decrement</Button>
    </div>
  );
}
