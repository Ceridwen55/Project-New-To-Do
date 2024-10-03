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
const signature = document.createElement("div");
signature.textContent = "a prototype project by  ";
const namaewa = document.createElement("div");
namaewa.textContent = "Zulkan";
signature.appendChild(namaewa);
top.appendChild(signature);
top.style.width = "100%";
top.style.height = "40%";
top.style.display = "flex";
top.style.fontSize = "50px";
top.style.fontStyle = "oblique";
top.style.alignItems = "flex-start";
top.style.paddingLeft = "100px";
top.style.flexDirection = "column";
top.style.justifyContent = "center";
top.style.backgroundColor = "#D6EAF8";
top.style.textDecoration = "line-through";

signature.style.display = "flex";
signature.style.flexDirection = "row";
signature.style.gap = "10px";
signature.style.fontSize = "25px";
signature.style.marginLeft = "220px";
signature.style.textDecoration = "underLine overLine";
namaewa.style.fontWeight = "bold";
namaewa.style.border = "dashed";
namaewa.style.borderRadius = "10px";
namaewa.style.padding = "4px";

//BOTTOM

bottom.style.display = "flex";
bottom.style.width = "100%";
bottom.style.height = "60%";
bottom.style.borderTop = "groove 10px";


// LAYOUT STYLE
const home = document.getElementById("home");
home.style.display = "flex";
home.style.width = "100%";
home.style.height = "100vh";
home.style.flexDirection = "column";
home.appendChild(top);
home.appendChild(bottom);
home.style.fontFamily = "Lato";


// BOTTOM-RIGHT DIV
const bottomRight = document.getElementById("bottom-right");
bottomRight.style.display = "flex";
bottomRight.style.flexDirection = "column";
bottomRight.style.backgroundColor = "#FFFFE0"
bottomRight.style.width = "70%";
bottomRight.style.height = "auto";
bottomRight.style.borderLeft = "outset 10px";


// SPLIT BOTTOM RIGHT DIV
const topBottomRight = document.createElement("div");
bottomRight.appendChild(topBottomRight);

const botBottomRight = document.createElement("div");
bottomRight.appendChild(botBottomRight);

botBottomRight.style.height = "auto";
botBottomRight.style.overflowY = "auto";

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
addToDoButton.innerHTML = "TO-DO ++";
addToDoButton.style.fontSize = "17px";
addToDoButton.style.backgroundColor = "yellow";
addToDoButton.style.borderRadius = "10px";
addToDoButton.style.fontWeight ="bold";
addToDoButton.style.marginTop = "25px";
addToDoButton.style.marginLeft = "25px";
addToDoButton.style.boxShadow = "3px 1px 2px 10px yellow";
topBottomRight.appendChild(addToDoButton);


