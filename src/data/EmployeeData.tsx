export type EmployeeData = {
  id: string,
  name: string,
  email: string,
  username: string,
  gender: string | null,
  profileImageBytes: string | null,
  profileImage: string | undefined
}


{/* <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle h5" data-bs-toggle="dropdown" aria-expanded="false">
          <div className="row">
            <div className="col-md-4">
              <img src={user?.profileImageBytes != null ? user.profileImageBytes : ProfilePhoto} className="rounded-circle shadow-4"
                width="30px" />
            </div>
            <div className="col-md-8">
              {user?.username}
            </div>
          </div>
        </a> */}