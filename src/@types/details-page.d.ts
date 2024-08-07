export interface User {
  name: string;
  email: string;
  cpf: string;
  birthDate: string;
}

export interface Simulation {
  id: string;
  debitBalance: number;
  fees: number;
  adjustedDebitBalance: number;
  installmentValue: number;
  maturity: string;
  loanId: string;
}

export interface Loan {
  id: string;
  requiredValue: number;
  amountMonth: number;
  interestRate: string;
  monthsPayOff: number;
  totalInterest: number;
  totalPay: number;
  uf: string;
  userId: string;
  createdAt: string;
  state: "CANCELED" | "ACTIVE";
  user: User;
  simulations: Simulation[];
}
