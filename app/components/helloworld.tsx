"use client";
import { ChangeEvent, useState } from "react";
// Used to conditionally style elements
import clsx from 'clsx';

// TypeScript syntax
// a:number: indicates that the parameter a shoudl be a number
// The :number after the parameter declarations specify that the function
// should return a number
function add(a: number | null, b:number | null):number | null {
  if (a !== null && b !== null){
    return a+b;
  } else {
    return null;
  }
}

export default function HelloWorld() {
  const greetings = ["hello", "goodbye", "welcome", "yo"];
  // State variables
  const [greeting, setGreeting] = useState(0);
  const [name, setName] = useState("world");
  // Calculator state variables
  const [numberA, setNumberA] = useState<number | null>(null);
  const [numberB, setNumberB] = useState<number | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);

  function handleNameChange(evt: ChangeEvent<HTMLInputElement>) {
    setName(evt.target.value);
  }

  function handleGreetingChange(evt: ChangeEvent<HTMLSelectElement>) {
    setGreeting(Number.parseInt(evt.target.value, 10));
  }

  function handleNumberA(evt: ChangeEvent<HTMLInputElement>){
    setNumberA(Number(evt.target.value));
  }

  function handleNumberB(evt: ChangeEvent<HTMLInputElement>){
    setNumberB(Number(evt.target.value));
  }
  
  function handleCompute(){
    /* When button is clicked, add number A and B together to get the answer */
    const answer:number | null = add(numberA, numberB);
    
    setAnswer(answer);
  }

  setTimeout(() => {
    setGreeting(1);
    setName("cruel world");
  }, 8000);
  
  return (
    <div>
      <div>
        <label>
          Your name
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <label>
          Greeting
          <select onChange={handleGreetingChange}>
            {greetings.map((g, i) => {
              return (
                <option key={i} selected={i === greeting} value={i}>
                  {g}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <div>
        <label>
          First number
          <input type="number" value={String(numberA)} onChange={handleNumberA}/>
        </label>
        <b> + </b>
        <label>
          Second number
          <input type="number" value={String(numberB)} onChange={handleNumberB}/>
        </label>
      </div>
      <button onClick={handleCompute}>Compute</button>
      <p className = {clsx(
        /* Hide p element if the answer is undefined, show otherwise */
        {"hidden": answer === null,
          "block" : answer !== null}
      )}>
        The answer is {answer}.
      </p>
      <p>
        {" "}
        {greetings[greeting]} {name}
      </p>
    </div>
  );
}
