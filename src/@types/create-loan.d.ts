export interface CreateSimulate {
  monthlyPayment: number;
  totalDebt: number;
  uf: string;
}

export interface SimulateResponse {
  data: {
    priceRequired: number;
    fees: number;
    totalMonths: number;
    totalPrice: number;
    monthlyPayment: number;
    totalFees: number;
    simulations: Simulation[];
  };
}

export interface Simulation {
  debitBalance: number;
  fees: number;
  adjustedDebitBalance: number;
  installmentValue: number;
  maturity: Date;
}

export interface CreateLoanType {
  requiredValue: number;
  amountMonth: number;
  interestRate: number;
  totalInterest: number;
  totalPay: number;
  uf: string;
  monthsPayOff: number;
  state: "PENDING";
  simulates: Simulation[];
}

export interface CreateLoanResponse {
  data: {
    loan: string;
  };
}

export type UF = "SP" | "RJ" | "MG" | "ES";
