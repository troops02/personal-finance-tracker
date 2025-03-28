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

const budgetSource = document.querySelector('.tracker__budget-input');
const budgetCategory = document.querySelector('.tracker__budget-category');
const budgetLog = document.querySelector('.tracker__budget-log');
const budgetEntryBtn = document.querySelector('.tracker__budget-btn');

const transactionBtn = document.querySelector('.transaction-btn');

const amountArr = [];
const expenseArr = [];
const budgetArr = [];

const clearInputs = (...inputs) =>
  inputs.forEach((input) => (input.value = ''));

const updateTotalBalance = function () {
  const totalIncome = amountArr.reduce((acc, cur) => acc + cur, 0);
  const totalExpense = expenseArr.reduce((acc, cur) => acc + cur.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  calcTotalAmount.textContent = totalBalance;
};

const setBudget = function () {};

const createIncomeEl = function (income, amount) {
  const html = `
    <div class="tracker__icome-input-log-entry">
        <p class="income-text">${income}</p>
        <p class="income-salary">+${amount}</p>
    </div>`;

  incomeInput.insertAdjacentHTML('beforeend', html);
};

const createExpenseEl = function (expense, amount) {
  const html = `
  <div class="tracker__expense-entry">
    <p>${expense}</p>
    <p class="expense-log__salary">-${amount}</p>
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
  createIncomeEl(income, amount);
  clearInputs(incomeSource, incomeAmount);
  updateTotalBalance();
});

expenseEntryBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const expense = expenseSource.value;
  const amount = +expenseAmount.value.trim();

  if (!expense || isNaN(amount) || amount <= 0) {
    alert('Enter a valid positive number for income');
    return;
  }

  expenseArr.push({ expense, amount });
  console.log(expenseArr);
  createExpenseEl(expense, amount);
  clearInputs(expenseSource, expenseAmount);
  updateTotalBalance();
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
  console.log(budgetArr);
  createBudgetEl(budget, amount);
  clearInputs(budgetSource, budgetCategory);
});
