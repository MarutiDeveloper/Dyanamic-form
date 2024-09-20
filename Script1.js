document.getElementById('addFieldBtn').addEventListener('click', function() {
    const fieldContainer = document.getElementById('fieldContainer');
    const div = document.createElement('div');
    div.className = 'dynamic-field';

    // Create a wrapper to align input and dropdown on one line
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';

    // Add Text Input
    const textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.placeholder = 'Enter text';
    inputWrapper.appendChild(textInput);

    // Add Dropdown
    const dropdown = document.createElement('select');
    const options = [
        { value: 'text', text: 'Text' },
        { value: 'textarea', text: 'Textarea' },
        { value: 'radio', text: 'Radio Button' },
        { value: 'checkbox', text: 'Checkbox' }
    ];

    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        dropdown.appendChild(option);
    });

    inputWrapper.appendChild(dropdown);
    div.appendChild(inputWrapper);

    // Container for dynamic elements
    const dynamicContainer = document.createElement('div');
    dynamicContainer.className = 'dynamic-container';
    div.appendChild(dynamicContainer);

    dropdown.addEventListener('change', function() {
        dynamicContainer.innerHTML = ''; // Clear previous elements

        const selectedValue = dropdown.value;

        if (selectedValue === 'textarea') {
            const textarea = document.createElement('textarea');
            textarea.placeholder = 'Enter additional information here';
            dynamicContainer.appendChild(textarea);
        } else if (selectedValue === 'radio') {
            const radioTitleLabel = document.createElement('label');
            radioTitleLabel.innerText = 'Enter Radio Button Titles (comma separated): ';
            dynamicContainer.appendChild(radioTitleLabel);

            const radioTitleInput = document.createElement('input');
            radioTitleInput.type = 'text';
            radioTitleInput.placeholder = 'e.g., Male, Female';
            radioTitleInput.style.width = '300px'; // Set width
            radioTitleInput.style.height = '40px'; // Set height
            radioTitleInput.style.marginTop = '10px'; // Set top margin (optional)
            radioTitleInput.style.marginBottom = '10px'; // Set bottom margin (optional)
            radioTitleInput.style.padding = '5px'; // Optional padding
            radioTitleInput.style.border = '1px solid #ddd'; // Optional border
            radioTitleInput.style.borderRadius = '4px'; // Optional rounded corners
            radioTitleInput.style.fontSize = '16px'; // Optional font size
            
            dynamicContainer.appendChild(radioTitleInput);

            radioTitleInput.type = 'text';
            radioTitleInput.placeholder = 'e.g., Male, Female';
            radioTitleInput.className = 'radio-title-input'; // Apply the CSS class
            dynamicContainer.appendChild(radioTitleInput);

            const generateButton = document.createElement('button');
            generateButton.innerText = 'Generate Radio Buttons';
            generateButton.style.width = '200px'; // Set width
            generateButton.style.height = '40px'; // Set height
            generateButton.style.marginTop = '10px'; // Set top margin
            generateButton.style.marginBottom = '10px'; // Set bottom margin
            generateButton.style.marginLeft = '7'; // Set left margin (optional)
            generateButton.style.marginRight = '7'; // Set right margin (optional)
            generateButton.style.padding = '10px'; // Optional padding for better appearance
            generateButton.style.border = '1px solid #ddd'; // Optional border
            generateButton.style.borderRadius = '4px'; // Optional rounded corners
            generateButton.style.backgroundColor = '#4CAF50'; // Optional background color
            generateButton.style.color = '#fff'; // Optional text color
            generateButton.style.cursor = 'pointer'; // Optional cursor style
            
            dynamicContainer.appendChild(generateButton);

            generateButton.innerText = 'Generate Radio Buttons';
            generateButton.className = 'generate-button'; // Apply the CSS class
            dynamicContainer.appendChild(generateButton);
            
                generateButton.addEventListener('click', function() {
                const titles = radioTitleInput.value.split(',').map(title => title.trim());
                dynamicContainer.innerHTML = ''; // Clear input field and button

                titles.forEach(title => {
                    const radioWrapper = document.createElement('span');
                    radioWrapper.className = 'radio-wrapper';

                    const radioLabel = document.createElement('label');
                    const radioButton = document.createElement('input');
                    radioButton.type = 'radio';
                    radioButton.name = 'dynamicRadio';
                    radioLabel.appendChild(radioButton);
                    radioLabel.appendChild(document.createTextNode(' ' + title));

                    radioWrapper.appendChild(radioLabel);
                    dynamicContainer.appendChild(radioWrapper);
                });
            });
        } else if (selectedValue === 'checkbox') {
            const checkboxContainer = document.createElement('div');
            checkboxContainer.className = 'checkbox-container';

            const checkboxNames = ['Required', 'Record', 'Active'];
            checkboxNames.forEach(name => {
                const checkboxLabel = document.createElement('label');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkboxLabel.appendChild(checkbox);
                checkboxLabel.appendChild(document.createTextNode(name));
                checkboxContainer.appendChild(checkboxLabel);
            });

            dynamicContainer.appendChild(checkboxContainer);
        }
    });

    // Create a wrapper for checkboxes and cancel button
    const checkboxCancelWrapper = document.createElement('div');
    checkboxCancelWrapper.className = 'checkbox-cancel-wrapper';

    // Add Checkboxes
    const checkboxNames = ['Required', 'Record', 'Active'];
    checkboxNames.forEach(name => {
        const checkboxLabel = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(document.createTextNode(name));
        checkboxCancelWrapper.appendChild(checkboxLabel);
    });

    // Add Cancel Button
    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.className = 'cancel-button';
    cancelButton.addEventListener('click', function() {
        div.remove(); // Remove the field when cancel button is clicked
    });
    checkboxCancelWrapper.appendChild(cancelButton);

    div.appendChild(checkboxCancelWrapper);

    // Append the dynamic field to the container
    fieldContainer.appendChild(div);
});
document.getElementById('create-btn').addEventListener('click', function() {
    // Select the container where the dynamic fields are located
    const fieldsContainer = document.querySelector('.fields-container');
    const dynamicFields = fieldsContainer.querySelectorAll('input, select');
    
    // Create a container for the generated fields
    const generatedFieldsContainer = document.getElementById('generated-fields');
    generatedFieldsContainer.innerHTML = ''; // Clear previous fields

    dynamicFields.forEach(field => {
        // Create a new div for each field
        const newField = document.createElement('div');
        newField.classList.add('new-field');

        // Check if the field is a text input or dropdown
        if (field.tagName === 'INPUT') {
            const inputClone = document.createElement('input');
            inputClone.type = field.type;
            inputClone.placeholder = field.placeholder;
            inputClone.value = field.value; // Copy the value from the original field
            newField.appendChild(inputClone);
        } else if (field.tagName === 'SELECT') {
            const selectClone = document.createElement('select');
            Array.from(field.options).forEach(option => {
                const optionClone = document.createElement('option');
                optionClone.value = option.value;
                optionClone.text = option.text;
                selectClone.appendChild(optionClone);
            });
            selectClone.value = field.value; // Copy the selected option
            newField.appendChild(selectClone);
        }

        // Append the new field to the container
        generatedFieldsContainer.appendChild(newField);
    });

    window.location.href = "Homepage.html";
});
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get('firstName');
    const lastName = urlParams.get('lastName');
    const email = urlParams.get('email');
    const mobile = urlParams.get('mobile');
    const zip = urlParams.get('zip');
};
// how to create dropdown button parrele with text area 
document.getElementById('addFieldBtn').addEventListener('click', function() {
    const fieldContainer = document.getElementById('fieldContainer');
    const div = document.createElement('div');
    div.className = 'dynamic-field';

    // Create a wrapper to align textarea and dropdown on one line
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'input-wrapper';

    // Add Textarea
    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Enter text';
    textarea.rows = 3; // Adjust number of rows if necessary
    inputWrapper.appendChild(textarea);

    // Add Dropdown
    const dropdown = document.createElement('select');
    const options = [
        { value: 'text', text: 'Text' },
        { value: 'textarea', text: 'Textarea' },
        { value: 'radio', text: 'Radio Button' },
        { value: 'dropdown', text: 'Dropdown' },
        { value: 'checkbox', text: 'Checkbox' }
    ];

    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        dropdown.appendChild(option);
    });

    inputWrapper.appendChild(dropdown);
    div.appendChild(inputWrapper);

    // Container for dynamic elements
    const dynamicContainer = document.createElement('div');
    dynamicContainer.className = 'dynamic-container';
    div.appendChild(dynamicContainer);

    dropdown.addEventListener('change', function() {
        dynamicContainer.innerHTML = ''; // Clear previous elements

        const selectedValue = dropdown.value;

        if (selectedValue === 'textarea') {
            const newTextarea = document.createElement('textarea');
            newTextarea.placeholder = 'Enter additional information here';
            dynamicContainer.appendChild(newTextarea);
        }
        // Handle other dynamic field types like radio, checkbox...
    });

    // Add Cancel Button
    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancel';
    cancelButton.className = 'cancel-button';
    cancelButton.addEventListener('click', function() {
        div.remove(); // Remove the field when cancel button is clicked
    });
    div.appendChild(cancelButton);

    // Append the dynamic field to the container
    fieldContainer.appendChild(div);
});
