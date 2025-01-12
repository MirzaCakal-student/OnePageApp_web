let appointmentData = [];

function terminSubmitForm() {
    const trainer = document.getElementById("termin-trainer").value;
    const time = document.getElementById("termin-time").value;
    const date = document.getElementById("termin-date").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const username = document.getElementById("termin-username").value;

    if (trainer && time && date && gender && username) {
        const confirmationModal = new bootstrap.Modal(document.getElementById('termin-confirmationModal'));
        confirmationModal.show();
    } else {
        const errorModal = new bootstrap.Modal(document.getElementById('termin-errorModal'));
        errorModal.show();
    }
}

function renderAppointmentsTable() {
    const tableBody = document.getElementById("termin-userTable");
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
    }
}

function handleDelete(event) {
    const index = event.target.getAttribute("data-index");
    if (confirm("Are you sure you want to delete this appointment?")) {
        appointmentData.splice(index, 1);
        renderAppointmentsTable();
    }
}
