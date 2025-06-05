if (window.localStorage.getItem("isLoggedIn") !== "true") {
    alert("You must log in first!");
    window.location.href ="index.html";
}

function generateRandomNumber(node) {
    let min = -1.75;
    let max = 2.99;
    const randomNumber = (Math.random() * (max - min + 1) + min).toFixed(2);
    node.innerText = randomNumber;
}

// Initialize balance
let availablebal = parseFloat(window.localStorage.getItem("Balance")) || 0;
const currentbal = document.getElementById("currentBal");
currentbal.innerText = availablebal.toFixed(2);

// Periodically update stock changes
setInterval(() => generateRandomNumber(document.getElementById("changeApple")), 10000);
setInterval(() => generateRandomNumber(document.getElementById("changeMicrosoft")), 20000);
setInterval(() => generateRandomNumber(document.getElementById("changeGoogle")), 10000);
setInterval(() => generateRandomNumber(document.getElementById("changeAmazon")), 40000);
setInterval(() => generateRandomNumber(document.getElementById("changeMeta")), 10000);
setInterval(() => generateRandomNumber(document.getElementById("changeTesla")), 90000);

// DOM References
const applecells = document.getElementById("Apple").getElementsByTagName("td");
const microsoftcells = document.getElementById("Microsoft").getElementsByTagName("td");
const googlecells = document.getElementById("Google").getElementsByTagName("td");
const amazoncells = document.getElementById("Amazon").getElementsByTagName("td");
const metacells = document.getElementById("Meta").getElementsByTagName("td");
const teslacells = document.getElementById("Tesla").getElementsByTagName("td");

const appleBtn = document.getElementById("AddAppleStock");
const msftBtn = document.getElementById("AddMicrosoftStock");
const googleBtn = document.getElementById("AddGoogleStock");
const amazonBtn = document.getElementById("AddAmazonStock");
const metaBtn = document.getElementById("AddMetaStock");
const teslaBtn = document.getElementById("AddTeslaStock");

appleBtn.addEventListener('click', () => checkBal(applecells));
msftBtn.addEventListener('click', () => checkBal(microsoftcells));
googleBtn.addEventListener('click', () => checkBal(googlecells));
amazonBtn.addEventListener('click', () => checkBal(amazoncells));
metaBtn.addEventListener('click', () => checkBal(metacells));
teslaBtn.addEventListener('click', () => checkBal(teslacells));

const purchasedshareBody = document.getElementById("PurchasedShareBody");

function checkBal(cells) {
    const stockSymbol = cells[0].innerText;
    const companyName = cells[1].innerText;
    const stockPrice = parseFloat(cells[2].innerText);
    const changeMktValue=parseFloat(cells[3].innerText);
    if (stockPrice > availablebal) {
        alert("Balance lower than stock price");
        return;
    }

    availablebal -= stockPrice;
    window.localStorage.setItem("Balance", availablebal.toFixed(2));
    currentbal.innerText = availablebal.toFixed(2);

    const rows = purchasedshareBody.getElementsByTagName("tr");
    let found = false;

    for (let row of rows) {
        if (row.cells[0].innerText === stockSymbol) {
            let quantity = parseInt(row.cells[3].innerText) + 1;
            row.cells[3].innerText = quantity;
            let totalValue = (stockPrice * quantity).toFixed(2);
            row.cells[4].innerText = totalValue;
            found = true;
            break;
        }
    }

    if (!found) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${stockSymbol}</td>
            <td>${companyName}</td>
            <td>${stockPrice.toFixed(2)}</td>
            <td>1</td>
            <td>${stockPrice.toFixed(2)}</td>
            <td><button class="removeBtn">Remove (-)</button></td>
        `;
        purchasedshareBody.appendChild(newRow);

        newRow.querySelector('.removeBtn').addEventListener('click', () => {
            let quantity = parseInt(newRow.cells[3].innerText);
            const unitPrice = parseFloat(newRow.cells[2].innerText);

            if (quantity > 1) {
                quantity -= 1;
                newRow.cells[3].innerText = quantity;
                newRow.cells[4].innerText = (unitPrice * quantity).toFixed(2);
            } else {
                purchasedshareBody.removeChild(newRow);
            }

            availablebal += unitPrice;
            window.localStorage.setItem("Balance", availablebal.toFixed(2));
            currentbal.innerText = availablebal.toFixed(2);

            updateInvestedAmount();
            updateCurrentValue();
        });
    }

    updateInvestedAmount();
    updateCurrentValue();
}


function updateInvestedAmount() {
    let total = 0;
    const rows = purchasedshareBody.getElementsByTagName("tr");
    for (let row of rows) {
        total += parseFloat(row.cells[4].innerText); // price * quantity
    }
    document.getElementById("investedVal").innerText = total.toFixed(2);
}


// function updateCurrentValue() {
//     let total = 0;
//     const rows = purchasedshareBody.getElementsByTagName("tr");

//     for (let row of rows) {
//         const symbol = row.cells[0].innerText;
//         const quantity = parseInt(row.cells[3].innerText);
//         const basePrice = parseFloat(row.cells[2].innerText);

//         const changeId = "change" + symbol.charAt(0).toUpperCase() + symbol.slice(1).toLowerCase();
//         const change = parseFloat(document.getElementById(changeId)?.innerText || "0");

//         const currentPrice = basePrice + change;
//         total += currentPrice * quantity;
//     }

//     document.getElementById("currentValue").innerText = total.toFixed(2);
// }

// // Update current portfolio value every second
// setInterval(updateCurrentValue, 1000);