import { useState, useEffect } from "react";

function ToDoList()
{

const [queue, SetQueue] = useState([]);
//http://ckpi4.local:5000/api/queue

useEffect(
    () => {fetch("http://localhost:5000/api/queue")
    .then((res) => res.json())
    .then((data) => SetQueue(data.queue)) }, []
    );

async function onSubmit(event)
{
    event.preventDefault()
    const response = await fetch("http://localhost:5000/api/add", 
        {method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ entry: entry})});

    const data = await response.json();
    SetQueue(data.queue);
  
    
}

return <div>
    <ul>
        {queue.map((item, index) => (<li key={index}>{item}</li>))}
    </ul>
</div>
}

export default ToDoList;