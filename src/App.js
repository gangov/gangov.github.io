import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    const focusInput = () => inputRef.current.focus();
    document.addEventListener("click", focusInput);
    return () => document.removeEventListener("click", focusInput);
  }, []);

  useEffect(() => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [output]);

  const inputRef = useRef(null);

  const commands = {
    help: "Available commands: help, about, projects, clear",
    about: "Kaloyan - Linux Enthusiast and Developer.",
    projects:
      "1. [Project 1](https://github.com/your-project)\n2. [Project 2](https://github.com/your-project)",
    clear: "clear",
  };

  const handleInput = (event) => {
    if (event.key === "Enter") {
      const userCommand = input.trim();
      let response;

      if (commands[userCommand]) {
        response = commands[userCommand];
      } else {
        response = `sh: ${userCommand}: command not found`;
      }

      setOutput((prevOutput) =>
        [
          ...prevOutput,
          `user@locahost $ ${userCommand}`,
          response === "clear" ? null : response,
        ].filter(Boolean),
      );

      if (userCommand === "clear") {
        setOutput([]);
      }

      setInput("");
    }
  };

  return (
    <div className="terminal" ref={terminalRef}>
      {output.map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      <div className="input-line">
        <span>$</span>
        <input
          ref={inputRef}
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
