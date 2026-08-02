import { useState, useEffect } from "react";

function ToDoList()
{

const [queue, SetQueue] = useState([]);
const [entry, SetEntry] = useState("");

useEffect(
    () => {fetch("http://ckpi4.local:5000/api/queue")
    .then((res) => res.json())
    .then((data) => SetQueue(data.queue)) }
    ,[]);

async function onSubmit(event)
{
    event.preventDefault()
    const response = await fetch("http://ckpi4.local:5000/api/add", 
        {method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ entry: entry})});

    const data = await response.json();
    SetQueue(data.queue);
    SetEntry("");
    
}

return <div>
    <form onSubmit={onSubmit}>
        <input type="text" value={entry} onChange={(event) => SetEntry(event.target.value)} />
        <button type="submit">Add</button>
    </form>

    <ul>
        {queue.map((item, index) => (<li key={index}>{item}</li>))}
    </ul>
</div>

}



export default ToDoList;