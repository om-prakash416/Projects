document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalExpense = document.getElementById('total-expense');

    let expenses = [];

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const expenseInput = document.getElementById('expense');
        const amountInput = document.getElementById('amount');
        const dateInput = document.getElementById('date');

        const expense = expenseInput.value;
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;

        if (expense.trim() === '' || isNaN(amount) || amount <= 0 || date.trim() === '') {
            alert('Please fill out all fields correctly.');
            return;
        }

        const newExpense = {
            id: Date.now(),
            expense: expense,
            amount: amount,
            date: date
        };

        expenses.push(newExpense);
        addExpenseToList(newExpense);
        updateTotalExpense();
        form.reset();
    });

    function addExpenseToList(expense) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.expense} - $${expense.amount} - ${expense.date}</span>
            <button class="edit-btn" data-id="${expense.id}">Edit</button>
            <button class="delete-btn" data-id="${expense.id}">Delete</button>
        `;
        expenseList.appendChild(li);

        li.querySelector('.delete-btn').addEventListener('click', function () {
            expenses = expenses.filter(item => item.id !== expense.id);
            li.remove();
            updateTotalExpense();
        });

        li.querySelector('.edit-btn').addEventListener('click', function () {
            const newExpense = prompt('Edit Expense:', expense.expense);
            if (newExpense && newExpense.trim() !== '') {
                expense.expense = newExpense;
                li.querySelector('span').textContent = `${expense.expense} - $${expense.amount} - ${expense.date}`;
            }
        });
    }

    function updateTotalExpense() {
        const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        totalExpense.textContent = `Total Expenses: $${total.toFixed(2)}`;
    }
});


