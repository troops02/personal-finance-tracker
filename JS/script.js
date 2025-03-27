'use strict';
import { txnAnimation, txnTiming } from './animate.js';

const incomeSource = document.querySelector('.tracker__income-source');
const incomeAmount = document.querySelector('.tracker__income-amount');
const incomeInput = document.querySelector('.tracker__income-input');
const incomeEntryBtn = document.querySelector('.entry-btn');
const calcTotalAmount = document.querySelector('.total');

const expenseSource = document.querySelector('.tracker__expense-source');
const expenseAmount = document.querySelector('.tracker__expense-value');
const expenseEntryBtn = document.querySelector('.expense__entry-btn');
const expenseLog = document.querySelector('.tracker__expense-log');

const budgetSource = document.querySelector('.tracker__budget-input');
const budgetCategory = document.querySelector('.tracker__budget-category');
const budgetLog = document.querySelector('.tracker__budget-log');
const budgetEntryBtn = document.querySelector('.tracker__budget-btn');

const transactionBtn = document.querySelector('.transaction-btn');

const amountArr = [];
const expenseArr = [];
const budgetArr = [];
let totalBalance;

const clearInputs = (...inputs) =>
  inputs.forEach((input) => (input.value = ''));

const createIncomeEl = function (income, amount) {
  const html = `
    <div class="tracker__icome-input-log-entry">
        <p class="income-text">${income}</p>
        <p class="income-salary">${amount}</p>
    </div>`;

  incomeInput.insertAdjacentHTML('beforeend', html);
};

const createExpenseEl = function (expense, amount) {
  const html = `
  <div class="tracker__expense-entry">
    <p>${expense}</p>
    <p class="expense-log__salary">${amount}</p>
  </div>`;

  expenseLog.insertAdjacentHTML('beforeend', html);
};

const createBudgetEl = function (budget, category) {
  const html = `<div class="tracker__budget-entry">
                <p>${budget}</p>
                <p class="budget-log__salary">${category}</p>
              </div>`;

  budgetLog.insertAdjacentHTML('beforeend', html);
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
  totalBalance = amountArr.reduce((acc, cur) => acc + cur, 0);
  createIncomeEl(income, amount);
  clearInputs(incomeSource, incomeAmount);

  calcTotalAmount.textContent = totalBalance;
});

expenseEntryBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const expense = expenseSource.value;
  const amount = +expenseAmount.value.trim();

  if (!expense || isNaN(amount) || amount <= 0) {
    alert('Enter a valid positive number for income');
    return;
  }
  expenseArr.push(amount);

  createExpenseEl(expense, amount);
  clearInputs(expenseSource, expenseAmount);
});

budgetEntryBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +budgetSource.value;
  const budget = budgetCategory.value;

  if (!budget || isNaN(amount) || amount <= 0) {
    alert('Enter a valid positive number for income');
    return;
  }

  budgetArr.push({ budget, amount });
  createBudgetEl(budget, amount);
  clearInputs(budgetSource, budgetCategory);
});

const body = document.querySelector('body');
const transactionEl = function () {
  if (!document.querySelector('.transaction')) {
    const html = `
    <div class="transaction"></div>
  `;
    body.insertAdjacentHTML('beforeend', html);
    
    const newTransaction = document.querySelector('.transaction:last-of-type');
    newTransaction.animate(txnAnimation, txnTiming);
    body.style.overflow = 'hidden';
    shadowEl();
  } else console.error('Transaction already exists');
};

const shadowEl = function () {
  const html = `<div class="shadow"></div>
`;
  body.insertAdjacentHTML('beforeend', html);
};
transactionBtn.addEventListener('click', transactionEl);
