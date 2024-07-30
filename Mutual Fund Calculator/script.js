function calculateCompoundInterest() {
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
    const annualInterestRate = parseFloat(document.getElementById('annualInterestRate').value) / 100;
    const numberOfYears = parseFloat(document.getElementById('numberOfYears').value);

    const numberOfMonths = numberOfYears * 12;
    const monthlyInterestRate = annualInterestRate / 12;

    let totalAmount = initialInvestment * Math.pow(1 + monthlyInterestRate, numberOfMonths);

    for (let i = 1; i <= numberOfMonths; i++) {
        totalAmount += monthlyContribution * Math.pow(1 + monthlyInterestRate, numberOfMonths - i);
    }

    const totalInvested = initialInvestment + (monthlyContribution * numberOfMonths);
    const compoundInterestEarned = totalAmount - totalInvested;

    document.getElementById('totalAmount').textContent = `Total Amount: ₹${totalAmount.toFixed(2)}`;
    document.getElementById('totalInvested').textContent = `Total Invested: ₹${totalInvested.toFixed(2)}`;
    document.getElementById('compoundInterestEarned').textContent = `Compound Interest Earned: ₹${compoundInterestEarned.toFixed(2)}`;
}
