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






// BOTTOM RIGHT
const bottomRight = document.getElementById("bottom-right");

// Create Object constructor to make the to do 
function toDo (name, date, urgency, description)
{
    this.name = name;
    this.date = date;
    this.urgency = urgency;
    this.description = description;
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
    
    // create submit function to create a block
    submitBut.addEventListener("click",function()
    {   
        
        tempDiv.innerHTML ='';
        const result = new toDo(nameInput.value, dateInput.value, urgencyInput.value, descInput.value);
        const block = document.createElement("div");
        
        block.innerHTML =
            `<h3>${result.name}</h3>
            <p><strong>Due Date:</strong> ${result.date}</p>
            <p><strong>Urgency:</strong> ${result.urgency}</p>
            <p><strong>Description:</strong> ${result.description}</p>
            <input type="checkbox" id="completed-checkbox">
            <button class="deltodo">DELETE</button>
            
            `;
            
        setTimeout(function() {
        const deleteButtons = document.getElementsByClassName("deltodo");
                
        
        for (let i = 0; i < deleteButtons.length; i++) 
            {
                deleteButtons[i].addEventListener("click", function() 
                {
                    block.innerHTML = '';  
                });
            }
              }, 0);

        block.style.display = "flex";
        block.style.flexDirection = "row";
        block.style.alignItems = "center";
        block.style.gap = "20px";
        bottomRight.appendChild(block);
    });
    // append the element to div to display them
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



// BOTTOM LEFT ( PROJECT )

const bottomLeft = document.getElementById("bottom-left");

// Create a button to add project and a div/input to display project name

const butAddProject = document.createElement("button");
butAddProject.addEventListener("click",function()
{   
    const tempProDiv = document.createElement("div");
    const tempProForm = document.createElement("form");

    const projectLabel = document.createElement("label");
    projectLabel.setAttribute('for','prolabel');
    projectLabel.textContent = "PROJECT NAME";
    
    const projectInput = document.createElement("input");
    projectInput.setAttribute('type','text');
    projectInput.setAttribute('id','proname');
    projectInput.setAttribute('name', 'proname');

    tempProForm.appendChild(projectLabel);
    tempProForm.appendChild(projectInput);
    tempProForm.appendChild(proSub);

    tempProDiv.appendChild(tempProForm);
    bottomLeft.appendChild(tempProDiv);

    // create submit button for after adding project
    const proSub = document.createElement("button");
    proSub.textContent = "ADD PROJECT";

    // create a function after clicking submit in add project
    proSub.addEventListener("click",function()
    {
        tempProDiv.innerHTML = '';
        const proBlock = document.createElement("button");
        proBlock.textContent = projectInput.value;

        proBlock.addEventListener("click", function()
        {

        }
        );



    }
    );


    

})
