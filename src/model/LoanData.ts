export interface LoanData {
  borrower: string;
  loanAmt: number;
  loanTakenDate: Date;
  loanClosedDate?: Date;
  roi: number;
  interestPaid: number;
  lender: string;
}

export interface ExtendedLoanData extends LoanData {
  monthlyInterest?: number;
  totalInterest?: number;
  interestPending?: number;
  totalPending?: number;
}
