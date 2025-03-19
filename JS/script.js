'use strict';

const incomeSource = document.querySelector('.tracker__income-source');
const incomeAmount = document.querySelector('.tracker__income-amount');
const incomeInput = document.querySelector('.tracker__income-input');
const incomEntryBtn = document.querySelector('.entry-btn');
const calcTotalAmount = document.querySelector('.total');

const expenseSource = document.querySelector('.tracker__expense-source');
const expenseAmount = document.querySelector('.tracker__expense-value');
const expenseEntryBtn = document.querySelector('.expense__entery-btn');
const expenseLog = document.querySelector('.tracker__expense-log');

let total = 0;
const totalAmount = [];
const tolExpenseAmount = [];

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

incomEntryBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const income = incomeSource.value;
  const amount = +incomeAmount.value.trim();

  totalAmount.push(amount);
  total += amount;
  console.log(total, totalAmount);

  if (!income || !amount) {
    alert('Enter a valid input');
    return;
  }
  createIncomeEl(income, amount);
  incomeSource.value = '';
  incomeAmount.value = '';
  calcTotalAmount.textContent = `${total}`;
});

expenseEntryBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const expense = expenseSource.value;
  const amount = +expenseAmount.value.trim();

  tolExpenseAmount.push(amount);
  total -= amount;
  console.log(tolExpenseAmount, total);

  if (!expense || !amount) {
    alert('Enter a valid expense');
    return;
  }
  createExpenseEl(expense, amount);
  expenseSource.value = '';
  expenseAmount.value = '';
});
