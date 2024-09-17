const form1 = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement1 = document.getElementById('resume-display') as HTMLDivElement;

const shareableLinkContainer1 = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement1 = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton1 = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle form submission
form1.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // prevent page reload

    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const number = (document.getElementById('number') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skill = (document.getElementById('skill') as HTMLTextAreaElement).value;

    // Save form data in localStorage with the username as the key
    const resumeData = {
        name,
        email,
        number,
        education,
        experience,
        skill,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

    // Generate the resume content dynamically
    const resumeHTML = `
        <h2>Editable Resume</h2>
        <h3>Personal Information</h3>
        <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
        <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
        <p><b>Phone:</b> <span contenteditable="true">${number}</span></p>
        <h3>Education</h3>
        <p contenteditable="true">${education}</p>
        <h3>Experience</h3>
        <p contenteditable="true">${experience}</p>
        <h3>Skills</h3>
        <p contenteditable="true">${skill}</p>
    `;

    // Display the generated resume
    resumeDisplayElement1.innerHTML = resumeHTML;

    // Generate a shareable URL with the username
    const shareableURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(username)}`;

    // Display the shareable link
    shareableLinkContainer1.style.display = 'block';
    shareableLinkElement1.href = shareableURL;
    shareableLinkElement1.textContent = "Click here to view the resume";
});

// Handle PDF download
downloadPdfButton1.addEventListener('click', () => {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('number') as HTMLInputElement).value = resumeData.number;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skill') as HTMLTextAreaElement).value = resumeData.skill;

            // Optionally, you could also auto-generate the resume display on load
            const resumeHTML = `
                <h2>Editable Resume</h2>
                <h3>Personal Information</h3>
                <p><b>Name:</b> <span contenteditable="true">${resumeData.name}</span></p>
                <p><b>Email:</b> <span contenteditable="true">${resumeData.email}</span></p>
                <p><b>Phone:</b> <span contenteditable="true">${resumeData.number}</span></p>
                <h3>Education</h3>
                <p contenteditable="true">${resumeData.education}</p>
                <h3>Experience</h3>
                <p contenteditable="true">${resumeData.experience}</p>
                <h3>Skills</h3>
                <p contenteditable="true">${resumeData.skill}</p>
            `;

            // Display the generated resume
            resumeDisplayElement1.innerHTML = resumeHTML;
        }
    }
});