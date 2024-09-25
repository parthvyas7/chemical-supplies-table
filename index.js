let data = [], editable = false;

fetch('./chemicals.json').then(res => res.json()).then(res => {
  data = res;
  renderTable();
})

function makeEditable() {
  let btn = document.querySelector('.toolbar button')
  if (!editable) btn.textContent = "Finished Edit?";
  else btn.textContent = "Make Editable";
  editable = !editable
  renderTable();
}

function renderTable() {
  const tbody = document.querySelector("#chemicalTable tbody");
  tbody.innerHTML = "";
  data.forEach((row) => {
    const tr = document.createElement("tr");
    Object.values(row).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      if (editable) {
        td.classList.add("editable");
        td.contentEditable = true;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function sortTable(n) {
  const numericColumns = [0, 3, 4, 6, 8]; // Columns with numeric values
  const table = document.getElementById("chemicalTable");
  let rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  switching = true;
  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.rows;
    
    // Loop through all table rows (except the first, which contains headers)
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      
      // Check if the column is numeric
      if (numericColumns.includes(n)) {
        let valX = parseFloat(x.innerHTML) || 0; // Convert to float, fallback to 0
        let valY = parseFloat(y.innerHTML) || 0;

        if (dir == "asc") {
          if (valX > valY) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (valX < valY) {
            shouldSwitch = true;
            break;
          }
        }
      } else {
        // String comparison for non-numeric columns
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
    }

    if (shouldSwitch) {
      // If a switch is needed, perform the switch
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      // If no switching has been done, switch the direction and repeat the process
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function addRow() {
  const newId =
    data.length > 0 ? Math.max(...data.map((row) => row.id)) + 1 : 1;
  data.push({
    id: newId,
    name: "",
    vendor: "",
    density: "",
    viscosity: "",
    packaging: "",
    packSize: "",
    unit: "",
    quantity: "",
  });
  renderTable();
}

function moveRowUp() {
  const selectedRow = document.querySelector(
    "#chemicalTable tbody tr:focus"
  );
  if (selectedRow && selectedRow.previousElementSibling) {
    selectedRow.parentNode.insertBefore(
      selectedRow,
      selectedRow.previousElementSibling
    );
  }
}

function moveRowDown() {
  const selectedRow = document.querySelector(
    "#chemicalTable tbody tr:focus"
  );
  if (selectedRow && selectedRow.nextElementSibling) {
    selectedRow.parentNode.insertBefore(
      selectedRow.nextElementSibling,
      selectedRow
    );
  }
}

function deleteRow() {
  const selectedRow = document.querySelector(
    "#chemicalTable tbody tr:focus"
  );
  if (selectedRow) {
    const index = Array.from(selectedRow.parentNode.children).indexOf(
      selectedRow
    );
    data.splice(index, 1);
    renderTable();
  }
}

function refreshData() {
  renderTable();
}

function saveData() {
  const rows = document.querySelectorAll("#chemicalTable tbody tr");
  data = Array.from(rows).map((row) => {
    const cells = row.querySelectorAll("td");
    return {
      id: parseInt(cells[0].textContent),
      name: cells[1].textContent,
      vendor: cells[2].textContent,
      density: parseFloat(cells[3].textContent) || "",
      viscosity: cells[4].textContent,
      packaging: cells[5].textContent,
      packSize: parseFloat(cells[6].textContent) || "",
      unit: cells[7].textContent,
      quantity: parseInt(cells[8].textContent) || "",
    };
  });
  console.log("Data saved:", data);
  alert("Data saved successfully!");
}

function downloadData() {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'dataModified.json';
  link.click();
  URL.revokeObjectURL(url);
}