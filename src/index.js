// SPECIFICATIONS TO-DO LIST DEFAULT PAGE

// 1. There will be 3 big div, top, bottom left, and bottom right
    // A. TOP DIV
        //a. Title
    
    // B. BOTTOM-LEFT
        //a. UI for adding project
            // - It shows project name and a '+' icon
            // - When '+' icon is clicked, it pops out another UI contains [Project Name, Due Date with Calendar UI inside it, Urgency Level, Delete Project]
                // - This UI is a form that retrieve the data being submitted and create another new project (in another .js file dynamically)
            // - When Project name is clicked, it will show up the UI like '+' icon but it's editing the present BOTTOM-RIGHT DIV data/page 
            // - After each project created using the '+' icon, the BOTTOM-LEFT DIV keeps being updated dynamically with the said project name
            // - Maximum project that can be created limited to the 100% size of the single page ( you can't scroll down the page)
        //b. Style the div and it's items


    // C. BOTTOM-RIGHT
        //a. Create space where it contains the to do list block unique per project 
            // - there is a '+' icon to add a block for to do list
                // - It shows an UI to add new to do including [ To-do name, Due Date, Urgency, description]
                // - after the block added, the block includes project name, urgency, and checklist and can be edited


// TOP DIV
const top = document.getElementById("top");
top.textContent = "TO DO LIST";

// BOTTOM-RIGHT DIV
const bottomRight = document.getElementById("bottom-right");

// Create an object constructor for the to-do items and an array to store them
function ToDo(name, date, urgency, description) 
{
  this.name = name;
  this.date = date;
  this.urgency = urgency;
  this.description = description;
}

const projects = JSON.parse(localStorage.getItem('projects')) || {};

// Create an 'Add To Do' button for the bottom-right div
const addToDoButton = document.createElement("button");
addToDoButton.innerHTML = "ADD TO DO";
bottomRight.appendChild(addToDoButton);

// Function to render the to-do list for the selected project
function renderToDoList(projectName) 
{
  bottomRight.innerHTML = ''; 
  bottomRight.appendChild(addToDoButton); 

  const projectToDos = projects[projectName] || [];

  projectToDos.forEach((toDo, index) => 
    {
    const block = document.createElement("div");
    block.innerHTML = `
      <h3>${toDo.name}</h3>
      <p><strong>Due Date:</strong> ${toDo.date}</p>
      <p><strong>Urgency:</strong> ${toDo.urgency}</p>
      <p><strong>Description:</strong> ${toDo.description}</p>
      <input type="checkbox" id="completed-checkbox">
      <button class="deltodo">DELETE</button>
    `;

    block.style.display = "flex";
    block.style.flexDirection = "row";
    block.style.alignItems = "center";
    block.style.gap = "20px";
    bottomRight.appendChild(block);

    // Delete button functionality
    block.querySelector(".deltodo").addEventListener("click", function() 
    {
      projectToDos.splice(index, 1);
      localStorage.setItem('projects', JSON.stringify(projects)); 
      renderToDoList(projectName); 
    });
  });
}

// Create the UI for adding a new to-do
addToDoButton.addEventListener("click", function() {
  const formDiv = document.createElement("div");
  const form = document.createElement("form");

  // Create name label and input
  const nameLabel = document.createElement("label");
  nameLabel.textContent = 'Name: ';
  const nameInput = document.createElement("input");
  nameInput.setAttribute('type', 'text');

  // Create urgency label and select dropdown
  const urgencyLabel = document.createElement("label");
  urgencyLabel.textContent = 'Urgency: ';
  const urgencySelect = document.createElement("select");
  ['Low', 'Medium', 'High'].forEach(level => 
    {
    const option = document.createElement('option');
    option.value = level.toLowerCase();
    option.textContent = level;
    urgencySelect.appendChild(option);
    });

  // Create date label and input
  const dateLabel = document.createElement("label");
  dateLabel.textContent = "Due Date: ";
  const dateInput = document.createElement("input");
  dateInput.setAttribute('type', 'date');

  // Create description label and input
  const descLabel = document.createElement("label");
  descLabel.textContent = "Description: ";
  const descInput = document.createElement("input");
  descInput.setAttribute('type', 'text');

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.addEventListener("click", function(e) 
  {
    e.preventDefault();

    // Get selected project name
    const selectedProjectElement = document.querySelector('.selected-project');
    if (!selectedProjectElement) {
      alert('Please select a project before adding a to-do.');
      return;
    }

    const currentProject = selectedProjectElement.textContent;
    const newToDo = new ToDo(nameInput.value, dateInput.value, urgencySelect.value, descInput.value);

    if (!projects[currentProject]) {
      projects[currentProject] = [];
    }
    projects[currentProject].push(newToDo);
    localStorage.setItem('projects', JSON.stringify(projects)); // Save to localStorage

    renderToDoList(currentProject); // Render the new list
    formDiv.remove(); // Remove the form after submission
  });

  // Append everything to the form
  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(urgencyLabel);
  form.appendChild(urgencySelect);
  form.appendChild(dateLabel);
  form.appendChild(dateInput);
  form.appendChild(descLabel);
  form.appendChild(descInput);
  form.appendChild(submitButton);
  formDiv.appendChild(form);

  // Add the form to the bottom-right div
  bottomRight.appendChild(formDiv);
});

// BOTTOM LEFT (PROJECTS DIV)
const bottomLeft = document.getElementById("bottom-left");

// 'Add Project' button
const addProjectButton = document.createElement("button");
addProjectButton.textContent = "ADD PROJECT";
bottomLeft.appendChild(addProjectButton);

addProjectButton.addEventListener("click", function() {
  const formDiv = document.createElement("div");
  const form = document.createElement("form");

  const projectLabel = document.createElement("label");
  projectLabel.textContent = "Project Name: ";
  const projectInput = document.createElement("input");
  projectInput.setAttribute('type', 'text');

  const submitProjectButton = document.createElement("button");
  submitProjectButton.textContent = "Submit";
  submitProjectButton.addEventListener("click", function(e) {
    e.preventDefault();
    const projectName = projectInput.value.trim();

    if (projectName && !projects[projectName]) 
    {
      projects[projectName] = [];
      localStorage.setItem('projects', JSON.stringify(projects));

      const projectButton = document.createElement("button");
      projectButton.textContent = projectName;
      projectButton.classList.add('project-button');

      // When a project is clicked, it shows its to-dos
      projectButton.addEventListener("click", function()
       {
        document.querySelectorAll('.project-button').forEach(btn => btn.classList.remove('selected-project'));
        projectButton.classList.add('selected-project');
        renderToDoList(projectName);
        });

      bottomLeft.appendChild(projectButton);
      formDiv.remove(); // Remove form after submission
    }
  });

  form.appendChild(projectLabel);
  form.appendChild(projectInput);
  form.appendChild(submitProjectButton);
  formDiv.appendChild(form);
  bottomLeft.appendChild(formDiv);
});
