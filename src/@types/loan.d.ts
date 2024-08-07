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
}