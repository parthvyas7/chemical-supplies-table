let data = [];

fetch('./chemicals.json').then(res => res.json()).then(res => {
  data = res;
  renderTable();
})

function renderTable() {
  const tbody = document.querySelector("#chemicalTable tbody");
  tbody.innerHTML = "";
  data.forEach((row) => {
    const tr = document.createElement("tr");
    Object.values(row).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      td.classList.add("editable");
      td.contentEditable = true;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function sortTable(n) {
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

renderTable();