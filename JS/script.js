'use strict';
import { convertCurrency, storage } from './ports.js';

const incomeSource = document.querySelector('.tracker__income-source');
const incomeAmount = document.querySelector('.tracker__income-amount');
const incomeInput = document.querySelector('.tracker__income-input');
const incomeEntryBtn = document.querySelector('.entry-btn');
const calcTotalAmount = document.querySelector('.total');
const currency = document.getElementById('currency');

const expenseSource = document.querySelector('.tracker__expense-source');
const expenseAmount = document.querySelector('.tracker__expense-value');
const expenseEntryBtn = document.querySelector('.expense__entry-btn');
const expenseLog = document.querySelector('.tracker__expense-log');

const budgetSource = document.querySelector('.tracker__budget-input');
const budgetCategory = document.querySelector('.tracker__budget-category');
const budgetLog = document.querySelector('.tracker__budget-log');
const budgetEntryBtn = document.querySelector('.tracker__budget-btn');

const storageBtn = document.querySelector('.storage-btn');

const savingInput = document.querySelector('.saving-input');
const amountInput = document.querySelector('.saving-amount');
const savingBtn = document.querySelector('.saving-btn');

const ctx = document.getElementById('myChart');

const amountArr = [];
const expenseArr = [];
const budgetArr = [];
const savingsData = [];

const clearInputs = (...inputs) =>
  inputs.forEach((input) => (input.value = ''));

const updateTotalBalance = function () {
  const totalIncome = amountArr.reduce((acc, cur) => acc + cur.amount, 0);
  const totalExpense = expenseArr.reduce((acc, cur) => acc + cur.amount, 0);
  const totalBalance = totalIncome - totalExpense;
  const currValue = currency.value;

  calcTotalAmount.textContent = convertCurrency(currValue, totalBalance);
};

const setBudget = function (category, expAmount) {
  const budget = budgetArr.find((b) => b.budget === category);

  if (!budget) {
    alert(`No budgets set for ${category}. Please set a budget first!`);
    return false;
  }

  if (expAmount > budget.amount) {
    alert(`⚠️ You are exceeding your budget for ${category}!`);
    clearInputs(budgetSource, budgetCategory);
    return false;
  }

  return true;
};

const createIncomeEl = function (income, amount) {
  const currValue = currency.value;
  const html = `
    <div class="tracker__icome-input-log-entry">
        <p class="income-text">${income}</p>
        <p class="income-salary">+${convertCurrency(currValue, amount)}</p>
    </div>`;

  incomeInput.insertAdjacentHTML('beforeend', html);
};

const createExpenseEl = function (expense, amount) {
  const currValue = currency.value;
  const html = `
  <div class="tracker__expense-entry">
    <p>${expense}</p>
    <p class="expense-log__salary">-${convertCurrency(currValue, amount)}</p>
  </div>`;

  expenseLog.insertAdjacentHTML('beforeend', html);
};

const createBudgetEl = function (budget, category) {
  const currValue = currency.value;
  const html = `<div class="tracker__budget-entry">
                <p>You have set a ${convertCurrency(
                  currValue,
                  budget
                )} budget on ${category}</p>
                
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

  amountArr.push({ income, amount });
  createIncomeEl(income, amount);
  clearInputs(incomeSource, incomeAmount);
  updateTotalBalance();
  storage(amountArr, 'income');
});

budgetEntryBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +budgetSource.value;
  const budget = budgetCategory.value.trim();

  if (!budget || isNaN(amount) || amount <= 0) {
    alert('Enter a valid positive number for budget');
    return;
  }

  const existingBudget = budgetArr.find((b) => b.budget === budget);
  if (existingBudget) {
    existingBudget.amount = amount;
    alert(`Budget for ${budget} updated to $${amount}`);
  } else {
    budgetArr.push({ budget, amount });
    createBudgetEl(amount, budget);
  }

  clearInputs(budgetSource, budgetCategory);
  storage(budgetArr, 'budget');
});

expenseEntryBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const expense = expenseSource.value.trim();
  const amount = +expenseAmount.value.trim();

  if (!expense || isNaN(amount) || amount <= 0) {
    alert('Enter a valid positive number for expense');
    return;
  }

  const isAllowed = setBudget(expense, amount);
  if (!isAllowed) return;

  expenseArr.push({ expense, amount });

  createExpenseEl(expense, amount);
  clearInputs(expenseSource, expenseAmount);
  updateTotalBalance();
  storage(expenseArr, 'expense');
});

const loadStoredData = function () {
  const storedIncome = JSON.parse(localStorage.getItem('income')) || [];
  const storedExpense = JSON.parse(localStorage.getItem('expense')) || [];
  const storedBudget = JSON.parse(localStorage.getItem('budget')) || [];
  const storedSaving = JSON.parse(localStorage.getItem('savings')) || [];

  storedIncome.forEach(({ income, amount }) => {
    amountArr.push({ income, amount });
    createIncomeEl(income, amount);
  });

  storedExpense.forEach(({ expense, amount }) => {
    expenseArr.push({ expense, amount });
    createExpenseEl(expense, amount);
  });

  storedBudget.forEach(({ budget, amount }) => {
    budgetArr.push({ budget, amount });
    createBudgetEl(budget, amount);
  });

  storedSaving.forEach(({ label, amount }) => {
    savingsData.push({ label, amount });
    updatedChart();
  });

  updateTotalBalance();
};

window.addEventListener('load', () => {
  if (!currency.value) currency.value = 'USD';
  loadStoredData();
});

const clearStorage = function () {
  localStorage.clear();
  amountArr.length = 0;
  expenseArr.length = 0;
  budgetArr.length = 0;
  incomeInput.innerHTML = '';
  expenseLog.innerHTML = '';
  budgetLog.innerHTML = '';
  ctx.innerHTML = '';
  calcTotalAmount.textContent = convertCurrency(currency.value, 0);
  alert('All data cleared!');
};

storageBtn.addEventListener('click', clearStorage);

const addSaving = function () {
  const label = savingInput.value.trim();
  const amount = +amountInput.value;

  if (!label || isNaN(amount)) {
    alert('Please enter valid saving name and amount');
    return;
  }

  savingsData.push({ label, amount });
  updatedChart();
  clearInputs(savingInput, amountInput);
  storage(savingsData, 'savings');
};

const savingsChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'My Savings',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

const updatedChart = function () {
  savingsChart.data.labels = savingsData.map((s) => s.label);
  savingsChart.data.datasets[0].data = savingsData.map((s) => s.amount);
  savingsChart.update();
};

savingBtn.addEventListener('click', addSaving);
