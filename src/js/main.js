"use strict";

//Fetch function for collecting data from API
async function fetchCourses() {
    try {
        //Request to API to collect courses
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json");

        //Convert to JSON
        const data = await response.json();
        console.log(data);

        //Error message
    } catch (error) {
        console.log("Error", error);
        document.querySelector("#error").innerHTML = "Ett fel uppstod vid hämtning av kursdata, försök igen senare.";
    }
}

fetchCourses();