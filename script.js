document.getElementById('clientInfo').addEventListener('change', function() {
    const selectedValue = this.value;
    const dynamicFields = document.getElementById('dynamicFields');
    
});
    



document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const clientInfo = document.getElementById('clientInfo').value;
    const clientName = document.getElementById('clientName')?.value || '';
    const clientEmail = document.getElementById('clientEmail')?.value || '';
    const businessName = document.getElementById('businessName')?.value || '';
    const businessType = document.getElementById('businessType')?.value || '';
    const otherInfo = document.getElementById('otherInfo')?.value || '';

    // Display the result
    let outputHTML = `<h3>Submitted Data:</h3>
                      <p><strong>Name:</strong> ${name}</p>
                      <p><strong>Title:</strong> ${title}</p>
                      <p><strong>Description:</strong> ${description}</p>
                      <p><strong>Client Info:</strong> ${clientInfo}</p>`;
    
    if (clientInfo === 'Client') {
        outputHTML += `<p><strong>Client Name:</strong> ${clientName}</p>
                       <p><strong>Client Email:</strong> ${clientEmail}</p>`;
    } else if (clientInfo === 'Business') {
        outputHTML += `<p><strong>Business Name:</strong> ${businessName}</p>
                       <p><strong>Business Type:</strong> ${businessType}</p>`;
    } else if (clientInfo === 'Other') {
        outputHTML += `<p><strong>Other Information:</strong> ${otherInfo}</p>`;
    }

    document.getElementById('output').innerHTML = outputHTML;

    // Clear the form
    document.getElementById('userForm').reset();
    document.getElementById('dynamicFields').innerHTML = ''; // Clear dynamic fields
});

// Function to handle adding predefined basic user fields
function addBasicUserField() {
    const fields = [
        { label: 'First Name', type: 'Text' },
        { label: 'Last Name', type: 'Text' },
        { label: 'Email', type: 'Email' },
        { label: 'Mobile Number', type: 'Number' },
        { label: 'Address', type: 'Text' },
        { label: 'Zip Code', type: 'Number' }
    ];

    const additionalFieldsDiv = document.getElementById('additionalFields');

    fields.forEach(field => {
        const newField = document.createElement('div');
        newField.classList.add('form-group');
        newField.draggable = true; // Make the field draggable
        newField.innerHTML = `
            <div class="input-box">
                <div class="row">
                    <div class="field-container">
                        <input type="text" placeholder="${field.label}" value="${field.label}">
                    </div>
                    <div class="field-container">
                        <select class="field-type-select">
                            <option value="${field.type}" selected>${field.type}</option>
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="email">Email</option>
                            <option value="date">Date</option>
                            <option value="checkbox">Checkbox List</option>
                            <option value="radio">Radio Button</option>
                            <option value="dropdown">Dropdown List</option>
                            <option value="yesno">Yes or No Option</option>
                        </select>
                    </div>
                </div>
                <div class="checkbox-row">
                    <div class="required-checkbox">
                        <input type="checkbox" id="isRequired" name="isRequired" checked>
                        <label for="isRequired">Required</label>
                    </div>
                    <div class="record-checkbox">
                        <input type="checkbox" id="record" name="record" checked>
                        <label for="record">Record</label>
                    </div>
                    <div class="action-checkbox">
                        <input type="checkbox" id="actionRequired" name="actionRequired" checked>
                        <label for="actionRequired">Action</label>
                    </div>
                </div>
                <span class="delete-field">×</span>
            </div>
        `;
        additionalFieldsDiv.appendChild(newField);

        // Add drag events
        newField.addEventListener('dragstart', handleDragStart);
        newField.addEventListener('dragover', handleDragOver);
        newField.addEventListener('drop', handleDrop);
        newField.addEventListener('dragleave', handleDragLeave);
    });

    // Disable the Add Basic User Field button
    const addButton = document.getElementById('addBasicUserField');
    addButton.disabled = true;
}

