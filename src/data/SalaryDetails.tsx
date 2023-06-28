export type SalaryDetails = {
  id: number,
  basicPay: number | undefined,
  hra: number | undefined,
  conveyanceAllowance: number | undefined,
  medicalAllowance: number | undefined,
  otherAllowance: number | undefined,
  epf: number | undefined,
  professionalTax: number | undefined,
  employeeId: string,
  financialYearId: number
}