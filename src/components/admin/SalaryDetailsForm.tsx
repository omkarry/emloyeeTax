import { useEffect, useState } from "react";
import { SalaryDetails } from "../../data/SalaryDetails";
import { EmployeeData } from "../../data/EmployeeData";
import { FinancialYear } from "../../data/FinancialYear";
import useHttp from "../../config/https";
import { Alert } from "react-bootstrap";
import { error } from "console";

const SalaryDetailsForm = () => {
  const { axiosInstance, loading } = useHttp();

  const [employees, setEmployees] = useState<EmployeeData[] | null>(null);
  const [financialYears, setFinancialYears] = useState<FinancialYear[] | null>(null);
  const [salaryDetails, setSalaryDetails] = useState<SalaryDetails>({
    id: 0,
    basicPay: undefined,
    hra: undefined,
    conveyanceAllowance: undefined,
    medicalAllowance: undefined,
    otherAllowance: undefined,
    epf: undefined,
    professionalTax: undefined,
    employeeId: "",
    financialYearId: 0
  })

  const handleSalaryDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSalaryDetails({
      ...salaryDetails,
      [name]: value
    });
  }

  const getFinancialYears = () => {
    axiosInstance.get(`FinancialYear/FinancialYears`)
      .then(response => {
        setFinancialYears(response.data.result);
      })
  }

  const getEmployees = () => {
    axiosInstance.get(`Employee/EmployeeNames`)
      .then(response => {
        setEmployees(response.data.result);
      })
  }

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSalaryDetails({ ...salaryDetails, [name]: value });
  }

  const handleSubmit = () => {
    axiosInstance.post(`SalaryDetails`, salaryDetails)
      .then(response => {
        alert('Salary details added successfully');
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }
  const validateSalaryDetails = (salaryDetails: SalaryDetails) => {
    if (
      salaryDetails.basicPay! >= 0 &&
      salaryDetails.hra! >= 0 &&
      salaryDetails.conveyanceAllowance! >= 0 &&
      salaryDetails.medicalAllowance! >= 0 &&
      salaryDetails.otherAllowance! >= 0 &&
      salaryDetails.epf! >= 0 &&
      salaryDetails.professionalTax! >= 0 &&
      salaryDetails.basicPay != undefined &&
      salaryDetails.hra != undefined &&
      salaryDetails.conveyanceAllowance != undefined &&
      salaryDetails.medicalAllowance != undefined &&
      salaryDetails.otherAllowance != undefined &&
      salaryDetails.epf != undefined &&
      salaryDetails.professionalTax != undefined
    ) {
      return true; // all values are valid
    } else {
      return false; // at least one value is invalid
    }
  }

  useEffect(() => {
    getFinancialYears();
    getEmployees();
  }, [])
  return (
    <>
      <div className="container-fluid">
        <div className="container w-50 rounded px-0 py-2">
          <form onSubmit={handleSubmit} className="border rounded">
            <div className="form-header h4 text-center bg-white rounded">
              <div className="p-3 text-dark">
                Salary Details
              </div>
            </div>
            <div className="container px-3">
              <div className="row my-1 align-items-center">
                <div className="col-md-6">
                  <label htmlFor="financialYear" className="form-label">Select Financial Year</label>
                </div>
                <div className="col-md-6">
                  <select
                    required
                    id="financialYear-dropdown"
                    className="form-select"
                    name="financialYearId"
                    defaultValue="Select FY"
                    onChange={handleDropdownChange}
                  >
                    <option value="Select FY" disabled>Select Financial Year</option>
                    {financialYears && financialYears.map((item) => {
                      return (
                        <option key={item.id} value={item.id} >
                          {item.financialYearStart}-{item.financialYearEnd}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-6">
                  <label htmlFor="employees" className="form-label">Select Employee</label>
                </div>
                <div className="col-md-6">
                  <select
                    required
                    id="employees-dropdown"
                    className="form-select"
                    name="employeeId"
                    defaultValue="Select employee"
                    onChange={handleDropdownChange}
                  >
                    <option value="Select employee" disabled>Select Employee</option>
                    {employees && employees.map((item) => {
                      return (
                        <option key={item.id} value={item.id} >
                          {item.name} - {item.email}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-6">
                  <label htmlFor="basicPay" className="form-label mb-0">Basic Pay</label>
                  {String(salaryDetails.basicPay) == "" || salaryDetails.basicPay == 0 ? <p className="alert alert-danger py-0 mb-2">* Please enter basic pay amount </p> :
                    salaryDetails.basicPay! < 0 && salaryDetails.basicPay != null ? <p className="alert alert-danger py-0 mb-2">* Please enter amount correctly</p> : <p className="alert invisible py-0 mb-2">hi</p>}
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    id="basicPay"
                    placeholder="Enter Basic Pay"
                    name="basicPay"
                    value={salaryDetails.basicPay}
                    onChange={handleSalaryDetails}
                    onWheel={event => event.currentTarget.blur()}
                    required />
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-6">
                  <label htmlFor="hra" className="form-label mb-0">House Rent Allowance</label>
                  {String(salaryDetails.hra) == "" || salaryDetails.hra == 0 ? <p className="alert alert-danger py-0 mb-2">* Please enter hra amount </p> :
                    salaryDetails.hra! < 0 && salaryDetails.hra != null ? <p className="alert alert-danger py-0 mb-2">* Please enter amount correctly</p> : <p className="alert invisible py-0 mb-2">hi</p>}
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    id="hra"
                    placeholder="Enter HRA"
                    name="hra"
                    value={salaryDetails.hra}
                    onChange={handleSalaryDetails}
                    onWheel={event => event.currentTarget.blur()}
                    required />
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-6">
                  <label htmlFor="conveyanceAllowance" className="form-label mb-0">Conveyance Allowance</label>
                  {String(salaryDetails.conveyanceAllowance) == "" || salaryDetails.conveyanceAllowance == 0 ? <p className="alert alert-danger py-0 mb-2">* Please enter conveyance allowance </p> :
                    salaryDetails.conveyanceAllowance! < 0 && salaryDetails.conveyanceAllowance != null ? <p className="alert alert-danger py-0 mb-2">* Please enter amount correctly</p> : <p className="alert invisible py-0 mb-2">hi</p>}
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    id="conveyanceAllowance"
                    placeholder="Enter Conveyance Allowance"
                    name="conveyanceAllowance"
                    value={salaryDetails.conveyanceAllowance}
                    onWheel={event => event.currentTarget.blur()}
                    onChange={handleSalaryDetails}
                    required />
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-6">
                  <label htmlFor="medicalAllowance" className="form-label mb-0">Medical Allowance</label>
                  {String(salaryDetails.medicalAllowance) == "" || salaryDetails.medicalAllowance == 0 ? <p className="alert alert-danger py-0 mb-2">* Please enter medical allowance</p> :
                    salaryDetails.medicalAllowance! < 0 && salaryDetails.medicalAllowance != null ? <p className="alert alert-danger py-0 mb-2">* Please enter amount correctly</p> : <p className="alert invisible py-0 mb-2">hi</p>}
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    id="medicalAllowance"
                    placeholder="Enter Medical Allowance"
                    name="medicalAllowance"
                    value={salaryDetails.medicalAllowance}
                    onWheel={event => event.currentTarget.blur()}
                    onChange={handleSalaryDetails}
                    required />
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-6">
                  <label htmlFor="otherAllowance" className="form-label mb-0">Other Allowances</label>
                  {String(salaryDetails.otherAllowance) == "" || salaryDetails.otherAllowance == 0 ? <p className="alert alert-danger py-0 mb-2">* Please enter other allowances </p> :
                    salaryDetails.otherAllowance! < 0 && salaryDetails.otherAllowance != null ? <p className="alert alert-danger py-0 mb-2">* Please enter amount correctly</p> : <p className="alert invisible py-0 mb-2">hi</p>}
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    id="otherAllowance"
                    placeholder="Enter Other Allowances"
                    name="otherAllowance"
                    value={salaryDetails.otherAllowance}
                    onChange={handleSalaryDetails}
                    onWheel={event => event.currentTarget.blur()}
                    required />
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-6">
                  <label htmlFor="epf" className="form-label mb-0">EPF </label>
                  {String(salaryDetails.epf) == "" || salaryDetails.epf == 0 ? <p className="alert alert-danger py-0 mb-2">* Please enter epf amount</p> :
                    salaryDetails.epf! < 0 && salaryDetails.epf != null ? <p className="alert alert-danger py-0 mb-2">* Please enter amount correctly</p> : <p className="alert invisible py-0 mb-2">hi</p>}
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    id="epf"
                    placeholder="Enter EPF"
                    name="epf"
                    value={salaryDetails.epf}
                    onChange={handleSalaryDetails}
                    onWheel={event => event.currentTarget.blur()}
                    required />
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-6">
                  <label htmlFor="professionalTax" className="form-label mb-0">Professional Tax</label>
                  {String(salaryDetails.professionalTax) == "" || salaryDetails.professionalTax == 0 ? <p className="alert alert-danger py-0 mb-2">* Please enter professional tax </p> :
                    salaryDetails.professionalTax! < 0 && salaryDetails.professionalTax != null ? <p className="alert alert-danger py-0 mb-2">* Please enter amount correctly</p> : <p className="alert invisible py-0 mb-2">hi</p>}
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    id="professionalTax"
                    placeholder="Enter Professional Tax"
                    name="professionalTax"
                    value={salaryDetails.professionalTax}
                    onChange={handleSalaryDetails}
                    onWheel={event => event.currentTarget.blur()}
                    required />
                </div>
              </div>
              <div className="row my-2">
                <div className="col-4">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Add Details"
                    disabled={!validateSalaryDetails(salaryDetails)}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default SalaryDetailsForm;