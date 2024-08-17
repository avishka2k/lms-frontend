import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { useParams } from "react-router-dom";
import { getDepartmentsByFacultyId, getDepartmentsWithoutAssigned, getFacultyById, updateFaculty } from "../../../../services/api/usiversityService";
import { SaveButton } from "../../../../components/Admin/ButtonIndicator";
import PageLoading from "../../../../components/Admin/PageLoading";

const FacultyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [departmentLoading, setDepartmentLoading] = useState(true);
    const [facultyDepartmentLoading, setFacultyDepartmentLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [faculty, setFaculty] = useState<any>({
        id: '',
        fid: '',
        name: '',
        description: '',
        phone: '',
        email: '',
        createdDate: ''
    });
    const [departments, setDepartments] = useState<any[]>([]);
    const [facultyDepartments, setFacultyDepartments] = useState<any[]>([]);

    // Fetch faculty details using the id
    useEffect(() => {
        const fetchFacultyDetails = async () => {
            const facultyData = await getFacultyById(id || '');
            setFaculty(facultyData);
            setLoading(false);
        };
        fetchFacultyDetails();
    }, [id]);

    // Fetch all departments
    useEffect(() => {
        const fetchDepartments = async () => {

            const departmentsData = await getDepartmentsWithoutAssigned();
            setDepartments(departmentsData);

            setDepartmentLoading(false);

        };
        fetchDepartments();
    }, []);

    // Fetch departments by faculty ID
    useEffect(() => {
        const fetchDepartmentsByFaculty = async () => {
            const facultyDepartmentsData = await getDepartmentsByFacultyId(id || '');
            setFacultyDepartments(facultyDepartmentsData);
            setFacultyDepartmentLoading(false);
        };
        fetchDepartmentsByFaculty();
    }, [id]);


    // Initialize DataTables for faculty departments
    useEffect(() => {
        if (!facultyDepartmentLoading) {
            const table = $('#faculty-departments-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
                buttons: [
                    {
                        text: 'Add Department',
                        action: function (e: any, dt: any, node: any, config: any) {
                            $('<button type="button" style="display:none;" data-toggle="modal" data-target="#addDepartmentModal"></button>')
                                .appendTo('body')
                                .trigger('click')
                                .remove();
                        },
                    },
                ],
            });

            table.buttons().container().appendTo('#faculty-departments-table_wrapper .col-md-6:eq(0)');

            return () => {
                table.destroy();
            }
        }
    }, [facultyDepartmentLoading, id, loading]);

    // Initialize DataTables for all departments
    useEffect(() => {
        if (!departmentLoading) {
            const depTable = $('#department-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
            });

            return () => {
                depTable.destroy();
            }
        }
    }, [departmentLoading, id, loading]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFaculty((prevFaculty: any) => ({
            ...prevFaculty,
            [name]: value
        }));
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSaving(true);
        if (id) {
            await updateFaculty(id, faculty);
        }
        setTimeout(() => {
            setIsSaving(false);
        }, 1000);
    };

    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
            < BreadCrumb title={faculty.name ? faculty.name : 'Loading...'} page_name="Faculty" parent_name="University" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-primary card-outline card-outline-tabs">
                            <div className="card-header p-0 border-bottom-0">
                                <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="custom-tabs-four-details-tab" data-toggle="pill" href="#custom-tabs-four-details" role="tab" aria-controls="custom-tabs-four-details" aria-selected="true">Details</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="custom-tabs-four-departments-tab" data-toggle="pill" href="#custom-tabs-four-departments" role="tab" aria-controls="custom-tabs-four-departments" aria-selected="false">Departments</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="custom-tabs-four-settings-tab" data-toggle="pill" href="#custom-tabs-four-settings" role="tab" aria-controls="custom-tabs-four-settings" aria-selected="false">Settings</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body">
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <div className="tab-content" id="custom-tabs-four-tabContent">
                                        <div className="tab-pane fade show active" id="custom-tabs-four-details" role="tabpanel" aria-labelledby="custom-tabs-four-details-tab">
                                            <form className="form-horizontal" id="createRoleForm" onSubmit={handleUpdate}>
                                                <div className="card-body">
                                                    <div className="form-group row">
                                                        <label htmlFor="fId" className="col-sm-2 col-form-label">Faculty ID <span className="text-danger">*</span></label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="fId" name="fId" value={faculty.fid} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="createdDate" className="col-sm-2 col-form-label">Created At <span className="text-danger">*</span></label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="createdDate" name="createdDate" value={new Date(faculty.createdDate).toLocaleString()} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="name" className="col-sm-2 col-form-label">Faculty Name</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="name" name="name" value={faculty.name} onChange={handleChange} required />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                                        <div className="col-sm-10">
                                                            <textarea className="form-control" id="description" name="description" value={faculty.description} onChange={handleChange}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="phone" className="col-sm-2 col-form-label">Phone Number</label>
                                                        <div className="col-sm-10">
                                                            <input type="number" className="form-control" id="phone" name="phone" value={faculty.phone} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                                        <div className="col-sm-10">
                                                            <input type="email" className="form-control" id="email" name="email" value={faculty.email} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row mt-4">
                                                        <label className="col-sm-2 col-form-label"></label>
                                                        <div className="col-sm-10 d-flex">
                                                            <SaveButton isSaving={isSaving} onClick={handleUpdate} />
                                                            <button type="reset" className="btn btn-default float-right">Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="tab-pane fade" id="custom-tabs-four-departments" role="tabpanel" aria-labelledby="custom-tabs-four-departments-tab">
                                            <div className="modal fade" id="addDepartmentModal">
                                                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title">Add department to faculty</h4>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            {departmentLoading ? (
                                                                <div>Loading...</div>
                                                            ) : (
                                                                <table id="department-table" className="table table-hover text-nowrap">
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="col-3">
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input type="checkbox" name="terms" className="custom-control-input scope-checkbox" id="scopeMainCheck" />
                                                                                    <label className="custom-control-label" htmlFor="scopeMainCheck"></label>
                                                                                    Department ID
                                                                                </div>
                                                                            </th>
                                                                            <th className="col-3">Department Name</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            Array.isArray(departments) && departments.length > 0 ? (
                                                                                departments.map((d: any) => (
                                                                                    <tr key={d.id}>
                                                                                        <td>
                                                                                            <div className="custom-control custom-checkbox">
                                                                                                <input type="checkbox" name="terms" className="custom-control-input scope-checkbox" id="checkbox-role1" />
                                                                                                <label className="custom-control-label" htmlFor="checkbox-role1"></label>
                                                                                                <a href="@{/roles/details}">{d.did}</a>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>{d.name}</td>
                                                                                    </tr>
                                                                                ))
                                                                            ) : (
                                                                                <></>
                                                                            )
                                                                        }


                                                                    </tbody>
                                                                </table>
                                                            )}
                                                        </div>
                                                        <div className="modal-footer d-flex justify-content-start">
                                                            <button type="button" className="btn btn-primary" id="scopeAssignButton" disabled>Assign</button>
                                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {facultyDepartmentLoading ? (
                                                <div>Loading...</div>
                                            ) : (
                                                <table id="faculty-departments-table" className="table table-hover text-nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th className="col-2">Department ID</th>
                                                            <th className="col-3">Department Name</th>
                                                            <th className="col-1"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            Array.isArray(facultyDepartments) && facultyDepartments.length > 0 ? (
                                                                facultyDepartments.map((d: any) => (
                                                                    <tr key={d.id}>
                                                                        <td><a href="#">{d.did}</a></td>
                                                                        <td>{d.name}</td>
                                                                        <td>
                                                                            <i className="fas fa-ellipsis-v" typeof="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"></i>
                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <a className="dropdown-item text-danger" href="#">Unassign</a>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <></>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>

                                        <div className="tab-pane fade" id="custom-tabs-four-settings" role="tabpanel" aria-labelledby="custom-tabs-four-settings-tab">

                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                    {/* /.col */}
                </div>
                {/* /.row */}
            </div>
            {/* /.container-fluid */}
        </section>
    );
}

export default FacultyDetails;