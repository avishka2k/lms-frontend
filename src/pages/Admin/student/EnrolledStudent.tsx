import { useEffect, useState } from "react";
import BreadCrumb from "../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { Link, useNavigate } from "react-router-dom";
import { deleteStudent, getStudents } from "../../../services/api/user";
import PageLoading from "../../../components/Admin/PageLoading";

const EnrolledStudent = () => {
    const [student, setStudent] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const listStudents = async () => {
        const data = await getStudents();
        setStudent(data);
        setLoading(false);
    }

    useEffect(() => {
        listStudents().then(r => r);
    }, []);

    useEffect(() => {
        if (!loading) {
            const table = $('#student-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
                buttons: [
                    {
                        text: 'Create New',
                        action: function (e: any, dt: any, node: any, config: any) {
                            navigate("/admin/student/new");
                        },
                    },
                ],
            });
            table.buttons().container().appendTo('#student-table_wrapper .col-md-6:eq(0)');

            return () => {
                table.destroy();
            }
        }

    }, [loading]);

    const handleDelete = async (id: string) => {
        await deleteStudent(id);
        await listStudents();
    }

    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
            <BreadCrumb page_name="Student" parent_name="University" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <table id="student-table" className="table table-hover text-nowrap">
                                    <thead>
                                    <tr>
                                        <th className="col-3">Student ID</th>
                                        <th className="col-3">Student Name</th>
                                        <th className="col-3">Batch</th>
                                        <th className="col-1"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        Array.isArray(student) && student.length > 0 ? (
                                            student.map((s: any) => (
                                                <tr key={s.id}>
                                                    <td>{s.studentId}</td>
                                                    <td><Link
                                                        to={`/admin/university/student/${s.id}/details`}>{s.fullName}</Link>
                                                    </td>
                                                    <td>{s.intake}</td>
                                                    <td>
                                                        <i className="fas fa-ellipsis-v button-cursor-pointer"
                                                           id="dropdownMenuButton1" data-toggle="dropdown"
                                                           aria-haspopup="true"></i>
                                                        <div className="dropdown-menu"
                                                             aria-labelledby="dropdownMenuButton1">
                                                            <a className="dropdown-item"
                                                               href={`/admin/university/student/${s.id}/details`}>Edit</a>
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

export default EnrolledStudent;