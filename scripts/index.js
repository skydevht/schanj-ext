// Logic Variables
var mainCurrency = 'us'; // us or htg
var currentBank = 'brh'; // default's BRH
var rateType = 'buy'; // Whether the bank is selling (sell) or buying (buy) foreign
var defaultRates = {
  brh: {
    sell: 1,
    buy: 1,
  },
  capital: {
    sell: 1,
    buy: 1,
  },
  bnc: {
    sell: 1,
    buy: 1,
  },
  sogebank: {
    sell: 1,
    buy: 1,
  },
  unibank: {
    sell: 1,
    buy: 1,
  },
  bph: {
    sell: 1,
    buy: 1,
  },
  buh: {
    sell: 1,
    buy: 1,
  },
};
var allRates = defaultRates;
var currentRate = 1; // DisplayCurrency/InputCurrency

// DOM Nodes
var inputCurrency = document.querySelector('#input .currency');
var inputEntry = document.querySelector('#input input');
var displayCurrency = document.querySelector('#display .currency');
var displayResult = document.querySelector('#display .result');
var bankSelector = document.querySelector('#rate-selector select');
var buyButton = document.querySelector('#rate-selector .type button:first-child');
var sellButton = document.querySelector('#rate-selector .type button:last-child');

/**
 * Refresh the current rate used for calculation
 *
 */
function changeRate () {
  var usValue = allRates[currentBank][rateType];
  if (usValue == 0) usValue = 1;
  currentRate = mainCurrency == 'us' ? usValue: 1.0 / usValue;
}
/**
 * Toggle the currency used for enty and display
 *
 */
function changeCurrency() {
  if (mainCurrency == 'us') {
    mainCurrency = 'htg';
    inputCurrency.textContent = 'HTG'
    displayCurrency.textContent = 'US'
  } else {
    mainCurrency = 'us';
    inputCurrency.textContent = 'US'
    displayCurrency.textContent = 'HTG'
  }
  // Refresh the rate
  changeRate();
  calculate();
}
/**
 * Calculate the displayed value with the entry and the current rate
 *
 */
function calculate() {
  var entry = Number(inputEntry.value);
  var result = entry * currentRate;
  displayResult.value = result.toFixed(2);
}
/**
 * This loads the rates list and store theme in the local storage
 *
 */
function loadRates() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://wt-fb6aae95fd4ceea28cd307ec9422fdb1-0.sandbox.auth0-extend.com/refreshRate');
  xhr.onload = function() {
    if (xhr.status === 200) {
      var temp = JSON.parse(xhr.responseText);
      for(i = 0; i < temp.length; i++) {
        var rate = temp[i];
        switch (rate.id) {
          case 3: // BRH
            allRates.brh.buy = rate.value;
            allRates.brh.sell = rate.value;
            break;
          case 4: // Buy BUH
            allRates.buh.buy = rate.value;
            break;
          case 5: // Sell BUH
            allRates.buh.sell = rate.value;
            break;
          case 6: // Buy Unibank
            allRates.unibank.buy = rate.value;
            break;
          case 7: // Sell Unibank
            allRates.unibank.sell = rate.value;
            break;
          case 8: // Buy Sogebank
            allRates.sogebank.buy = rate.value;
            break;
          case 9: // Sell Sogebank
            allRates.sogebank.sell = rate.value;
            break;
          case 12: // Buy Capital
            allRates.capital.buy = rate.value;
            break;
          case 13: // Sell Capital
            allRates.capital.sell = rate.value;
            break;
          case 14: // Buy BNC
            allRates.bnc.buy = rate.value;
            break;
          case 15: // Sell BNC
            allRates.bnc.sell = rate.value;
            break;
          case 16: // Buy BPH
            allRates.bph.buy = rate.value;
            break;
          case 17: // Sell BPH
            allRates.bph.sell = rate.value;
            break;
        }
      }
      changeRate();
      calculate();
    }
    else {
    }
  };
  xhr.send();
}

// Bind event Handler
inputCurrency.addEventListener('click', changeCurrency);
displayCurrency.addEventListener('click', changeCurrency);
// Selecting a bank refresh the current rate and
// recalculate the displayed value
bankSelector.addEventListener('change', function() {
  currentBank = bankSelector.value;
  changeRate();
  calculate();
})
buyButton.addEventListener('click', function () {
  rateType = 'buy';
  buyButton.className = 'active';
  sellButton.className = '';
  changeRate();
  calculate();
});
sellButton.addEventListener('click', function () {
  rateType = 'sell';
  sellButton.className = 'active';
  buyButton.className = '';
  changeRate();
  calculate();
});
// Recalculate on every entry change
inputEntry.addEventListener('input', calculate)

loadRates()
changeRate();
calculate();


