"use client";
import { ChangeEvent, useState } from "react"

export default function HelloWorld() {
    const [name, setName] = useState("bob");
    function handleNameChange(evt: ChangeEvent<HTMLInputElement>) {
        setName(evt.target.value);
    }
    return <div>
<label>
    Your name
<input type="text" value={name} onChange={handleNameChange}/>
</label>
<p> Hello {name}</p>
    </div>
}