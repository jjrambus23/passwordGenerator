import React, { useState, useRef } from "react";

const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const passwordLengthRef = useRef(null);

  //To generate a random password we will assume the alphabetical
  const generateRandomPassword = (length, includeNumbers, includeSymbols) => {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (includeNumbers) {
      charset += "0123456789";
    }

    if (includeSymbols) {
      charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset.charAt(randomIndex);
    }

    return generatedPassword;
  };

  const generateMemorablePassword = (length) => {
    // Implement your logic to generate a memorable password (e.g., using common words)
    // Here's a simple example using random words
    const words = [
      "bathroom",
      "laptop",
      "orange",
      "red",
      "television",
      "computer",
      "guitar",
      "house",
      "icecream"
    ];
    let temp = "";
    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      temp += words[randomIndex];
      if (temp.length < length) {
        generatedPassword = temp;
      }
    }

    return generatedPassword;
  };

  const generatePin = (length, includeNumbers) => {
    let charset = "0123456789";

    if (!includeNumbers) {
      charset = ""; // If numbers are not allowed, generate an empty PIN
    }

    let generatedPin = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPin += charset.charAt(randomIndex);
    }

    return generatedPin;
  };

  const generatePassword = () => {
    const passwordType = document.getElementById("password-type").value;
    const passwordLength = passwordLengthRef.current.value;
    const includeNumbers = document.getElementById("include-numbers").checked;
    const includeSymbols = document.getElementById("include-symbols").checked;

    let generatedPassword = "";

    if (passwordType === "random") {
      generatedPassword = generateRandomPassword(
        passwordLength,
        includeNumbers,
        includeSymbols
      );
    } else if (passwordType === "memorable") {
      generatedPassword = generateMemorablePassword(passwordLength);
    } else if (passwordType === "pin") {
      generatedPassword = generatePin(passwordLength, includeNumbers);
    }

    setGeneratedPassword(generatedPassword);

    //For times sake I just decided that any password 8 characters or is considered "strong"
    //this logic can be updated to fit the definition of what the product owner defines a strong password to be.
    setPasswordStrength(passwordLength >= 8 ? "Strong" : "Weak");
  };

  const copyToClipboard = () => {
    const passwordDisplay = document.getElementById("password-display");
    passwordDisplay.select();
    document.execCommand("copy");
  };

  return (
    <div>
      <h1>Password Generator</h1>
      <div id="password-container">
        <input
          onClick={copyToClipboard}
          type="text"
          id="password-display"
          value={generatedPassword}
          readOnly
        />
      </div>
      <div id="options">
        <select id="password-type">
          <option value="random">Random</option>
          <option value="memorable">Memorable</option>
          <option value="pin">Pin</option>
        </select>
        <label htmlFor="password-length">Password Length: </label>
        <input
          type="number"
          id="password-length"
          ref={passwordLengthRef}
          defaultValue="10"
        />
        <label htmlFor="include-numbers">Include Numbers</label>
        <input type="checkbox" id="include-numbers" defaultChecked />
        <label htmlFor="include-symbols">Include Symbols</label>
        <input type="checkbox" id="include-symbols" defaultChecked />
        <button id="generate-button" onClick={generatePassword}>
          Generate Password
        </button>
      </div>
      <p id="password-strength">Password Strength: {passwordStrength}</p>
    </div>
  );
};

export default PasswordGenerator;
