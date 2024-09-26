# Code Design Approach

## Overview

It is PWA (progressive web app) Interactive Chemical Supplies table that contains a list of chemicals with their details. It also has sort options on each column based on which user can sort the data. The left top toolbar contains the functionality to add the row, move row down, move row up, delete row, refresh the data and save the data.

## Architecture

It has following file structure:

- **index.html**: The main entry point of the application, containing the basic structure and loading other resources.
- **src/styles.css**: Contains all the styling for the application.
- **src/index.js**: The main JavaScript file containing all the application logic.
- **src/data.json**: A separate file containing the initial chemical supplies data.
- **src/manifest.json**: Defines the PWA properties for installation and appearance.
- **src/service-worker.js**: Enables offline functionality by storing in localStorage and caching necessary for PWA functionality.

## Design Choices

### Progressive Web App (PWA)

**Choice**: Implement the application as a PWA.

**Rationale**: 
- Provides an app-like experience with the ability to work offline.
- Allows installation on devices without going through app stores.
- Ensures cross-platform compatibility.

### Separation of Data and Logic

**Choice**: Store initial data in a separate JSON file.

**Rationale**:
- Improves maintainability by separating data from application logic.
- Allows easy updates to initial data without changing the main code.

### Local Storage for Data Persistence

**Choice**: Use browser's localStorage for saving user changes.

**Rationale**:
- Provides a simple way to persist data without requiring a backend server.
- Allows the app to work offline while still saving user changes.

### Dynamic Table Rendering

**Choice**: Generate table rows dynamically using JavaScript.

**Rationale**:
- Allows for easy updates to the table when data changes.
- Facilitates sorting and other dynamic operations on the table.

### Editable Table Cells

**Choice**: Make table cells directly editable using contentEditable.

**Rationale**:
- Provides a more intuitive and immediate editing experience.
- Reduces the need for separate edit forms or modals.
- Simplifies the user interface.

### Sorting Functionality

**Choice**: Implement client-side sorting.

**Rationale**:
- Allows for immediate feedback without server requests.
- Works well with the offline-first approach of a PWA.
- Provides a responsive user experience.

## Key Components

### Data Management

- **fetchData()**: Asynchronously loads data from the JSON file.
- **initApp()**: Initializes the app, prioritizing localStorage data over JSON file data.
- **saveData()**: Saves current table data to localStorage.

### Table Operations

- **renderTable()**: Dynamically creates and updates the table based on current data.
- **sortTable()**: Handles sorting of the table when a column header is clicked.
- **addRow()**, **moveRowUp()**, **moveRowDown()**, **deleteRow()**: Provide CRUD operations on table rows.
- **downloadData()**: Option to download data for future use

### Service Worker

- Caches necessary files for offline use.
- Intercepts fetch requests to serve cached content when offline.

## Styling Approach

- Use of a separate CSS file for clean separation of concerns.
- Simple, minimalist design for clarity and ease of use.
