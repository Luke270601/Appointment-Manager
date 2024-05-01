/*
Description: Generates an interactable calendar to add events to specific days 

Author: Luke Scott

Date: 13/09/2023 
*/

export default function Calendar() {

  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  
  return (
    <div id="scheduler">
    <div id="calendar">
      <h2>Monthly Schedule</h2>
      <div id="calendar-controls">
      </div>
      <div id="graph-container">
        <input type="date" id="datepicker" min={formattedDate}></input>
        <div id="schedule">
          <div>12:00</div>
          <div>13:00</div>
          <div>14:00</div>
          <div>15:00</div>
          <div>16:00</div>
          <div>17:00</div>
          <div>18:00</div>
        </div>
      </div>
    </div>
    <div id="hours">

    </div>
    </div>
  );
  
}
