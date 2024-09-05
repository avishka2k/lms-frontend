import { useEffect, useState } from "react";
import BreadCrumb from "../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { Link, useNavigate } from "react-router-dom";
import { deleteLecturer, getLecturers } from "../../../services/api/user";
import PageLoading from "../../../components/Admin/PageLoading";

const AllLecturers = () => {
    const [lecturer, setLecturer] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const listLecturers = async () => {
        const data = await getLecturers();
        setLecturer(data);
        setLoading(false);
    }

    useEffect(() => {
        listLecturers().then(r => r);
    }, []);

    useEffect(() => {
        if (!loading) {
            const table = $('#lecturer-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
                buttons: [
                    {
                        text: 'Create New',
                        action: function (e: any, dt: any, node: any, config: any) {
                            navigate("/admin/lecturer/new");
                        },
                    },
                ],
            });
            table.buttons().container().appendTo('#lecturer-table_wrapper .col-md-6:eq(0)');

            return () => {
                table.destroy();
            }
        }

    }, [loading]);

    const handleDelete = async (id: string) => {
        await deleteLecturer(id);
        await listLecturers();
    }

    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
            <BreadCrumb page_name="Lecturer" parent_name="University" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <table id="lecturer-table" className="table table-hover text-nowrap">
                                    <thead>
                                    <tr>
                                        <th className="col-3">Lecturer ID</th>
                                        <th className="col-3">Lecturer Name</th>
                                        <th className="col-3">Designation</th>
                                        <th className="col-1"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        Array.isArray(lecturer) && lecturer.length > 0 ? (
                                            lecturer.map((s: any) => (
                                                <tr key={s.id}>
                                                    <td>{s.lecturerId}</td>
                                                    <td><Link
                                                        to={`/admin/university/lecturer/${s.id}/details`}>{s.fullName}</Link>
                                                    </td>
                                                    <td>{s.designation}</td>
                                                    <td>
                                                        <i className="fas fa-ellipsis-v button-cursor-pointer"
                                                           id="dropdownMenuButton1" data-toggle="dropdown"
                                                           aria-haspopup="true"></i>
                                                        <div className="dropdown-menu"
                                                             aria-labelledby="dropdownMenuButton1">
                                                            <a className="dropdown-item"
                                                               href={`/admin/university/lecturer/${s.id}/details`}>Edit</a>
                                                            <a className="dropdown-item text-danger" type="button"
                                                               onClick={() => handleDelete(s.id)}>Delete</a>
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

export default AllLecturers;