// Function to handle adding a new label field
function addField() {
    const newField = document.createElement('div');
    newField.classList.add('form-group');
    newField.draggable = true; // Make the field draggable
    newField.innerHTML = `
        <div class="input-box">
            <div class="row">
                <div class="field-container">
                    <input type="text" placeholder="Label" value="Label">
                </div>
                <div class="field-container">
                    <select class="field-type-select">
                        <option value="text">Text</option>
                        <option value="number">Number</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                        <option value="date">Date</option>
                        <option value="checkbox">Checkbox List</option>
                        <option value="radio">Radio Button</option>
                        <option value="dropdown">Dropdown List</option>
                        <option value="yesno">Yes or No</option>
                    </select>
                </div>
            </div>
            <div class="checkbox-row">
                <div class="required-checkbox">
                    <input type="checkbox" id="isRequired" name="isRequired" checked>
                    <label for="isRequired">Required</label>
                </div>
                <div class="record-checkbox">
                    <input type="checkbox" id="record" name="record" checked>
                    <label for="record">Record</label>
                </div>
                <div class="action-checkbox">
                    <input type="checkbox" id="actionRequired" name="actionRequired" checked>
                    <label for="actionRequired">Action</label>
                </div>
            </div>
            <span class="delete-field">×</span>
        </div>
    `;

    const additionalFieldsDiv = document.getElementById('additionalFields');
    const zipCodeField = additionalFieldsDiv.querySelector('div.form-group:last-of-type');
    if (zipCodeField) {
        zipCodeField.insertAdjacentElement('afterend', newField);
    } else {
        additionalFieldsDiv.appendChild(newField);
    }

    // Add drag events
    newField.addEventListener('dragstart', handleDragStart);
    newField.addEventListener('dragover', handleDragOver);
    newField.addEventListener('drop', handleDrop);
    newField.addEventListener('dragleave', handleDragLeave);
}

// Function to handle adding a new field to the "Other Fields" form
function addFieldToOtherForm() {
    const newField = document.createElement('div');
    newField.classList.add('form-group');
    newField.classList.add('input-box');
    newField.draggable = true; // Make the field draggable

    const row = document.createElement('div');
    row.classList.add('row');

    const labelField = document.createElement('div');
    labelField.classList.add('field-container');

    const label = document.createElement('label');
    label.textContent = "Label Field:";
    labelField.appendChild(label);

    const labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.placeholder = 'Label';
    labelInput.classList.add('label-input');
    labelField.appendChild(labelInput);

    const fieldTypeDropdown = document.createElement('div');
    fieldTypeDropdown.classList.add('field-container');

    const dropdown = document.createElement('select');
    dropdown.classList.add('field-type-dropdown');

    const options = [
        { value: 'text', text: 'Text' },
        { value: 'number', text: 'Number' },
        { value: 'email', text: 'Email' },
        { value: 'password', text: 'Password' },
        { value: 'date', text: 'Date' },
        { value: 'checkbox', text: 'Checkbox List' },
        { value: 'radio', text: 'Radio Button List' },
        { value: 'dropdown', text: 'Dropdown List' },
        { value: 'yesno', text: 'Yes or No' }
    ];

    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.text;
        dropdown.appendChild(opt);
    });

    fieldTypeDropdown.appendChild(dropdown);

    row.appendChild(labelField);
    row.appendChild(fieldTypeDropdown);

    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('checkbox-container');

    const checkboxNames = ['Required', 'Record', 'Action'];
    checkboxNames.forEach(name => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.id = name.toLowerCase();
        checkbox.name = name.toLowerCase();

        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', name.toLowerCase());
        checkboxLabel.textContent = name;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkboxLabel);
    });

    newField.appendChild(row);
    newField.appendChild(checkboxContainer);

    const textareaContainer = document.createElement('div');
    textareaContainer.classList.add('textarea-container');

    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Enter options (separated by commas)';
    textarea.classList.add('options-textarea');
    textareaContainer.appendChild(textarea);

    newField.appendChild(textareaContainer);

    const deleteBtn = document.createElement('span');
    deleteBtn.classList.add('delete-field');
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', function () {
        newField.remove();
    });

    newField.appendChild(deleteBtn);

    document.getElementById('additionalFieldsOther').appendChild(newField);

    dropdown.addEventListener('change', function () {
        const selectedValue = dropdown.value;
        if (selectedValue === 'checkbox' || selectedValue === 'radio' || selectedValue === 'dropdown') {
            textareaContainer.style.display = 'block';
        } else {
            textareaContainer.style.display = 'none';
        }
    });

    // Add drag events
    newField.addEventListener('dragstart', handleDragStart);
    newField.addEventListener('dragover', handleDragOver);
    newField.addEventListener('drop', handleDrop);
    newField.addEventListener('dragleave', handleDragLeave);
}

