function AddRowSurvey(fullname, major, favorite_fpl, prefer_foip)
{
    const rowClasses = 'table-row';

    const surveyTable = document.getElementById('surveytable');

    const newRow = surveyTable.insertRow(-1);
    newRow.classList.add(...rowClasses.split(' '));

    AddCellSurvey(newRow, 0, fullname.value);
    AddCellSurvey(newRow, 1, major.value);
    AddCellSurvey(newRow, 2, favorite_fpl.value);
    AddCellSurvey(newRow, 3, prefer_foip.value);
}

function AddCellSurvey(row, index, text)
{
    let cellClasses = "table-cell text-left px-2 py-1 border border-gray-300";

    const newCell = row.insertCell(index);
    newCell.classList.add(...cellClasses.split(' '));

    const newNode = document.createTextNode(text);
    newCell.appendChild(newNode);
}

async function ValidateForm(event)
{
    event.preventDefault();

    const { fullname, email, major, favorite_fpl, prefer_foip } = event.target;

    const error = document.getElementById('errorMSG');

    // client fullname validation
    if (fullname.value.length > 20 || fullname.value.length < 5)
    {
        error.innerHTML = 'incorrect name format! expected character count 5-20';
        error.classList.add('text-pink-800');
        error.classList.remove('hidden');
        return;
    }

    // client email validation
    if (!email.value.includes('@'))
    {
        error.innerHTML = 'incorrect email format! must contain the character @';
        error.classList.add('text-pink-800');
        error.classList.remove('hidden');
        return;
    }

    // client major validation
    if (major.options[major.selectedIndex].disabled)
    {
        errorMSG.innerHTML = 'please choose a major';
        error.classList.add('text-pink-800');
        errorMSG.classList.remove('hidden');
        return;
    }

    // client prefer functional or imperative programming validation
    if (prefer_foip.options[prefer_foip.selectedIndex].disabled)
    {
        error.innerHTML = 'please select your preferred functional or imperative programming';
        error.classList.add('text-pink-800');
        error.classList.remove('hidden');
        return;
    }

    // client favorite functional programming language
    if (favorite_fpl.value.length < 1 || favorite_fpl.value.length > 20)
    {
        error.innerHTML = 'please enter a favorite functional programming language under 20 characters';
        error.classList.add('text-pink-800');
        error.classList.remove('hidden');
        return;
    }

    await fetch('/', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fullname: fullname.value,
            major: major.value,
            prefer_foip: prefer_foip.value,
            favorite_fpl: favorite_fpl.value,
        }),
    }).then((response) => {
        if(response.ok)
        {
            return;
        }
        else 
        {
            throw new Error("Sorry Thats On Us Try Again In A Few Minutes - Server Error 500");
        }
    }).then((data) => {

        error.innerHTML = 'Successfully Submitted!';
        error.classList.remove('hidden', 'text-pink-800');
        error.classList.add('text-green-700');
        AddRowSurvey(fullname, major, favorite_fpl, prefer_foip);
        event.target.reset();

    }).catch((reason) => {
        error.innerHTML = reason.message;
        error.classList.add('text-pink-800');
        error.classList.remove('hidden');
    });
}

function On_ooexperience_Clicked(event)
{
    const radioClicked = event.target;
    const oochoiceContainer = document.getElementById('oochoice-container');
    const { oochoice } = document.forms['surveyform'];
    const ulovmYes = document.getElementById("ulovm-yes");
    const ulovmNo = document.getElementById("ulovm-no");

    if (radioClicked.value === "yes")
    {
        oochoiceContainer.classList.remove("hidden");
    }
    else
    {
        // enable the ability to choose these radios when 
        ulovmYes.disabled = false;
        ulovmNo.disabled = false;

        // reset choices to none selected
        oochoice.options[0].selected = true;  

        oochoiceContainer.classList.add("hidden");
    }
}

function AutoPopulateVM()
{
    const ulovmYes = document.getElementById("ulovm-yes");
    const ulovmNo = document.getElementById("ulovm-no");
    const { oochoice } = document.forms['surveyform'];

    const value = oochoice.value;

    if (value === "Java" || value === "C#")
    {
        // Check The Yes Since 
        ulovmYes.checked = true;

        // 
        ulovmYes.disabled = true;
        ulovmNo.disabled = true;
    }
    else 
    {
        ulovmYes.disabled = false;
        ulovmNo.disabled = false;
    }
}

const { oochoice } = document.forms['surveyform'];
oochoice.addEventListener("change", AutoPopulateVM);