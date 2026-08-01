import Button from './components/Button'
import Header from './components/Header'
import NavBar from './components/NavBar'
import { useState, useEffect } from 'react'

function App()
{
  const [darkMode, setDarkMode] = useState(false);
   
  useEffect(() => {

    if(darkMode)
    {
      document.documentElement.classList.add("dark-mode");
    }
    else
    {
      document.documentElement.classList.remove("dark-mode");
    }
    

  }, [darkMode]);

   return (
    <div>
    <Header></Header>
    <NavBar></NavBar>
    <button onClick={() => setDarkMode(!darkMode)}>
      Toggle {darkMode ? "Light" : "Dark"} Mode
    </button></div>
  );
}

export default App