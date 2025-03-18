'use strict';

const saving = document.getElementById('#saving');
const entry = document.querySelector('.entry-btn');

entry.addEventListener('click', function () {
  const value = +saving.value;
  console.log(value);
});
