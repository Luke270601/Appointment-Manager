/*
Description: Generates an interactable calendar to add events to specific days 

Author: Luke Scott

Date: 13/09/2023 
*/
import { useEffect } from "react";

export default function Calendar() {
  // Initialize the gridSize to 49.
  let gridSize = 49;

  // Generate the grid items for the calendar.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function generateGridItems(month, year) {
    let startDay = 0;
    let gridContainer = document.getElementById("graph");
    let daysList = getDaysInMonth(year, month);

    if (gridSize > 0) {
      for (let i = 0; i < gridSize; i++) {
        let box = document.createElement("div");
        box.className = "grid-item";
        box.id = "item " + i;
        let daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        if (i < 7) {
          // Display the days of the week at the top row of the calendar.
          box.innerText = daysOfWeek[i];
        }
        gridContainer.appendChild(box);
      }
      gridSize = 0;
    } else {
      gridSize = 49;
    }

    // Find the starting day of the month and populate the calendar with day numbers.
    let box = document.getElementById("item 7");
    let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for (let i = 0; i < 7; i++) {
      if (daysList[0].dayName === daysOfWeek[i]) {
        startDay = i + 7;
        box = document.getElementById("item " + startDay);
        box.innerText = (1).toString(); // Display the first day of the month.
      }
    }

    for (let i = 1; i < daysList.length; i++) {
      box = document.getElementById("item " + (startDay + i));
      box.innerText = (i + 1).toString(); // Display the remaining days of the month.
    }
  }

  // Get the days in the selected month and year.
  function getDaysInMonth(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysList = [];

    // Add the days of the month to a list along with their names.
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayName = date.toLocaleString('en-US', { weekday: 'long' });
      daysList.push({ day, dayName });
    }

    return daysList;
  }

  // Clear the calendar grid.
  function clearGrid() {
    const gridContainer = document.getElementById("graph");
    if (gridContainer) {
      while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
      }
    }
  }

  // Repopulate the calendar based on the selected month.
  function populateCalendar() {
    clearGrid();
    let selectedIndex = document.getElementById("months").selectedIndex;
    gridSize = 49;
    generateGridItems(selectedIndex, 2023);
  }

  // Use the useEffect hook to generate calendar items when the component mounts or when the generateGridItems function changes.
  useEffect(() => {
    let selectedIndex = document.getElementById("months").selectedIndex;
    generateGridItems(selectedIndex, 2023);
  }, [generateGridItems]);
  
  return (
    <div id="calendar">
      <div id="calendar-controls">
        <input id="year" type="number"></input>
        <input type="date"></input>
        <div id="calendar-month-year">
          <select id="months" onChange={populateCalendar}>
            {/* Dropdown options for selecting a month. */}
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>
      <div id="graph-container">
        <div id="graph" class="grid-container">
          {/* Calendar grid items */}
        </div>
      </div>
    </div>
  );
  
}
