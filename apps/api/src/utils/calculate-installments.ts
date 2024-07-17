export const calculateInstallments = (amount: number, installments: number): string[] => {
  const interestRate = 0.02;
  const monthlyPayment = amount * (interestRate * Math.pow(1 + interestRate, installments)) / (Math.pow(1 + interestRate, installments) - 1);
  return Array(installments).fill(monthlyPayment.toFixed(2));
};
