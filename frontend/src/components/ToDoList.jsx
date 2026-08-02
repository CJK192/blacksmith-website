import { useState, useEffect } from "react";

function ToDoList()
{
    const [count, setCount] = useState(0);
    const [queue, setQueue] = useState([]);
    const [entry, setEntry] = useState("");

    useEffect(() => {
        fetch("http://ckip4.local.5000/api/queue")
        .then((res) => res.json())
        .then((data) => {
            setCount(data.count);
            setQueue(data.queue);
        });

    }, []);

     async function handleSubmit(e) {
    e.preventDefault(); // stops the browser's default full-page form submission
    const response = await fetch("http://ckpi4.local:5000/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entry: entry }),
    });
    const data = await response.json();
    setCount(data.count);
    setQueue(data.queue);
    setEntry(""); // clear the input after submitting
  }

  return (
    <div>
      <h1>Current count: {count}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {queue.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );

}

export default ToDoList;