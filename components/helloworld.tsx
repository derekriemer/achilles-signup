"use client";
import { ChangeEvent, useState } from "react";

export default function HelloWorld() {
  const greetings = ["hello", "goodbye", "welcome", "yo"];
  const [greeting, setGreeting] = useState(0);
  const [name, setName] = useState("world");

  function handleNameChange(evt: ChangeEvent<HTMLInputElement>) {
    setName(evt.target.value);
  }

  function handleGreetingChange(evt: ChangeEvent<HTMLSelectElement>) {
    setGreeting(Number.parseInt(evt.target.value, 10));
  }

  setTimeout(() => {
    setGreeting(1);
    setName("cruel world");
  }, 8000);
  
  return (
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
      <p>
        {" "}
        {greetings[greeting]} {name}
      </p>
    </div>
  );
}
