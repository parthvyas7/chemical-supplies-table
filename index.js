let data = [], editable = false, selectedRow = null;

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
  activeRow()
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
    
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      
      if (numericColumns.includes(n)) {
        let valX = parseFloat(x.innerHTML) || 0;
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
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
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
  if (selectedRow && selectedRow.previousElementSibling) {
    selectedRow.parentNode.insertBefore(
      selectedRow,
      selectedRow.previousElementSibling
    );
  }
}

function moveRowDown() {
  if (selectedRow && selectedRow.nextElementSibling) {
    selectedRow.parentNode.insertBefore(
      selectedRow.nextElementSibling,
      selectedRow
    );
  }
}

function deleteRow() {
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

function activeRow() {
  document.querySelectorAll("#chemicalTable tr").forEach(row => {
    row.addEventListener("click", function() {
      document.querySelectorAll(".clicked-row").forEach(el => el.classList.remove("clicked-row"));
      this.classList.add("clicked-row");
      selectedRow = this;
    });
  });
}