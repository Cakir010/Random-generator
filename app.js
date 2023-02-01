const main = document.querySelector("#main");
const addUserBtn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const showMillionairesBtn = document.querySelector("#show-millionaires");
const sortBtn = document.querySelector("#sort");
const calculateBtn = document.querySelector("#calculate-wealt");

getRandomUser();
getRandomUser();
getRandomUser();

let data = [];

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();

  const user = data.results[0];
  console.log(user);

  const newUser = {
    name: `${user.name.frst} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
}

function addData(obj) {
  data.push(obj);
  updateDom();
}

function calculateMoney() {
    const calc = data.reduce((acc, user) => (acc += user.money), 0)
    const calcElmnt = document.createElement('div');
    calcElmnt.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(calc)} </strong></h3>`
main.appendChild(calcElmnt)
}


function showMillionaires() {
  data = data.filter((user) => user.money > 1000000)
 updateDom();
  };
 
function sortMoney() {
    data.sort((a, b) => b.money - a.money);
    updateDom();
}

function updateDom(providedData = data) {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener('click', sortMoney);
calculateBtn.addEventListener('click' ,calculateMoney)