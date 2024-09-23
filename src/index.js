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
                // - It shows an UI to add new to do including [ To-do name, Due Date, Urgency, description, notes, checklist]
                // - after the block added, the block includes project name, urgency, and checklist and can be edited


// TOP DIV

const top = document.getElementById("top");
top.textContent = "TO DO LIST";






// BOTTOM RIGHT
const bottomRight = document.getElementById("bottom-right");

// Create Object constructor to make the to do 
function toDo (name, date, urgency, description, notes)
{
    this.name = name;
    this.date = date;
    this.urgency = urgency;
    this.desciption = description;
    this.notes = notes;
}

// Create add button
const addToDo = document.createElement("button");
addToDo.innerHTML = "ADD TO DO";
bottomRight.appendChild(addToDo);

// Create UI that shows after click the button
addToDo.addEventListener("click", function()
{   
    // create form and a div to hold the form
    const tempDiv = document.createElement("div");
    const tempForm = document.createElement("form");

    // create name label and input
    const nameLabel = document.createElement("label");
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Name : ';

    const nameInput = document.createElement("input");
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('name','name');

    // create urgency label and input
    const urgencyLabel = document.createElement("label");
    urgencyLabel.setAttribute('for', 'urgency');
    urgencyLabel.textContent = 'Urgency : ';
    const urgencyInput = document.createElement("select");
    urgencyInput.setAttribute('id', 'urgency');
    urgencyInput.setAttribute('name', 'urgency');

    const option1 = document.createElement('option');
    option1.setAttribute('value', 'low');
    option1.textContent = 'Low';

    const option2 = document.createElement('option');
    option2.setAttribute('value', 'mid');
    option2.textContent = 'Medium';

    const option3 = document.createElement('option');
    option3.setAttribute('value', 'High');
    option3.textContent = 'High';

    // create date label and input using date-fns
    const dateLabel = document.createElement("label");
    dateLabel.setAttribute('for', 'date');
    dateLabel.textContent = "Due Date : ";

    const dateInput = document.createElement("input");
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('id','date');
    dateInput.setAttribute('name', 'date');

    // create description label and input
    const descLabel = document.createElement("label");
    descLabel.setAttribute('for','description');
    descLabel.textContent = "Description : "

    const descInput = document.createElement("input");
    descInput.setAttribute('type', 'text');
    descInput.setAttribute('id', 'description');
    descInput.setAttribute('name','description');

    // create submit button and it's function
    const submitBut = document.createElement("button");
    submitBut.setAttribute('type','submit');
    submitBut.textContent = "SUBMIT LIST";

    submitBut.addEventListener("click",function()
    {   
        
        tempDiv.innerHTML ='';
    });

    tempForm.appendChild(nameLabel);
    tempForm.appendChild(nameInput);
    tempForm.appendChild(urgencyLabel);
    tempForm.appendChild(urgencyInput);
    urgencyInput.appendChild(option1);
    urgencyInput.appendChild(option2);
    urgencyInput.appendChild(option3);
    tempForm.appendChild(dateLabel);
    tempForm.appendChild(dateInput);
    tempForm.appendChild(descLabel);
    tempForm.appendChild(descInput);
    tempForm.appendChild(submitBut);

    tempDiv.appendChild(tempForm);
    bottomRight.appendChild(tempDiv);

})