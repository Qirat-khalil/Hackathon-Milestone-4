var form1 = document.getElementById('resume-form');
var resumeDisplayElement1 = document.getElementById('resume-display');
var shareableLinkContainer1 = document.getElementById('shareable-link-container');
var shareableLinkElement1 = document.getElementById('shareable-link');
var downloadPdfButton1 = document.getElementById('download-pdf');
// Handle form submission
form1.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload
    // Collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var number = document.getElementById('number').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skill = document.getElementById('skill').value;
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        number: number,
        education: education,
        experience: experience,
        skill: skill,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    // Generate the resume content dynamically
    var resumeHTML = "\n        <h2>Editable Resume</h2>\n        <h3>Personal Information</h3>\n        <p><b>Name:</b> <span contenteditable=\"true\">".concat(name, "</span></p>\n        <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><b>Phone:</b> <span contenteditable=\"true\">").concat(number, "</span></p>\n        <h3>Education</h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n        <h3>Experience</h3>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n        <h3>Skills</h3>\n        <p contenteditable=\"true\">").concat(skill, "</p>\n    ");
    // Display the generated resume
    resumeDisplayElement1.innerHTML = resumeHTML;
    // Generate a shareable URL with the username
    var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer1.style.display = 'block';
    shareableLinkElement1.href = shareableURL;
    shareableLinkElement1.textContent = "Click here to view the resume";
});
// Handle PDF download
downloadPdfButton1.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('number').value = resumeData.number;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skill').value = resumeData.skill;
            // Optionally, you could also auto-generate the resume display on load
            var resumeHTML = "\n                <h2>Editable Resume</h2>\n                <h3>Personal Information</h3>\n                <p><b>Name:</b> <span contenteditable=\"true\">".concat(resumeData.name, "</span></p>\n                <p><b>Email:</b> <span contenteditable=\"true\">").concat(resumeData.email, "</span></p>\n                <p><b>Phone:</b> <span contenteditable=\"true\">").concat(resumeData.number, "</span></p>\n                <h3>Education</h3>\n                <p contenteditable=\"true\">").concat(resumeData.education, "</p>\n                <h3>Experience</h3>\n                <p contenteditable=\"true\">").concat(resumeData.experience, "</p>\n                <h3>Skills</h3>\n                <p contenteditable=\"true\">").concat(resumeData.skill, "</p>\n            ");
            // Display the generated resume
            resumeDisplayElement1.innerHTML = resumeHTML;
        }
    }
});