// Function to handle drag start
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.id);
    event.target.classList.add('dragging');
}

// Function to handle drag over
function handleDragOver(event) {
    event.preventDefault();
    event.target.classList.add('drag-over');
}

// Function to handle drop
function handleDrop(event) {
    event.preventDefault();
    const draggingElement = document.querySelector('.dragging');
    if (draggingElement && event.target.classList.contains('form-group')) {
        const dropTarget = event.target.closest('.form-group');
        dropTarget.parentNode.insertBefore(draggingElement, dropTarget.nextSibling);
        draggingElement.classList.remove('dragging');
    }
    event.target.classList.remove('drag-over');
}

// Function to handle drag leave
function handleDragLeave(event) {
    event.target.classList.remove('drag-over');
}

// Function to handle the deletion of a field
function deleteField(event) {
    if (event.target.classList.contains('delete-field')) {
        event.target.parentElement.remove();
    }
}


// Function to handle adding conditional fields
function addConditionalField() {
    const labelInputs = document.querySelectorAll('.label-input');
    const textareaInputs = document.querySelectorAll('.options-textarea');
    const duplicatesContainer = document.createElement('div');
    duplicatesContainer.classList.add('duplicates-container');

    const dropdownRow = document.createElement('div');
    dropdownRow.classList.add('dropdown-row');

    // Create and populate the label dropdown
    const labelDropdown = document.createElement('select');
    labelDropdown.classList.add('label-dropdown');
    const selectFieldOption = document.createElement('option');
    selectFieldOption.textContent = 'Select Field';
    selectFieldOption.value = '';
    selectFieldOption.disabled = true;
    selectFieldOption.selected = true;
    labelDropdown.appendChild(selectFieldOption);

    // Create an object to store the label and its corresponding options
    const labelOptionsMap = {};

    labelInputs.forEach((labelInput, index) => {
        const labelValue = labelInput.value.trim();
        if (labelValue) {
            const opt = document.createElement('option');
            opt.textContent = labelValue;
            opt.value = labelValue;
            labelDropdown.appendChild(opt);

            // Associate the label with its corresponding textarea options
            const textareaValue = textareaInputs[index].value.trim();
            const options = textareaValue.split(',').map(opt => opt.trim()).filter(opt => opt !== '');
            labelOptionsMap[labelValue] = options;
        }
    });

    // Create and populate the textarea dropdown (Initially hidden)
    const textareaDropdown = document.createElement('select');
    textareaDropdown.classList.add('textarea-dropdown');
    textareaDropdown.style.display = 'none'; // Initially hidden
    const selectOption = document.createElement('option');
    selectOption.textContent = 'Select Option';
    selectOption.value = '';
    selectOption.disabled = true;
    selectOption.selected = true;
    textareaDropdown.appendChild(selectOption);

    // Event listener for label dropdown change
    labelDropdown.addEventListener('change', function () {
        const selectedLabel = labelDropdown.value;

        // Clear the second dropdown
        textareaDropdown.innerHTML = ''; // Clear existing options

        const selectOption = document.createElement('option');
        selectOption.textContent = 'Select Option';
        selectOption.value = '';
        selectOption.disabled = true;
        selectOption.selected = true;
        textareaDropdown.appendChild(selectOption);

        // Show relevant options if any
        const options = labelOptionsMap[selectedLabel];
        if (options && options.length > 0) {
            textareaDropdown.style.display = 'block'; // Show the textarea dropdown
            options.forEach(option => {
                const opt = document.createElement('option');
                opt.textContent = option;
                opt.value = option;
                textareaDropdown.appendChild(opt);
            });
        } else {
            textareaDropdown.style.display = 'none'; // Hide if no options available
        }
    });

    // Event listener for textarea dropdown change
    textareaDropdown.addEventListener('change', function () {
        const selectedOption = textareaDropdown.value;
        if (selectedOption) {
            // Create and add new field container
            const dynamicFieldsContainer = document.createElement('div');
            dynamicFieldsContainer.classList.add('dynamic-fields');

            // Create and add the dynamic label input
            const dynamicLabelInput = document.createElement('input');
            dynamicLabelInput.type = 'text';
            dynamicLabelInput.placeholder = 'Enter Label';
            dynamicLabelInput.classList.add('dynamic-label-input');
            dynamicFieldsContainer.appendChild(dynamicLabelInput);

            // Create and add the type dropdown with additional options
            const typeDropdown = document.createElement('select');
            typeDropdown.classList.add('type-dropdown');
            const types = [
                { value: 'text', text: 'Text' },
                { value: 'number', text: 'Number' },
                { value: 'email', text: 'Email' },
                { value: 'password', text: 'Password' },
                { value: 'date', text: 'Date' },
                { value: 'dropdown', text: 'Dropdown List' },
                { value: 'radio', text: 'Radio Button List' },
                { value: 'checkbox', text: 'Checkbox List' },
                { value: 'yesno', text: 'Yes or No' }
            ];

            types.forEach(type => {
                const opt = document.createElement('option');
                opt.value = type.value;
                opt.textContent = type.text;
                typeDropdown.appendChild(opt);
            });
            dynamicFieldsContainer.appendChild(typeDropdown);

            // Create a new row for the label input and type dropdown
            const newRow = document.createElement('div');
            newRow.classList.add('dynamic-field-row');
            newRow.appendChild(dynamicLabelInput);
            newRow.appendChild(typeDropdown);

            // Append the new row below the dropdowns
            duplicatesContainer.appendChild(newRow);
        }
    });

    // Append the dropdowns to the row
    dropdownRow.appendChild(labelDropdown);
    dropdownRow.appendChild(textareaDropdown);

    // Append the dropdown row to the duplicates container
    duplicatesContainer.appendChild(dropdownRow);

    // Append the duplicates container to the form
    document.getElementById('additionalFieldsOther').appendChild(duplicatesContainer);

    // Disable other buttons but keep "+Add Conditional Fields" button enabled
    disableOtherButtons(true);
}

// Function to disable other buttons but keep "+Add Conditional Fields" enabled
function disableOtherButtons(disabled) {
    document.getElementById('addBasicUserField').disabled = disabled;
    document.getElementById('addFields').disabled = disabled;
    document.getElementById('addFieldsOther').disabled = disabled;
    // "+Add Conditional Fields" button itself is not disabled
}

// Event listeners for the buttons
document.getElementById('addBasicUserField').addEventListener('click', addBasicUserField);
document.getElementById('addFields').addEventListener('click', addField);
document.getElementById('addFieldsOther').addEventListener('click', addFieldToOtherForm);
document.getElementById('addConditionalField').addEventListener('click', function() {
    addConditionalField();
});

// Event listener for field deletions
document.getElementById('additionalFields').addEventListener('click', deleteField);
document.getElementById('additionalFieldsOther').addEventListener('click', deleteField);        