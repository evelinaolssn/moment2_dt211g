"use strict";

//Store fetched data from API
let coursesData = [];

//Function to retrieve courses data and add event lister when data is loaded
window.onload = () => {
    fetchCourses();

    //Event listener for search input field
    document.querySelector("#search-input").addEventListener("input", filterData);
}

//Fetch function for collecting data from API
async function fetchCourses() {
    try {
        //Request to API to collect courses
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");
        //Error message
        if (!response.ok) {
            throw new Error("Fel vid API-anrop...");
        };

        //Convert to JSON
        coursesData = await response.json();
        console.log(coursesData);

        courseTable(coursesData);

        //Error message
    } catch (error) {
        console.log("Error", error);
        document.querySelector("#error").innerHTML = "Ett fel uppstod vid hämtning av kursdata, försök igen senare.";
    }
}

function courseTable(data) {
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
}

//Function to filter course data based on users input
function filterData() {
    const searchInput = document.querySelector("#search-input").value;

    //Filter courses based on code, coursename and progression
    const filteredData = coursesData.filter(course =>
        course.code.toLowerCase().includes(searchInput.toLowerCase()) ||
        course.coursename.toLowerCase().includes(searchInput.toLowerCase()) ||
        course.progression.toLowerCase().includes(searchInput.toLowerCase())
    )

    //Updated table with filtered courses 
    courseTable(filteredData);
};

