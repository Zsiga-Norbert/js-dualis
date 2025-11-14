import {useState } from 'react'
import './App.css'

function App() {
const [theme, setTheme] = useState<string>("")
const setAppTheme =() => {
  setTheme(localStorage.getItem("theme")!)
  if(!theme)
  {
    setTheme("light")
  }
  if(theme == "light")
  {
    document.documentElement.setAttribute("data-theme", "dark");
  }
  else
  {
    document.documentElement.setAttribute("data-theme", "light");
  }
}
  return (
    <>
    {setAppTheme()}
    </>
  )
}

export default App
