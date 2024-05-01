/*
Description: Generates an interactable calendar to add events to specific days 

Author: Luke Scott

Date: 13/09/2023 
*/
import React, { useState } from 'react';

export default function Calendar() {

  const [schedule, setSchedule] = useState([
    { time: "12:00", status:""},
    { time: "13:00", status:""},
    { time: "14:00", status:""},
    { time: "15:00", status:""},
    { time: "16:00", status:""},
    { time: "17:00", status:""},
    { time: "18:00", status:""},
]);

  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  
  const getAppointments = async () => {
    let selectedDate = document.getElementById("datepicker").value
    let date = selectedDate
    try {
      const response = await fetch('/getappointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({ date }) , // Send date 
      });
      
      const data = await response.json();
    
      if (response.ok) {
        // Login successful, handle accordingly (e.g., redirect)
        updateTable(JSON.parse(data))
        console.log(schedule)
      } else {
        // Login failed, handle accordingly (e.g., show error message)
        console.log(data.error);
      }

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const addAppointment = async () => {
    let selectedDate = document.getElementById("datepicker").value
    let date = selectedDate
    let time = "12:00"
    let name = "nice guy"
    let email = "cheddar"
    try {
      const response = await fetch('/addAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({ name, email, date, time }) , // Send date 
      });
      
      const data = await response.json();
    
      if (response.ok) {
        // Login successful, handle accordingly (e.g., redirect)

      } else {
        // Login failed, handle accordingly (e.g., show error message)
        console.log(data.error);
      }

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  function updateTable(appointments){
   let baseSchedule = [
      { time: "12:00", status:""},
      { time: "13:00", status:""},
      { time: "14:00", status:""},
      { time: "15:00", status:""},
      { time: "16:00", status:""},
      { time: "17:00", status:""},
      { time: "18:00", status:""},
  ]
    for(let i = 0; i < baseSchedule.length; i++){
      let match = "";
        for (let j = 0; j < appointments.length; j++){
            if (appointments[j].time === baseSchedule[i].time){
              console.log("Matched")
              match = "booked"
              
            } 
        }
        baseSchedule.status = match; 
    }
    setSchedule(schedule)
  }


  
  return (
    <div id="scheduler">
    <div id="calendar">
      <h2>Monthly Schedule</h2>
      <div id="calendar-controls">
      <button onClick={addAppointment}>Button</button>
      </div>
      <div id="graph-container">
        <input type="date" id="datepicker" onChange={getAppointments} min={formattedDate}></input>
        <table>
                <tr>
                    <th>Time</th>
                    <th>Status</th>
                </tr>
                {schedule.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.time}</td>
                            <td>{val.status}</td>
                        </tr>
                    )
                })}
            </table>
      </div>
    </div>
    <div id="hours">

    </div>
    </div>
  );
  
}
