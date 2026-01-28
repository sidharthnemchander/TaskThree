import { useEffect, useRef, useState } from "react";
import ErrorCircles from "./ErrorCircles";

const Dash = ({ word, onWin }) => {
  const [dashword, setDashword] = useState(["", "", "", "", ""]);
  const [focusedDash, setFocusedDash] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [tempLetter, setTempLetter] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (errorCount >= 3) {
      setIsDisabled(true);
    }
  }, [errorCount]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        const boardElement = document.getElementById("board");
        if (boardElement) {
          boardElement.focus();
          setFocusedDash(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDashClick = (index) => {
    if (isDisabled) return;
    setFocusedDash(index);

    const input = document.querySelector(".dash-input");
    if (input) {
      input.focus();
    }
  };

  const handleInput = (e) => {
    if (isDisabled) return;

    const keyPressed = e.target.value.toUpperCase();
    if (keyPressed.length === 1 && keyPressed >= "A" && keyPressed <= "Z") {
      const newDashword = [...dashword];

      if (word[focusedDash] !== keyPressed) {
        setTempLetter({
          index: focusedDash,
          letter: keyPressed,
        });

        setTimeout(() => {
          setTempLetter(null);
          newDashword[focusedDash] = "";
          setDashword(newDashword);
        }, 350);

        setErrorCount((prev) => Math.min(prev + 1, 3));
      } else {
        newDashword[focusedDash] = keyPressed;
        setDashword(newDashword);
      }

      e.target.value = "";

      if (newDashword.every((letter, index) => letter === word[index])) {
        onWin();
      }
    }
  };

  return (
    <div
      className="dashes-container"
      style={{ position: "relative" }}
      ref={inputRef}
    >
      <ErrorCircles errorCount={errorCount} />
      <div className="dashes">
        {dashword.map((dash, index) => (
          <div
            key={index}
            className={`dash ${focusedDash === index ? "focused" : ""}`}
            onClick={() => handleDashClick(index)}
            style={{
              opacity: isDisabled ? 0.5 : 1,
              cursor: isDisabled ? "not-allowed" : "pointer",
            }}
          >
            {tempLetter && tempLetter.index === index
              ? tempLetter.letter
              : dash}
          </div>
        ))}
      </div>
      <input
        type="text"
        maxLength="1"
        className="dash-input"
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: isDisabled ? "none" : "auto",
        }}
        onInput={handleInput}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Dash;
