import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { Link, useNavigate } from "react-router-dom";
import { deleteFaculty, getFaculties } from "../../../../services/api/usiversity";
import PageLoading from "../../../../components/Admin/PageLoading";

const Faculty = () => {
    const [faculty, setFaculty] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const listFaculties = async () => {
        const data = await getFaculties();
        setFaculty(data);
        setLoading(false);
    }

    useEffect(() => {
        listFaculties().then(r => r);
    }, []);

    useEffect(() => {
        if (!loading) {
            const table = $('#faculty-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
                buttons: [
                    {
                        text: 'Create New',
                        action: function (e: any, dt: any, node: any, config: any) {
                            navigate("/admin/university/faculty/new");
                        },
                    },
                ],
            });
            table.buttons().container().appendTo('#faculty-table_wrapper .col-md-6:eq(0)');

            return () => {
                table.destroy();
            }
        }

    }, [loading]);

    const handleDelete = async (id: string) => {
        await deleteFaculty(id);
        await listFaculties();
    }

    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
            <BreadCrumb page_name="Faculty" parent_name="University" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <table id="faculty-table" className="table table-hover text-nowrap">
                                    <thead>
                                    <tr>
                                        <th className="col-3">Faculty ID</th>
                                        <th className="col-3">Faculty Name</th>
                                        <th className="col-3">Departments</th>
                                        <th className="col-1"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Array.isArray(faculty) && faculty.length > 0 ? (
                                                faculty.map((f: any) => (
                                                    <tr key={f.id}>
                                                        <td>{f.fid}</td>
                                                        <td><Link
                                                            to={`/admin/university/faculty/${f.id}/details`}>{f.name}</Link>
                                                        </td>
                                                        <td>0</td>
                                                        <td>
                                                            <i className="fas fa-ellipsis-v button-cursor-pointer"
                                                               id="dropdownMenuButton1" data-toggle="dropdown"
                                                               aria-haspopup="true"></i>
                                                            <div className="dropdown-menu"
                                                                 aria-labelledby="dropdownMenuButton1">
                                                                <a className="dropdown-item"
                                                                   href={`/admin/university/faculty/${f.id}/details`}>Edit</a>
                                                                <a className="dropdown-item text-danger" type="button"
                                                                   onClick={() => handleDelete(f.id)}>Delete</a>
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

export default Faculty;