// Function to render the to-do list for the selected project
function renderToDoList(projectName) 
{
  botBottomRight.innerHTML = ''; 
  botBottomRight.appendChild(addToDoButton); 

  const projectToDos = projects[projectName] || [];

  projectToDos.forEach((toDo, index) => 
    {
    const block = document.createElement("div");
    block.innerHTML = `
      <h3 class="todo-name">${toDo.name}</h3>
      <p><strong>Due Date:</strong> ${toDo.date}</p>
      <p><strong>Urgency:</strong><span class="urgency-text"> ${toDo.urgency}</span></p>
      <p><strong>Description:</strong> ${toDo.description}</p>
      <input type="checkbox" class="completed-checkbox" id="checkbox-${index}">
      <button class="deltodo">DELETE</button>
    `;
    
    const urgencyElement = block.querySelector(".urgency-text");
    if (toDo.urgency === "high") 
    {
      urgencyElement.style.color = "green";
      urgencyElement.style.fontWeight = "bold";
    } 
    else if (toDo.urgency === "medium") 
    {
      urgencyElement.style.color = "#D6EAF8";
      urgencyElement.style.fontWeight = "bold";
    } 
    else if (toDo.urgency === "low") 
    {
      urgencyElement.style.color = "red";
      urgencyElement.style.fontWeight = "bold";
    }
    block.style.display = "flex";
    block.style.flexDirection = "row";
    block.style.alignItems = "center";
    block.style.gap = "20px";
    block.style.marginLeft = "25px";

    const toDoNameElement = block.querySelector(".todo-name");
    const checkbox = block.querySelector(`#checkbox-${index}`);
    checkbox.addEventListener("change", function()
    {
      if (checkbox.checked)
      {
        block.style.textDecoration = "line-through";
      }
      else
      {
        block.style.textDecoration = "none";
      }
    });

    const todoContainer = document.createElement("div");
    todoContainer.appendChild(block);
    botBottomRight.appendChild(todoContainer);

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
addToDoButton.addEventListener("click", function() 
{
  if (document.getElementById("todo-form")) return;
  const formDiv = document.createElement("div");
  formDiv.id = "todo-form";
  formDiv.style.width = "100%";
  formDiv.style.marginTop = "10px";
  
  const form = document.createElement("form");
  form.style.display = "flex";
  form.style.gap = "10px";

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
    if(level == 'Low')
    {
      option.style.backgroundColor = "red";
      
    }
    else if (level == 'Medium')
    {
      option.style.backgroundColor = "#D6EAF8";
    }
    else if (level == 'High')
    {
      option.style.backgroundColor = "green";
    }
    option.value = level.toLowerCase();
    option.textContent = level;
    
    urgencySelect.appendChild(option);

    urgencySelect.addEventListener('change', function() 
    {
      if (this.value === 'low') 
      {
          this.style.backgroundColor = 'red';
          this.style.fontWeight = "bold";
      } 
      else if (this.value === 'medium') 
      {
          this.style.backgroundColor = '#D6EAF8';
          this.style.fontWeight = "bold";
      } 
      else if (this.value === 'high') 
      {
          this.style.backgroundColor = 'green';
          this.style.fontWeight = "bold";
      }
    });


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
  
  formDiv.style.display = "flex";
  formDiv.style.fontWeight = "bold";
  form.style.marginLeft = "25px";
  form.style.display = "flex";
  form.style.flexDirection = "column";
  

  // Add the form to the bottom-right div
  botBottomRight.appendChild(formDiv);
});

// BOTTOM LEFT (PROJECTS DIV)
const bottomLeft = document.getElementById("bottom-left");
bottomLeft.style.display = "flex";
bottomLeft.style.flexDirection = "column";
bottomLeft.style.alignItems = "center";
bottomLeft.style.width = "30%";
bottomLeft.style.height = "auto";
bottomLeft.style.overflowY = "auto";
bottomLeft.style.gap = "10px";
bottomLeft.style.backgroundColor = "#E6F4EA";



// 'Add Project' button
const addProjectButton = document.createElement("button");
addProjectButton.textContent = "PROJECT +";
addProjectButton.style.fontSize = "16px";
addProjectButton.style.fontStyle = "oblique";
addProjectButton.style.fontWeight = "bold";
addProjectButton.style.borderRadius = "50px";
addProjectButton.style.marginTop = "25px";
addProjectButton.style.backgroundColor = "#90EE90";
addProjectButton.style.boxShadow = "2px 4px 2px 10px #90EE90";
bottomLeft.appendChild(addProjectButton);

addProjectButton.addEventListener("click", function() 
{
  if (document.getElementById("project-list")) return;
  const formDiv = document.createElement("div");
  formDiv.id = "project-list";
  const form = document.createElement("form");
  form.style.display = "flex";
  form.style.gap = "5px";

  const projectLabel = document.createElement("label");
  projectLabel.textContent = "Project Name: ";
  const projectInput = document.createElement("input");
  projectInput.setAttribute('type', 'text');

  const submitProjectButton = document.createElement("button");
  submitProjectButton.textContent = "Submit";
  submitProjectButton.addEventListener("click", function(e) 
  {
    e.preventDefault();
    const projectName = projectInput.value.trim();

    if (projectName && !projects[projectName]) 
    {
      projects[projectName] = [];
      localStorage.setItem('projects', JSON.stringify(projects));

      const projectButton = document.createElement("button");
      projectButton.textContent = projectName;
      projectButton.classList.add('project-button');
      projectButton.style.fontSize = "16px";
      projectButton.style.borderStyle = "dotted";
      projectButton.style.fontWeight = "bold";

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


    if (!projectName) 
    {
    alert("Project name cannot be empty!");
    return;
    }

  });

  const cancel = document.createElement("button");
  cancel.textContent = "Cancel";
  cancel.addEventListener("click", function()
  {
    formDiv.remove();
  });

  form.appendChild(projectLabel);
  form.appendChild(projectInput);
  form.appendChild(submitProjectButton);
  form.appendChild(cancel);
  formDiv.appendChild(form);
  bottomLeft.appendChild(formDiv);
});

















