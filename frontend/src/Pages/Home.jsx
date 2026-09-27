
//Learn useStates and useEffects

import ToDoList from "../components/ToDoList";
import { Link } from "react-router-dom";

function Home()
{
    return <div>
            <div className="catalouge">
            <center><h1> <u> Check out our inventory:</u></h1></center>
            <Link to="/sword"><button>Item Page</button></Link>
            <ToDoList></ToDoList>
             </div>
                <div className="to-do-list">
                    <center> <h1> <u>Gunter's To-Do List </u></h1></center>
                </div>
            </div>
}

export default Home;