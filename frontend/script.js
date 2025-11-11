// Select the form by its ID
const jobForm = document.getElementById('jobForm');

// Attach an event listener for submit
jobForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    // read inputs and make the API call
    const jobTitle = document.getElementById('jobTitleInput').value;
    const companyName = document.getElementById('companyNameInput').value;

    const response = await fetch('http://127.0.0.1:8000/classify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            job_title: jobTitle,
            company_name: companyName
        })
        })

    const data = await response.json();

    // update the results div
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Classification Report:</h3>
        <p>Seniority Level: ${data.seniority || "Unknown"}</p>
        <p>Job Function: ${data.function}</p>
        <p>Department: ${data.department}</p>
    `;
    })