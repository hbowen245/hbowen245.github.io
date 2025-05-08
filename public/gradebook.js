// TODO: Fetch data from the PostgreSQL database (to be implemented later)
function fetchGradeData() {
  // This function will query the PostgreSQL database and return grade data
  console.log("Fetching grade data...");
  // Create a new request for HTTP data
  let xhr = new XMLHttpRequest();
  //This is the address on the machine we're asking for data
  let apiRoute = "/api/grades";
  //When the request changes status, we run this anonymous function
  xhr.onreadystatechange = function (){
    let results;
    //Check if we're done
    if(xhr.readyState === xhr.DONE){
      //Check if we're successful
      if(xhr.status !== 200){
        console.error(`Could not get grades.
                        Status: ${xhr.status}`);
      }
      //And then call the function to update the HTML with our data
      populateGradebook(JSON.parse(xhr.responseText));
    }
  }.bind(this);
  xhr.open("get", apiRoute, true);
  xhr.send();
}
// TODO: Populate the table with grade data
function populateGradebook(data) {
  const tbody = document.getElementById("gradebook").getElementsByTagName("tbody")[0];
  tbody.innerHTML = ""; // Clear any existing rows

  data.forEach(student => {
    const row = document.createElement("tr");

    // Full name
    const nameCell = document.createElement("td");
    nameCell.textContent = `${student.last_name}, ${student.first_name}`;
    row.appendChild(nameCell);

    // Assignments 1–3
    const assignments = ['assignment_1', 'assignment_2', 'assignment_3'];
    assignments.forEach(key => {
      const cell = document.createElement("td");
      cell.textContent = student[key] !== null && student[key] !== undefined ? student[key] : "N/A";
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });
};

fetchGradeData();
