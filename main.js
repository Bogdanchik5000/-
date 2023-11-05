const form = document.querySelector("form");
const input = document.querySelector("input");
const btn = document.querySelector("button");
const errValid = document.querySelector(".err_valid");
const table = document.querySelector("table");
const wrap = document.querySelector(".game .wrap");
const score = document.querySelector(".score span:last-child");
const nums = [];
let bulls = 0,
  cows = 0;
let wins = localStorage.getItem("wins") || 0;
score.textContent = wins;
localStorage.setItem("wins", wins);
getRandomNums(nums);
console.log(nums);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btn.style.backgroundColor = "#7fdae4";
  errValid.textContent = "";
  currentValue = input.value;
  // Валидация ввода
  if (!/^[0-9]{4}$/.test(currentValue)) {
    errValid.textContent = "Введите 4 цифры в диапозоне [0 - 9]";
    btn.style.backgroundColor = "red";
    return;
  }

  // Счет быков и коров
  const numsCopy = nums.slice();
  for (let i in currentValue) {
    if (currentValue[i] == nums[i]) {
      bulls += 1;
    } else if (numsCopy.includes(+currentValue[i])) {
      cows += 1;
      // Нахожу индекс в массива для удаления элемента
      numsIndex = numsCopy.indexOf(+currentValue[i]);
      numsCopy.splice(numsIndex, 1);
    }
  }

  // Создание новых записей в таблицу и заполнение истории ввода чисел
  const trHistory = document.createElement("tr");
  const tdNums = document.createElement("td");
  const tdBulls = document.createElement("td");
  const tdCows = document.createElement("td");

  tdNums.textContent = currentValue;
  tdBulls.textContent = bulls;
  tdCows.textContent = cows;

  trHistory.classList.add("history");
  trHistory.appendChild(tdNums);
  trHistory.appendChild(tdBulls);
  trHistory.appendChild(tdCows);

  if (bulls == 4) {
    winElement = document.createElement("div");
    winElement.textContent = "Победа!";
    winElement.style.fontSize = "30px";
    wrap.appendChild(winElement);

    wins++;
    localStorage.setItem("wins", wins);
    score.textContent = wins;

    var newGameBtn = document.createElement("button");
    newGameBtn.textContent = "Загадать новое число";
    wrap.appendChild(newGameBtn);
  } else {
    bulls = 0;
    cows = 0;
  }
  table.appendChild(trHistory);

  // Очистка истории и генерация нового числа
  newGameBtn.addEventListener("click", () => {
    const history = document.querySelectorAll(".history");
    history.forEach((tr) => tr.remove());
    winElement.remove();
    newGameBtn.remove();
    getRandomNums(nums);
    cows = 0;
    bulls = 0;
    form.reset();
  });
});

// Генерация списка из 4 различных цифр
function getRandomNums(arr) {
  arr.length = 0;
  while (arr.length < 4) {
    let num = Math.round(Math.random() * 9);
    if (arr.includes(num)) {
      getRandomNums(nums);
      return;
    } else {
      arr.push(num);
    }
  }
}
