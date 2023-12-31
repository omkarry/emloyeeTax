import { useEffect, useState } from "react";
import useHttp from "../../config/https";
import { EmployeeData } from "../../data/EmployeeData";
import EventsLoader from "../common/EventLoader";
import ProfilePhoto from "../../assets/images/img_avatar.png"
import "../../assets/css/Card.css"

const ViewEmployees = () => {
  const { loading, axiosInstance } = useHttp();
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const getEmployees = () => {
    axiosInstance.get(`Employee/Employees`)
    .then(response => {
      const employeesWithImages = response.data.result.map((employee: EmployeeData) => {
        const profileImageBytes = employee.profileImageBytes;
        const profileImage = profileImageBytes ? `data:image/jpeg;base64,${profileImageBytes}` : undefined;
        return { ...employee, profileImage };
      });
      setEmployees(employeesWithImages);
    })
      .catch(error => {
        console.log(error);
      })
  }

  // const convertBytesToImageUrl = (byteData: string | null): string | null => {
  //   if (byteData) {
  //     return URL.createObjectURL(new Blob([byteData]));
  //   }
  //   return null;
  // };

  useEffect(() => {
    getEmployees();
  }, [])
  return (
    <>
      <div className="container">
        {loading ? (
          <div className="row">
            <div className="col-md-4"><EventsLoader /></div>
            <div className="col-md-4"><EventsLoader /></div>
            <div className="col-md-4"><EventsLoader /></div>
          </div>
        ) : (
          <div className="row">
            {employees.map(employee => (
              <div className="col-md-4" key={employee.id}>
                <div className="card my-1 p-2">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="image">
                        <img src={employee.profileImageBytes != undefined ? employee.profileImage : ProfilePhoto}
                          className="card-img-top rounded"
                          alt={employee.name}
                          height="100" />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h4 className="mb-0 mt-0">{employee.name}</h4>
                      <span>{employee.email}</span>
                    </div>
                  </div>
                  <div className="row ml-3 w-100">
                    <div className="button mt-2 d-flex flex-row align-items-end px-1">
                      <div className="col-md-6">
                        <div className="p-1">
                          <button className="btn btn-sm btn-outline-primary w-100">View Salary Details</button>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="p-1">
                          <button className="btn btn-sm btn-primary w-100">View Profile</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  )
}

export default ViewEmployees;