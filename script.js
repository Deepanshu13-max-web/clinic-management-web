// Local storage keys
const PATIENTS_KEY = "patients";
const APPOINTMENTS_KEY = "appointments";

// Initialize local storage if empty
if (!localStorage.getItem(PATIENTS_KEY)) {
    localStorage.setItem(PATIENTS_KEY, JSON.stringify([]));
}
if (!localStorage.getItem(APPOINTMENTS_KEY)) {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify([]));
}

// Show/hide sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Register Patient
document.getElementById('patientForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const contact = document.getElementById('contact').value;

    const patient = {
        id: Date.now(), // Unique ID
        name,
        age,
        gender,
        contact
    };

    const patients = JSON.parse(localStorage.getItem(PATIENTS_KEY));
    patients.push(patient);
    localStorage.setItem(PATIENTS_KEY, JSON.stringify(patients));

    alert('Patient registered successfully!');
    this.reset();
});

// Schedule Appointment
document.getElementById('appointmentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const patientId = document.getElementById('patientId').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const description = document.getElementById('description').value;

    const appointment = {
        patientId,
        date,
        time,
        description
    };

    const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY));
    appointments.push(appointment);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));

    alert('Appointment scheduled successfully!');
    this.reset();
});

// View Patients
function loadPatients() {
    const patients = JSON.parse(localStorage.getItem(PATIENTS_KEY));
    const tbody = document.querySelector('#patientsTable tbody');
    tbody.innerHTML = '';

    patients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.gender}</td>
            <td>${patient.contact}</td>
        `;
        tbody.appendChild(row);
    });
}

// View Appointments
function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem(APPOINTMENTS_KEY));
    const tbody = document.querySelector('#appointmentsTable tbody');
    tbody.innerHTML = '';

    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.patientId}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>${appointment.description}</td>
        `;
        tbody.appendChild(row);
    });
}

// Event listeners for viewing data
document.querySelector('button[onclick="showSection(\'view-patients\')"]').addEventListener('click', loadPatients);
document.querySelector('button[onclick="showSection(\'view-appointments\')"]').addEventListener('click', loadAppointments);