import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);

  const commands = {
    help: "Available commands: help, about, projects, clear",
    about:
      "Kaloyan Gangov - Software developer. Experienced in Rust, Java, web2 and web3. FOSS advocate. Self host all the things.",
    projects:
      "Projects:\n1. [Project 1](https://github.com/your-project)\n2. [Project 2](https://github.com/your-project)",
    clear: "",
  };

  const handleInput = (event) => {
    if (event.key === "Enter") {
      const userCommand = input.trim();
      let response;

      if (commands[userCommand]) {
        response = commands[userCommand];
      } else {
        response = `sh: ${userCommand}: command not found: `;
      }

      setOutput([...output, `user@localhost: ${userCommand}`, response]);
      if (userCommand === "clear") {
        setOutput([]);
      }
      setInput("");
    }
  };

  return (
    <div className="terminal">
      <div className="output">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="input-line">
        <span>$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInput}
          autoFocus
        />
      </div>
    </div>
  );
}

export default App;
