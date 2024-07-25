import React, { useState } from "react";
import "./PasswordGenerator.css";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const generatePassword = () => {
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let characterPool = "";
    if (includeUppercase) characterPool += upperCaseChars;
    if (includeLowercase) characterPool += lowerCaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;

    if (characterPool === "") return "";

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    setPassword(generatedPassword);
    calculateStrength(generatedPassword);
  };

  const calculateStrength = (password) => {
    let strength = "";
    let score = 0;
    if (password.length >= 16) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)) score += 1;

    switch (score) {
      case 5:
        strength = "Strong";
        break;
      case 4:
        strength = "Medium";
        break;
      default:
        strength = "Weak";
        break;
    }
    setStrength(strength);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard");
  };

  return (
    <div className="password-generator">
      <h2>Password Generator</h2>
      <div className="controls">
        <label>
          Length:
          <input
            type="number"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Include Uppercase Letters
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          Include Lowercase Letters
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include Symbols
        </label>
        <button onClick={generatePassword}>Generate Password</button>
      </div>
      <div className="output">
        <h3>Your Password:</h3>
        <p className="password">{password}</p>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
        <div className={`strength ${strength.toLowerCase()}`}>
          Strength: {strength}
        </div>
        <div className="strength-meter">
          <div className={`strength-bar ${strength.toLowerCase()}`}></div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
