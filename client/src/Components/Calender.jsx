import {useEffect} from "react";

export default function Calendar() {

    let gridSize = 49;

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
                let daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                if (i < 7) {
                    // eslint-disable-next-line default-case
                    box.innerText = daysOfWeek[i]
                }
                gridContainer.appendChild(box);
            }
            gridSize = 0;

        } else {
            gridSize = 49
        }
        let box = document.getElementById("item 7")
        let daysOfWeek = ["Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        // eslint-disable-next-line default-case
        for(let i = 0; i < 7; i++){ 
            if(daysList[0].dayName === daysOfWeek[i]){
                startDay = i + 7
                box = document.getElementById("item " + startDay)
                box.innerText = (1).toString();
            }
    }

        for (let i = 1; i < daysList.length; i++) {
            box = document.getElementById("item " + (startDay + i))
            box.innerText = (i + 1).toString();
        }

    }

    function getDaysInMonth(year, month) {
        const daysInMonth = new Date(year, month+1, 0).getDate();
        const daysList = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dayName = date.toLocaleString('en-US', {weekday: 'long'});
            daysList.push({day, dayName});
        }

        return daysList;
    }

    function clearGrid() {
        const gridContainer = document.getElementById("graph");
        if (gridContainer) {
            while (gridContainer.firstChild) {
                gridContainer.removeChild(gridContainer.firstChild);
            }
        }
    }

    function populateCalender() {
        clearGrid()
        let selectedIndex = document.getElementById("months").selectedIndex
        gridSize = 49
        generateGridItems(selectedIndex, 2023)
    }

    useEffect(() => {
        let selectedIndex = document.getElementById("months").selectedIndex
        generateGridItems(selectedIndex, 2023)
    }, [generateGridItems]);

    return (
        <div>
            <label htmlFor="months">Select a Month:</label>
            <select id="months" onChange={populateCalender}>
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
            <div id="graph" className="grid-container">
            </div>
        </div>
    )
        ;

}