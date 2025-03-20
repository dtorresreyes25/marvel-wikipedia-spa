# Marvel Superheroes Table

## Description

The goal is to display a list of Marvel superheroes in a table, allowing actions such as sorting, filtering, creating, editing, deleting, and viewing detailed information of each hero in a modal. The data will be provided from a JSON file, and Angular Material components will be used for the interface.

## Features

### 1. Display Superheroes in a Table

- Superheroes should be displayed in a table using the `mat-table` component from Angular Material.
- Each column in the table should allow sorting of data when the column header is clicked.

### 2. Filter Heroes by Name

- A field should be added where users can type one or more hero names, using the `mat-chip` component from Angular Material.
- The table should automatically filter to show only heroes whose names match the input.

### 3. View Hero Details

- When a row in the table is clicked, a modal should be displayed with the detailed information of the hero.
- The modal should use the `mat-dialog` component from Angular Material.

### 4. Create a New Hero

- Add a "Create Hero" button that opens a form in a modal or expansion panel.
- The form will allow users to enter the details of a new hero, and upon submission, the hero will be added to the top of the table.

### 5. Modify and Delete Heroes

- Each row in the table should have options to modify or delete the hero.
- When modifying a hero, changes should be reflected in the table.
- When deleting a hero, it should be removed from the table.

### 6. Data Persistence

- Changes made to the table (adding, deleting, modifying heroes) should persist after refreshing the page. The data should be stored in local storage or a similar mechanism.

### 7. Graphical Representation (Optional)

- A chart can be added to show statistics based on the values of the table columns:
  - If a column has 5 or fewer distinct values, display a pie chart.
  - If a column has more than 5 distinct values, display a bar chart.

### 8. Unit Tests

- Set up Jest or a similar tool for unit testing.
- It is recommended to write tests for the CRUD functionalities (create, delete, edit heroes).

---

## Technical Requirements

- **UI Framework**: Angular Material
- **Backend**: Data is provided in a JSON file (`marvel_data.json`), no API connection is required.
- **Persistence**: Use local storage or a similar approach to keep the data after page refresh.
