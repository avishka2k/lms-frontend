import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { useParams } from "react-router-dom";
import { getDepartmentById, updateDepartment } from "../../../../services/api/usiversity";
import { SaveButton } from "../../../../components/Admin/ButtonIndicator";
import PageLoading from "../../../../components/Admin/PageLoading";

const DepartmentDetails = () => {
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const { id } = useParams<{ id: string }>();
    const [department, setDepartment] = useState<any>({
        id: '',
        did: '',
        name: '',
        description: '',
        phone: '',
        email: '',
        createdDate: ''
    });
    useEffect(() => {
        // Fetch department details using the id
        const fetchDepartmentDetails = async () => {
            const department = await getDepartmentById(id || '');
            setDepartment(department);
            setLoading(false);
        };

        fetchDepartmentDetails();
    }, [id]);

    useEffect(() => {
        if (!loading) {
            const table = $('#courses-department-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
                buttons: [
                    {
                        text: 'Add Courses',
                        action: function (e: any, dt: any, node: any, config: any) {
                            $('<button type="button" style="display:none;" data-toggle="modal" data-target="#addDepartmentModal"></button>')
                                .appendTo('body')
                                .trigger('click')
                                .remove();
                        },
                    },
                ],
            });

            table.buttons().container().appendTo('#courses-department-table_wrapper .col-md-6:eq(0)');

            return () => {
                table.destroy();
            }
        }

    }, [loading, id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDepartment((prevDepartment: any) => ({
            ...prevDepartment,
            [name]: value
        }));
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSaving(true);
        if (id) {
            await updateDepartment(id, department);
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
            < BreadCrumb title={department.name ? department.name : 'Loading...'} page_name="Department" parent_name="University" />
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
                                        <a className="nav-link" id="custom-tabs-four-courses-tab" data-toggle="pill" href="#custom-tabs-four-courses" role="tab" aria-controls="custom-tabs-four-courses" aria-selected="false">Courses</a>
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
                                                        <label htmlFor="fId" className="col-sm-2 col-form-label">Department ID <span className="text-danger">*</span></label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="fId" name="fId" value={department.did} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="createdDate" className="col-sm-2 col-form-label">Created At <span className="text-danger">*</span></label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="createdDate" name="createdDate" value={new Date(department.createdDate).toLocaleString()} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="name" className="col-sm-2 col-form-label">Department Name</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="name" name="name" value={department.name} onChange={handleChange} required />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                                        <div className="col-sm-10">
                                                            <textarea className="form-control" id="description" name="description" value={department.description} onChange={handleChange}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="phone" className="col-sm-2 col-form-label">Phone Number</label>
                                                        <div className="col-sm-10">
                                                            <input type="number" className="form-control" id="phone" name="phone" value={department.phone} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                                        <div className="col-sm-10">
                                                            <input type="email" className="form-control" id="email" name="email" value={department.email} onChange={handleChange} />
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
                                        <div className="tab-pane fade" id="custom-tabs-four-courses" role="tabpanel" aria-labelledby="custom-tabs-four-courses-tab">
                                            <div className="modal fade" id="addDepartmentModal">
                                                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title">Add Courses to department</h4>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <table id="scope-table" className="table table-hover text-nowrap">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="col-4">
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input type="checkbox" name="terms" className="custom-control-input scope-checkbox" id="scopeMainCheck" />
                                                                                <label className="custom-control-label" htmlFor="scopeMainCheck"></label>
                                                                                Department name
                                                                            </div>
                                                                        </th>
                                                                        <th className="col-2">Mapping</th>
                                                                        <th className="col-5">Description</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input type="checkbox" name="terms" className="custom-control-input scope-checkbox" id="checkbox-role1" />
                                                                                <label className="custom-control-label" htmlFor="checkbox-role1"></label>
                                                                                <a href="@{/roles/details}">read_only</a>
                                                                            </div>
                                                                        </td>
                                                                        <td>Profile</td>
                                                                        <td>Read only user</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="custom-control custom-checkbox">
                                                                                <input type="checkbox" name="terms" className="custom-control-input scope-checkbox" id="checkbox-role2" />
                                                                                <label className="custom-control-label" htmlFor="checkbox-role2"></label>
                                                                                <a href="@{/roles/details}">read_only</a>
                                                                            </div>
                                                                        </td>
                                                                        <td>Invoice</td>
                                                                        <td>Read only user</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="modal-footer d-flex justify-content-start">
                                                            <button type="button" className="btn btn-primary" id="scopeAssignButton" disabled>Assign</button>
                                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <table id="courses-department-table" className="table table-hover text-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th className="col-3">Scope name</th>
                                                        <th className="col-2">Mapping</th>
                                                        <th className="col-5">Description</th>
                                                        <th className="col-1"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><a href="@{/roles/details}">read_only</a></td>
                                                        <td>Invoice</td>
                                                        <td>Read only user</td>
                                                        <td>
                                                            <i className="fas fa-ellipsis-v" typeof="button" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true"></i>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                <a className="dropdown-item text-danger" href="#">Unassign</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><a href="#">write</a></td>
                                                        <td>Account</td>
                                                        <td>Read and Write</td>
                                                        <td>
                                                            <i className="fas fa-ellipsis-v button-cursor-pointer" typeof="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"></i>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item text-danger" href="#">Unassign</a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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

export default DepartmentDetails;