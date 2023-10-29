import { useState } from "react"
import "./App.scss"
import Leftbar from "./components/leftbar/Leftbar"
import Topbar from "./components/topbar/Topbar"
import Workspace from "./components/Workspace"

const App = () => {
  const [theme, setTheme] = useState("darkTheme")
  const changeTheme = () => {
    theme == "darkTheme" ? setTheme("lightTheme") : setTheme("darkTheme")
  }

  return (
    <div className={`app ${theme}`}>
      <Topbar changeTheme={changeTheme} />
      <div className="appContent">
        <Leftbar />
        <Workspace />
      </div>
    </div>
  )
}

export default App
