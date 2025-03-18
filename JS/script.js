'use strict';

const incomeSource = document.querySelector('.tracker__income-source');
const incomeAmount = document.querySelector('.tracker__income-amount');
const incomeInput = document.querySelector('.tracker__income-input');
const entryBtn = document.querySelector('.entry-btn');
const calcTotalAmount = document.querySelector('.total');

let total = 0;
const totalAmount = [];
const createIncomeEl = function (income, amount) {
  const cap = income.replace(income[0], income[0].toUpperCase());
  const html = `
    <div class="tracker__icome-input-log-entry">
        <p class="income-text">${cap}</p>
        <p class="income-salary">${amount}</p>
    </div>`;

  incomeInput.insertAdjacentHTML('beforeend', html);
};

entryBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const income = incomeSource.value.trim();
  const amount = +incomeAmount.value.trim();

  totalAmount.push(amount);
  total += amount;

  if (!income & !amount) {
    alert('Enter a valid income source and amount');
    return;
  }
  createIncomeEl(income, amount);
  incomeSource.value = '';
  incomeAmount.value = '';
  calcTotalAmount.textContent = `${total}`;
});
