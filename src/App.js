import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const focusInput = () => inputRef.current.focus();
    document.addEventListener("click", focusInput);
    return () => document.removeEventListener("click", focusInput);
  }, []);

  useEffect(() => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [output]);

  const commands = {
    help: "Available commands: help, about, projects, clear",
    about: "Kaloyan - Rust developer.",
    projects:
      "1. [Project 1](https://github.com/**)\n2. [Project 2](https://github.com/**)",
    clear: "clear",
  };

  const handleInput = (event) => {
    if (event.key === "Enter") {
      const userCommand = input.trim();

      if (userCommand === "") {
        // If there's no input, just create a new prompt line
        setOutput((prevOutput) => [...prevOutput, "user@localhost $"]);
      } else {
        let response;

        if (commands[userCommand]) {
          response = commands[userCommand];
        } else {
          response = `sh: ${userCommand}: command not found`;
        }

        setOutput((prevOutput) =>
          [
            ...prevOutput,
            `user@localhost $ ${userCommand}`,
            response === "clear" ? null : response,
          ].filter(Boolean),
        );

        if (userCommand === "clear") {
          setOutput([]);
        }
      }

      setInput("");
    }

    if (event.key === "c" && event.ctrlKey) {
      // Handle Ctrl+C key press
      setOutput((prevOutput) => [
        ...prevOutput,
        `user@localhost $ ${input}`, // Display the command typed so far
        "^C", // Mimic Ctrl+C output
      ]);

      setInput("");
    }
  };

  return (
    <div className="terminal" ref={terminalRef}>
      {output.map((line, index) => (
        <div key={index} className="output-line">
          {line}
        </div>
      ))}
      <div className="input-line">
        <span className="prompt">user@localhost $</span>
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
