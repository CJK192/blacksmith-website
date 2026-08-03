
//Learn useStates and useEffects

import ToDoList from "../components/ToDoList";
import { Link } from "react-router-dom";

function Home()
{
    return <div>
    <h1> This is the home page!</h1>
    <Link to="/item"><button>Item Page</button></Link>
    <ToDoList></ToDoList>
             </div>
}

export default Home;