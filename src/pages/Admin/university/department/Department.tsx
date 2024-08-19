import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import { deleteDepartment, getDepartments } from "../../../../services/api/usiversityService";
import { Link, useNavigate } from "react-router-dom";
import PageLoading from "../../../../components/Admin/PageLoading";


const Department = () => {

    const [department, setDepartment] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const listDepartments = async () => {
        const data = await getDepartments();
        setDepartment(data);
        setLoading(false);
    }

    useEffect(() => {
        listDepartments();
    }, []);

    useEffect(() => {
        if (!loading) {
            const table = $('#department-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
                buttons: [
                    {
                        text: 'Create New',
                        action: function (e: any, dt: any, node: any, config: any) {
                            navigate("/university/department/new");
                        },
                    },
                ],
            });
            table.buttons().container().appendTo('#department-table_wrapper .col-md-6:eq(0)');

            return () => {
                table.destroy();
            }
        }

    }, [loading]);

    const handleDelete = async (id: string) => {
        await deleteDepartment(id);
        listDepartments();
    }

    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
            <BreadCrumb page_name="Department" parent_name="University" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <table id="department-table" className="table table-hover text-nowrap">
                                    <thead>
                                        <tr>
                                            <th className="col-3">Department Name</th>
                                            <th className="col-3">Description</th>
                                            <th className="col-3">Courses</th>
                                            <th className="col-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Array.isArray(department) && department.length > 0 ? (
                                                department.map((f: any) => (
                                                    <tr key={f.id}>
                                                        <td><Link to={`/university/department/${f.id}/details`}>{f.name}</Link></td>
                                                        <td>{f.description}</td>
                                                        <td>0</td>
                                                        <td>
                                                            <i className="fas fa-ellipsis-v button-cursor-pointer" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true"></i>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                <a className="dropdown-item" href="@{/users/details}">Edit</a>
                                                                <a className="dropdown-item text-danger" type="button" onClick={() => handleDelete(f.id)}>Delete</a>
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

export default Department;