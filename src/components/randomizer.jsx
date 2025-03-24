import { useState } from "react";
import "./randomizer.css";

function Randomizer() {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const handleAddOption = () => {
    if (inputValue.trim() !== "") {
      setOptions([...options, inputValue]);
      setInputValue("");
    }
  };
  const handleRandomize = () => {
    if (options.length > 0) {
      const randomIndex = Math.floor(Math.random() * options.length);
      setResult(options[randomIndex]);
    }
  };
  const handleDelete = (indextoremove) => {
    setOptions(options.filter((_, index) => index !== indextoremove));
  };

  return (
    <div className="randomizer">
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter an option"
        />
        <button onClick={handleAddOption}>Add Option</button>
      </div>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <span>{option}</span>
            <button className="delbtn" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {options.length > 0 && (
        <button onClick={handleRandomize}>Randomize</button>
      )}
      {result && (
        <div className="result-section">
          <h2>Result</h2>
          <h3>{result}</h3>
        </div>
      )}
    </div>
  );
}
export default Randomizer;
