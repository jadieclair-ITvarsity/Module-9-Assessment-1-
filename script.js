// Declare global variables
let startTime;
let endTime;
let origTimePeriod;
let newTimePeriod;
let timer;
let cancelled = false;

// Function to start the timer
const startTimer = () => {
  cancelled = false;
  startTime = new Date();
  endTime = getEndTime();

  // Calculate the original time period in milliseconds
  origTimePeriod = endTime.getTime() - startTime.getTime();
  newTimePeriod = origTimePeriod;
  // Start the interval to update the countdown every second
  timer = setInterval(displayCountdown, 1000);
};

// Function to display the countdown
const displayCountdown = () => {
  const timeLeft = msToTime(newTimePeriod);

  // Update the HTML element with the remaining time
  document.getElementById(
    "clock"
  ).innerHTML = `<p>${timeLeft["hours"]}h ${timeLeft["minutes"]}m ${timeLeft["seconds"]}s</p>`;

  const newHeight = Math.floor((newTimePeriod / origTimePeriod) * 100) * 3;
  document.getElementById("progressBar").setAttribute("height", newHeight);

  // Decrease the remaining time by one second (1000 milliseconds)
  newTimePeriod = newTimePeriod - 1000;

  // Check if the timer has finished or if it was cancelled
  if (newTimePeriod < 0 || cancelled) {
    clearInterval(timer);
    document.getElementById("clock").innerHTML = `<p>Complete!</p>`;
  }
};

// Function to stop the timer
const stopBtnPressed = () => {
  cancelled = true;
};

// Function to convert milliseconds to an object with hours, minutes, and seconds
const msToTime = (milliseconds) => {
  const mpHour = 1000 * 60 * 60;
  const mpMinute = 1000 * 60;
  const mpSecond = 1000;

  // Calculate hours, minutes, and seconds from the total milliseconds
  const hours = Math.floor(milliseconds / mpHour);
  const minutes = Math.floor((milliseconds % mpHour) / mpMinute);
  const seconds = Math.floor((milliseconds % mpMinute) / mpSecond);

  // Create a time object with hours, minutes, and seconds
  const time = [];
  time["hours"] = hours;
  time["minutes"] = minutes;
  time["seconds"] = seconds;

  return time;
};

// Function to get the end time based on user input
const getEndTime = () => {
  const date = new Date();

  // Get user input values for hours, minutes, and seconds
  const hours = parseInt(document.getElementById("hours").value);
  const minutes = parseInt(document.getElementById("minutes").value);
  const seconds = parseInt(document.getElementById("seconds").value);

  // Add user input values to the current time to get the end time
  date.setHours(date.getHours() + hours);
  date.setMinutes(date.getMinutes() + minutes);
  date.setSeconds(date.getSeconds() + seconds);

  return date;
};

// Add event listeners for the start and stop buttons
document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopBtnPressed);
