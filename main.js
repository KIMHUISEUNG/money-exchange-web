let currencyRatio = {
  USD: {
    KRW: 1334.46,
    USD: 1,
    VND: 24527.5,
    unit: "달러",
    img: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
  },
  KRW: {
    KRW: 1,
    USD: 0.00075,
    VND: 18.38,
    unit: "원",
    img: "https://cdn.countryflags.com/thumbs/south-korea/flag-400.png",
  },
  VND: {
    KRW: 0.054,
    USD: 0.000041,
    VND: 1,
    unit: "동",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2560px-Flag_of_Vietnam.svg.png",
  },
};

/* 사용자가 버튼을 클릭하면,
dropdown 내용 숨기기와 표시전환 */
function fromMyFunction() {
  document.getElementById("from-currency-list").classList.toggle("show");
}
function toMyFunction() {
  document.getElementById("to-currency-list").classList.toggle("show");
}

// dropdown 메뉴를 유저가 클릭했을 때 닫히는 기능
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;

let toButton = document.getElementById("to-button");
let fromButton = document.getElementById("from-button");

let fromCurrency = "USD";
let toCurrency = "USD";

document.querySelectorAll("#from-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    fromButton.textContent = this.textContent;
    fromCurrency = this.id;
    // document.getElementById("from-unit").textContent =
    //   currencyRatio[fromCurrency].unit;
    convert("from");
  })
);

document.querySelectorAll("#to-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    toButton.textContent = this.textContent;
    toCurrency = this.id;
    // document.getElementById("to-unit").textContent =
    //   currencyRatio[toCurrency].unit;
    convert("from");
  })
);

function convert(type) {
  let amount = 0;
  if (type == "from") {
    amount = document.getElementById("from-input").value;
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];

    document.getElementById("to-input").value = convertedAmount;
    renderKoreanNumber(amount, convertedAmount);
  } else {
    amount = document.getElementById("to-input").value;
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];

    document.getElementById("from-input").value = convertedAmount;
    renderKoreanNumber(convertedAmount, amount);
  }
}

function renderKoreanNumber(from, to) {
  document.getElementById("fromNumToKorea").textContent =
    readNum(from) + currencyRatio[fromCurrency].unit;
  document.getElementById("toNumToKorea").textContent =
    readNum(to) + currencyRatio[toCurrency].unit;
}
console.log("currencyRatio[toCurrency]", currencyRatio[toCurrency]);
function readNum(num) {
  let resultString = "";
  let resultArray = [];
  for (let i = 0; i < unitWords.length; i++) {
    let unitResult =
      (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }
  return resultString;
}
