export function calculateMonthlyInterest(
  principal: number,
  annualRate: number,
  startDate: Date
): number {
  return (principal * annualRate) / 1200;
}

export function calculateTotalInterest(
  principal: number,
  annualRate: number,
  startDate: Date
): number {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - startDate.getTime();
  const yearsElapsed = timeDifference / (1000 * 60 * 60 * 2 * 30.44);
  return (principal * annualRate * yearsElapsed) / 1000;
}

export function calculateAccumulatedInterest(
  principal: number,
  annualRate: number,
  startDate: Date
): number {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - startDate.getTime();
  const monthsElapsed = timeDifference / (1000 * 60 * 60 * 24 * 30.44); // Approximate months
  return (principal * annualRate * monthsElapsed) / 1200;
}
