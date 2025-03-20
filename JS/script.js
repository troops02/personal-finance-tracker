'use strict';
const incomeSource = document.querySelector('.tracker__income-source');
const incomeAmount = document.querySelector('.tracker__income-amount');
const incomeInput = document.querySelector('.tracker__income-input');
const incomeEntryBtn = document.querySelector('.entry-btn');
const calcTotalAmount = document.querySelector('.total');

const expenseSource = document.querySelector('.tracker__expense-source');
const expenseAmount = document.querySelector('.tracker__expense-value');
const expenseEntryBtn = document.querySelector('.expense__entry-btn');
const expenseLog = document.querySelector('.tracker__expense-log');

const amountArr = [];
const expenseArr = [];

const clearInputs = (...inputs) =>
  inputs.forEach((input) => (input.value = ''));

const createIncomeEl = function (income, amount) {
  const cap = income.replace(income[0], income[0].toUpperCase());
  const html = `
    <div class="tracker__icome-input-log-entry">
        <p class="income-text">${cap}</p>
        <p class="income-salary">${amount}</p>
    </div>`;

  incomeInput.insertAdjacentHTML('beforeend', html);
};

const createExpenseEl = function (expense, amount) {
  const cap = expense.replace(expense[0], expense[0].toUpperCase());
  const html = `
  <div class="tracker__expense-entry">
    <p>${cap}</p>
    <p class="expense-log__salary">${amount}</p>
  </div>`;
  
  expenseLog.insertAdjacentHTML('beforeend', html);
};

incomeEntryBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const income = incomeSource.value;
  const amount = +incomeAmount.value.trim();

  if (!income || isNaN(amount) || amount <= 0) {
    alert('Enter a valid positive number for income');
    return;
  }

  amountArr.push(amount);
  const totalBalance = amountArr.reduce((acc, cur) => acc + cur, 0);
  
  console.log(`amountArr: ${amountArr}`, `balance: ${balance}`);

  createIncomeEl(income, amount);

  clearInputs(incomeSource, incomeAmount);
  calcTotalAmount.textContent = totalBalance;
});

expenseEntryBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const expense = expenseSource.value;
  const amount = +expenseAmount.value.trim();

  if (!expense || isNaN(amount) || amount <= 0) {
    alert('Enter a valid expense');
    return;
  }
  expenseArr.push(amount);
  console.log(expenseArr);

  createExpenseEl(expense, amount);
  clearInputs(expenseSource, expenseAmount);
});
