import React, { useState } from "react";
import { PhoneBox } from "../src/components/PhoneBox";

export default function App() {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  return (
    <div style={{ maxWidth: 300, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>📱 PhoneBox Demo</h2>
      <PhoneBox
        value={value}
        onChange={setValue}
        locale="en"
        initialCountry="us"
        onValidityChange={setIsValid}
        onCountryChange={(c) => console.log("Country:", c)}
      />
      <p style={{ marginTop: 10 }}>
        <strong>Valid:</strong> {isValid ? "✅" : "❌"}
      </p>
      <p>
        <strong>Value:</strong> {value}
      </p>
    </div>
  );
}