import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getStudentDetailsByUsername} from "../../../services/api/user";
import {Auth} from "aws-amplify";
import PageLoading from "../../../components/Admin/PageLoading";

const Profile = () => {

    const [userDetails, setUserDetails] = useState<any>({});
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const session = await Auth.currentSession();
            return session.getIdToken().payload["cognito:username"];
        } catch (error) {
            console.log("Error fetching JWT token:", error);
        }
    };

    useEffect(() => {
        const fetchAndSetUserDetails = async () => {
            try {
                const username = await fetchUser();
                const userDetails = await getStudentDetailsByUsername(username);
                setUserDetails(userDetails);
            } catch (error) {
                console.log("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndSetUserDetails().then(r => r);
    }, []);

    const handleResetSubmit = async (e: any) => {
        e.preventDefault();
        console.log("Resetting password");
    }

    if (loading) {
        return <PageLoading />
    }

    return (
        <>
            <div className="content-header">
                <div className="container">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Profile</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/student"}>Student</Link></li>
                                <li className="breadcrumb-item active">Profile</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-primary card-outline card-outline-tabs">
                                <div className="card-header p-0 border-bottom-0">
                                    <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="custom-tabs-four-details-tab"
                                               data-toggle="pill" href={"#custom-tabs-four-details"} role="tab"
                                               aria-controls="custom-tabs-four-details" aria-selected="true">Basic</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="custom-tabs-four-guardian-tab"
                                               data-toggle="pill"
                                               href={"#custom-tabs-four-guardian"} role="tab"
                                               aria-controls="custom-tabs-four-guardian"
                                               aria-selected="false">Guardian</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="custom-tabs-four-academic-tab"
                                               data-toggle="pill"
                                               href={"#custom-tabs-four-academic"} role="tab"
                                               aria-controls="custom-tabs-four-academic"
                                               aria-selected="false">Academic</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="custom-tabs-four-credentials-tab"
                                               data-toggle="pill"
                                               href={"#custom-tabs-four-credentials"} role="tab"
                                               aria-controls="custom-tabs-four-credentials"
                                               aria-selected="false">Credentials</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <div className="tab-content" id="custom-tabs-four-tabContent">
                                            <div className="tab-pane fade show active" id="custom-tabs-four-details"
                                                 role="tabpanel" aria-labelledby="custom-tabs-four-details-tab">
                                                <form className="form-horizontal">
                                                    <div className="card-body">
                                                        <div className="form-group row">
                                                            <label htmlFor="studentId"
                                                                   className="col-sm-2 col-form-label">Student
                                                                ID</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control"
                                                                       id="studentId"
                                                                       name="studentId" value={userDetails.studentId}
                                                                       disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="joiningDate"
                                                                   className="col-sm-2 col-form-label">Joining
                                                                Date</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control"
                                                                       id="joiningDate"
                                                                       name="joiningDate"
                                                                       value={new Date(userDetails.joiningDate).toLocaleString()}
                                                                       disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="fullName"
                                                                   className="col-sm-2 col-form-label">Full
                                                                Name</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control"
                                                                       id="fullName"
                                                                       name="fullName" value={userDetails.fullName}
                                                                       disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="phone" className="col-sm-2 col-form-label">Phone
                                                                Number</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="phone"
                                                                       name="phone" value={userDetails.phone} disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="email"
                                                                   className="col-sm-2 col-form-label">Email</label>
                                                            <div className="col-sm-10">
                                                                <input type="email" className="form-control" id="email"
                                                                       name="email" value={userDetails.email} disabled/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="tab-pane fade" id="custom-tabs-four-guardian"
                                                 role="tabpanel"
                                                 aria-labelledby="custom-tabs-four-guardian-tab">
                                                <form className="form-horizontal" id="createRoleForm">
                                                    <div className="card-body">
                                                        <div className="form-group row">
                                                            <label htmlFor="guardianName"
                                                                   className="col-sm-2 col-form-label">Guardian
                                                                Name</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control"
                                                                       id="guardianName"
                                                                       name="guardianName"
                                                                       value={userDetails.guardianName}
                                                                       disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="guardianEmail"
                                                                   className="col-sm-2 col-form-label">Guardian
                                                                Email</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control"
                                                                       id="guardianEmail"
                                                                       name="guardianEmail"
                                                                       value={userDetails.guardianEmail}
                                                                       disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="guardianPhone"
                                                                   className="col-sm-2 col-form-label">Guardian
                                                                Phone</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control"
                                                                       id="guardianPhone"
                                                                       name="guardianPhone"
                                                                       value={userDetails.guardianPhone} disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="guardianRelationship"
                                                                   className="col-sm-2 col-form-label">Relationship</label>
                                                            <div className="col-sm-10">
                                                                <input type="guardianRelationship"
                                                                       className="form-control" id="email"
                                                                       name="guardianRelationship"
                                                                       value={userDetails.guardianRelationship}
                                                                       disabled/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="tab-pane fade" id="custom-tabs-four-academic"
                                                 role="tabpanel"
                                                 aria-labelledby="custom-tabs-four-academic-tab">
                                                <form className="form-horizontal" id="createAcademicForm">
                                                    <div className="card-body">
                                                        <div className="form-group row">
                                                            <label htmlFor="faculty"
                                                                   className="col-sm-2 col-form-label">Faculty</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control"
                                                                       id="faculty"
                                                                       name="faculty"
                                                                       value=""
                                                                       disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="department"
                                                                   className="col-sm-2 col-form-label">Department</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control"
                                                                       id="department"
                                                                       name="department"
                                                                       value=""
                                                                       disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="course"
                                                                   className="col-sm-2 col-form-label">Course</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control"
                                                                       id="course"
                                                                       name="course"
                                                                       value=""
                                                                       disabled/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="tab-pane fade" id="custom-tabs-four-credentials"
                                                 role="tabpanel"
                                                 aria-labelledby="custom-tabs-four-credentials-tab">
                                                <form className="form-horizontal" id="createRoleForm"
                                                      onSubmit={handleResetSubmit}>
                                                    <div className="card-body">
                                                        <div className="form-group row">
                                                            <label htmlFor="username"
                                                                   className="col-sm-2 col-form-label">Username</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control"
                                                                       id="username"
                                                                       name="username"
                                                                       value={userDetails.username}
                                                                       disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="password"
                                                                   className="col-sm-2 col-form-label">Password</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control"
                                                                       id="password"
                                                                       name="password"
                                                                       placeholder="********"
                                                                       disabled/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row mt-4">
                                                            <label className="col-sm-2 col-form-label"></label>
                                                            <div className="col-sm-10 d-flex">
                                                                <button type="submit"
                                                                        className="btn btn-primary float-right">Password
                                                                    Reset
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                        {/* /.col */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;