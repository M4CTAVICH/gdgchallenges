import { useState } from "react";

function CRcomponent() {
  const [isLoggedIN, setIsLoggedIn] = useState(false);
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("dark");
  return (
    <div className="concept-section">
      <h2>Condtional Rendring</h2>
      <button onClick={() => setIsLoggedIn(!isLoggedIN)}>
        {isLoggedIN ? "log out" : "log In"}
      </button>
      {(() => {
        if (isLoggedIN) {
          return <p>Welcome</p>;
        } else {
          return <p>please log in</p>;
        }
      })()}
      <p>Status : {isLoggedIN ? "logged In" : "Logged Out"}</p>
      {isLoggedIN && <p>you are logged in</p>}
      <div
        style={{
          padding: "20px",
          margin: "20px",
          backgroundcolor: theme === "dark" ? "black" : "white",
          color: theme === "dark" ? "black" : "white",
        }}
      >
        <p>theme = {theme}</p>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          toggle Theme
        </button>
      </div>
      <div>
        <p>count : {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        {count === 0 ? (
          <p>count is zero</p>
        ) : count < 5 ? (
          <p>count is less than 5</p>
        ) : (
          <p>count is greater than 5</p>
        )}
      </div>
    </div>
  );
}
export default CRcomponent;
