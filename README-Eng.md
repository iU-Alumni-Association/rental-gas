# Student Association Warehouse Reservation Form

This project provides a Google Apps Script-based form for managing reservations of items in the Student Association warehouse.

## Features
- Users can input their name, student ID, desired date for borrowing, borrowing time, return time, and the items they wish to borrow.
- The entered data is automatically saved to a Google Spreadsheet.
- Upon reservation, a notification is sent to a specific Slack channel.
- The list of items is dynamically fetched from another spreadsheet and displayed on the form.

## Setup

1. Create a Google Apps Script project.
2. Copy the above code and paste it into the project.
3. As necessary, update the Spreadsheet URL and Slack Webhook URL set in the environment variables.

## How to Use

1. Access the reservation form.
2. Enter the required information.
3. Clicking the "Submit" button saves the entered data to the Spreadsheet and sends a notification to Slack.
4. Clicking the "View Admin List" button provides direct access to the Google Spreadsheet.

## Notes

- Manage the Slack Webhook URL with environment variables. If it's exposed, anyone can use that URL to send messages to Slack.
- This form is based on Google Apps Script, so it operates according to Google's limitations.

## Contributions

This project is open source. If you find bugs, have suggestions, or improvements, please feel free to raise an Issue.

## Code Overview

### Frontend

#### HTML
<img height="480" alt="image-form" src="https://github.com/iU-Alumni-Association/rental-gas/assets/147612244/fa6fd7a2-3964-45b8-84dd-c0c36654d0bc">

1. **Bootstrap & jQuery**: The Bootstrap CSS and JS files, as well as the jQuery library, are imported. (jQuery might not be used).
   
3. **Reservation Form**: The form for entering reservation-related information is present. Specifically, there are fields related to name, student ID, date, time, and items to rent.
   
4. **Items List**: This displays the list of items available for rental. Data is dynamically fetched from the backend.

#### JavaScript

1. **addItem()**: A function to dynamically add item input fields.

2. **rmItem(btn)**: A function to remove the item input field adjacent to the specified button.

3. **submitFm()**: A function called when the user submits the form. It handles data validation, sending data to the Google Apps Script function, and provides feedback after submission.

4. **onSuccess()**: A function to handle the success message displayed after data is successfully sent.

5. **isValidId(sId) & isValidName(n)**: Functions to validate the format of student ID and name.

6. **esc(str)**: A utility function to safely escape a string.

7. **window.onload**: This function runs when the page is loaded, fetching the available item list from the backend.

8. **renderItemsList(items)**: A function to render the fetched items list as an HTML table.

The frontend provides a modern form with a responsive design using the Bootstrap framework. Also, several validation and feedback mechanisms are integrated to facilitate user interaction.

### Backend (Google Apps Script)

- **doGet()**: A function to provide the HTML page to the user.

<img width="480" alt="image-slack" src="https://github.com/iU-Alumni-Association/rental-gas/assets/147612244/362448e7-61b5-4162-a54a-e83e1df28541">

- **saveData()**: A function to accept data from the user, save it to the Spreadsheet, and then send a notification to Slack.
  
- **sendToSlack()**: A function to send notifications using Slack's Webhook.

- **getItemsFromSheet()**: A function to fetch the list of items from another spreadsheet.

The backend, implemented using Google Apps Script, facilitates data saving, retrieval, and notification functionalities.
