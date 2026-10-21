import { useState, useEffect } from "react";

function ToDoList()
{

const [queue, SetQueue] = useState([]);
//const [id_queue, setIds] = useState([]);
//http://ckpi4.local:5000/api/queue

useEffect(
    () => {
        async function refreshQueue() {
            
            try{
             const response = await  fetch("http://192.168.1.52:5000/api/queue");
           

            if (!response.ok)
            {
                throw new Error('Failed to fetch queue');
            }

            const data = await response.json();
            SetQueue(data.queue)
            
        } catch(error)
        {
            console.error('Error fetching queue:', error);
        }
    }

    refreshQueue();

    const interval = setInterval(refreshQueue, 2000);

    return () => clearInterval(interval)

    }, []);

    



return <div>
    <ul>
        {queue.map((item, index) => (<li key={index}>{item}</li>))}
    </ul>
</div>
}

export default ToDoList;