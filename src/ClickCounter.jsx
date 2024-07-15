import React, { useState, useRef, useEffect } from 'react';

const ClickCounter = () => {
  const [count, setCount] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeList, setTimeList] = useState([]);
  const [highestClicks, setHighestClicks] = useState(0); // State to track highest clicks
  const timerRef = useRef(null);
  const totalClicksRef = useRef(0);

  const handleClick = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      totalClicksRef.current = 0;
      setCount(0);
      timerRef.current = setTimeout(() => {
        setIsTimerRunning(false);
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedTime = `${hours}:${minutes}`;
        const message = `${formattedTime} - Total clicks: ${totalClicksRef.current}`;
        setTimeList(prevTimeList => [
          ...prevTimeList,
          message
        ]);
        if (totalClicksRef.current > highestClicks) {
          setHighestClicks(totalClicksRef.current);
          alert("Congratulations you scored Highest Click"); 
        }
      }, 2000);
    }
    totalClicksRef.current += 1;
    setCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
    if (!isTimerRunning && count > 0) {
      alert("Time Out");
      setCount(0);
    }
  }, [isTimerRunning]);

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <p>Count: {count}</p>
      <h2>Time List with Total Clicks</h2>
      <ul>
        {timeList.map((time, index) => (
          <li key={index}>{time}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClickCounter;
