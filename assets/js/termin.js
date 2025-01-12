const themeSwitch = document.getElementById("themeSwitch");
        const body = document.body;
        const modeLabel = document.getElementById("modeLabel");

        themeSwitch.addEventListener("change", function() {
            if (themeSwitch.checked) {
                body.classList.remove("dark");
                body.classList.add("light");
                modeLabel.textContent = "Light Mode"; 
            } else {
                body.classList.remove("light");
                body.classList.add("dark");
                modeLabel.textContent = "Dark Mode"; 
            }
        });

        
        if (!themeSwitch.checked) {
            modeLabel.textContent = 'Dark Mode'; 
        }

        function submitForm() {
            const trainer = document.getElementById("trainer").value;
            const time = document.getElementById("time").value;
            const date = document.getElementById("date").value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const username = document.getElementById("username").value;

            if (trainer && time && date && gender && username) {
                const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
                confirmationModal.show();
            } else {
                const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
                errorModal.show();
            }
        }


        let appointmentData = []; 


function fetchData() {
    fetch('data.json')
        .then(response => response.json())  
        .then(data => {
            appointmentData = data; 
            renderAppointmentsTable();  
        })
        .catch(error => console.error("Error fetching data:", error));  
}


function renderAppointmentsTable() {
    const tableBody = document.getElementById("userTable");
    tableBody.innerHTML = ""; 

    appointmentData.forEach((appointment, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${appointment.username}</td>
            <td>${appointment.trainer}</td>
            <td>${appointment.time}</td>
            <td>${appointment.date}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-btn" data-index="${index}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

 
    document.querySelectorAll(".edit-btn").forEach(button =>
        button.addEventListener("click", handleEdit)
    );
    document.querySelectorAll(".delete-btn").forEach(button =>
        button.addEventListener("click", handleDelete)
    );
}

function handleEdit(event) {
    const index = event.target.getAttribute("data-index");
    const appointment = appointmentData[index];

    const newUsername = prompt("Edit Username:", appointment.username);
    const newTrainer = prompt("Edit Trainer:", appointment.trainer);
    const newTime = prompt("Edit Time:", appointment.time);
    const newDate = prompt("Edit Date:", appointment.date);

    if (newUsername && newTrainer && newTime && newDate) {

        appointmentData[index] = { username: newUsername, trainer: newTrainer, time: newTime, date: newDate };
        renderAppointmentsTable(); 
        toastr.success("Appointment updated successfully!");
    } else {
        toastr.error("Edit canceled or invalid input.");
    }
}


function handleDelete(event) {
    const index = event.target.getAttribute("data-index");
    const confirmDelete = confirm("Are you sure you want to delete this appointment?");

    if (confirmDelete) {
       
        appointmentData.splice(index, 1);
        renderAppointmentsTable();  
        toastr.success("Appointment deleted successfully!");
    }
}


fetchData();