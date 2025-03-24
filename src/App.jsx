import { useState } from "react";
import CRcomponent from "./components/CRcomponent";
import Effectcomponents from "./components/Effectcomponents";
import Randomizer from "./components/randomizer";
import trash from './assets/trash.svg';
import "./App.css";

function App() {
  const [selected , setSelected] = useState(null);
  return ( 
    <div className="App">
      <img src={trash} alt="React Logo" className="logo" />
      <h1>العشوائية</h1>
      <div className="nav-bar">
        <button onClick={() => setSelected("effects")}>Effects</button>
        <button onClick={() => setSelected("conditional")}>conditional Rendring</button>
        <button onClick={() => setSelected("randomizer")}>randomizer</button>
      </div>
      <div className="content">
        {selected === "effects" && <Effectcomponents />}
        {selected === "conditional" && <CRcomponent />}
        {selected === "randomizer" && <Randomizer />}
        {!selected && <p>please select one of the following subjects</p>}
      </div>
    </div>
  )
}
export default App;
