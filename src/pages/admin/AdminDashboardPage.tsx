import { useEffect, useState } from "react";
import useHttp from "../../config/https";
import { Count } from "../../data/Count";
import { error } from "console";
import { HiUserGroup, HiUserAdd, HiOutlineReceiptTax } from "react-icons/hi";
import { GiReceiveMoney } from "react-icons/gi";
import { Link } from "react-router-dom";

const AdminDashboardPage = () => {
  const [count, setCount] = useState<Count>();
  const { axiosInstance, loading } = useHttp();
  const getCount = () => {
    axiosInstance.get(`Employee/GetCount`)
      .then(response => {
        setCount(response.data.result);
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getCount();
  }, []);
  return (
    <>
      <div className="container p-3">
        <div className="row d-flex justify-content-evenly my-3">
          <div className="col-md-4 border bg-color-2">
            <Link to="/Admin/Employees" className="text-decoration-none text-dark">
              <div className="d-flex justify-content-center">
                <HiUserGroup size={'10rem'} className="text-muted" />
              </div>
              <div className="d-flex justify-content-center">
                <div className="h4 text-center">
                  Employees :
                </div>
                <div className="text-center text-success h4 px-1">
                  {count?.numberOfEmployeesWorking != undefined ? count?.numberOfEmployeesWorking : "Unable to load"}
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 border bg-color-2">
            <div className="d-flex justify-content-center">
              <HiOutlineReceiptTax size={'10rem'} className="text-muted" />
            </div>
            <div className="d-flex justify-content-center">
              <div className="h4 text-center">
                Pending Declarations :
              </div>
              <div className="text-center text-success h4 px-1">
                {loading ? <div className="spinner-border text-primary" role="status" /> : 
                count?.numberOfDeclarationPending != undefined ? count?.numberOfDeclarationPending : "Unable to load"}
              </div>
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-evenly my-3">
          <div className="col-md-4 border bg-color-2">
            <div className="d-flex justify-content-center">
              <GiReceiveMoney size={'10rem'} className="text-muted" />
            </div>
            <div className="d-flex justify-content-center">
              <div className="h4 text-center">
                Pending Salary Details :
              </div>
              <div className="text-center text-success h4 px-1">
                {count?.numberOfSalaryDetailsPending != undefined ? count?.numberOfSalaryDetailsPending : "Unable to load"}
              </div>
            </div>
          </div>

          <div className="col-md-4 border bg-color-2">
            <Link to="/Admin/AddEmployee" className="text-decoration-none text-dark">
              <div className="d-flex justify-content-center">
                <HiUserAdd size={'10rem'} className="text-muted" />
              </div>
              <div className="h4 text-center">
                Add new Employee
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboardPage;
