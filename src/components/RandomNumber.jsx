import React, { useState } from "react";
import DefautlNumber from "./DefautlNumber";

const RandomNumber = () => {
    const [randomNumber, setRandomNumber] = useState(DefautlNumber());
    const [stoppedIndex, setStoppedIndex] = useState(-1);
    const [percentageForNumber, setPercentageForNumber] = useState(0);

    const getRandomNumberFromRow = (rowData) => {
        if (!rowData) {
            return;
        }
        const handleStop = (index) => {
            setStoppedIndex(index);
        };

        const numbers = rowData[0]?.toString().split("") || [];
        const totalSteps = numbers.length;
        const delay = 1000;

        const timer = (index) => {
            if (index >= totalSteps + 1) {
                return;
            }
            const stepsCompleted = index + 1;

            const randomNumbers = numbers.map((number, mathi) => {
                let content;
                if (mathi < stepsCompleted - 1) {
                    content = number;
                } else {
                    content = (
                        <div
                            className={`Reel-plate-${index} ${mathi === stoppedIndex ? "spin" : "spin"
                                }`}
                        >
                            {"?0123456789".split("").map((number) => (
                                <span key={number}>{number}</span>
                            ))}
                        </div>
                    );
                }

                return (
                    <div
                        key={mathi}
                        className="number-box-niso"
                        style={{
                            background: "rgb(255, 255, 255, 1)",
                            boxShadow:
                                "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
                        }}
                        onClick={() => handleStop(mathi)}
                    >
                        {content}
                    </div>
                );
            });

            const remainingSlots = DefautlNumber().slice(totalSteps);

            setRandomNumber([...randomNumbers, ...remainingSlots]);

            setTimeout(() => {
                timer(index + 1);
            }, delay);
        };

        timer(0);
    };

    return {
        getRandomNumberFromRow,
        randomNumber,
        setRandomNumber,
        percentageForNumber,
        setPercentageForNumber,
    };
};

export default RandomNumber;  