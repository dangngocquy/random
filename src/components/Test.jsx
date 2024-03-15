import React, { useState } from "react";

const Test = () => {
  const [percentageForNumber, setPercentageForNumber] = useState(0);
  const [inputNumber, setInputNumber] = useState([]);
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandomNumber = () => {
    const newRandomNumber = Math.random();
    const result =
      newRandomNumber < percentageForNumber / 100
        ? inputNumber
        : Math.floor(newRandomNumber * 90000) + 10000;

    setRandomNumber(result);
  };

  return (
    <div>
      <label>
        Nhập tỉ lệ:
        <input
          type="number"
          value={percentageForNumber}
          onChange={(e) => setPercentageForNumber(parseInt(e.target.value))}
        />
        %
      </label>
      <br />
      <label>
        Nhập số:
        <input
          type="number"
          value={inputNumber}
          onChange={(e) => setInputNumber(parseInt(e.target.value))}
        />
      </label>
      <br />
      <button onClick={generateRandomNumber}>Random</button>
      {randomNumber !== null && (
        <div>
          <p>Kết quả:</p>
          <p>{randomNumber}</p>
        </div>
      )}
    </div>
  );
};

export default Test;