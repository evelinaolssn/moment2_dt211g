"use strict";

//Fetch function for collecting data from API
async function fetchCourses() {
    try {
        //Request to API to collect courses
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");

        //Convert to JSON
        const data = await response.json();
        console.log(data);

        ///Collecting tbody element from HTML and clears previous content
        const tableBodyEl = document.querySelector("#table-body");
        tableBodyEl.innerHTML = "";
        
        //Funktion to collect data from API for each cell in course table
         data.forEach(course => {
            const tableRowEl = document.createElement("tr"); 
            tableRowEl.innerHTML = `
            <td>${course.code}</td>
            <td>${course.coursename}</td>
            <td>${course.progression}</td>
            `;
            tableBodyEl.appendChild(tableRowEl);
         });

        //Error message
    } catch (error) {
        console.log("Error", error);
        document.querySelector("#error").innerHTML = "Ett fel uppstod vid hämtning av kursdata, försök igen senare.";
    }
}

fetchCourses();