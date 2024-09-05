import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { Link, useNavigate } from "react-router-dom";
import { deleteCourse, getCourses } from "../../../../services/api/course";
import PageLoading from "../../../../components/Admin/PageLoading";

const Course = () => {
    const [course, setCourse] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const listCourses = async () => {
        const data = await getCourses();
        setCourse(data);
        setLoading(false);
    }

    useEffect(() => {
        listCourses().then(r => r);
    }, []);

    useEffect(() => {
        if (!loading) {
            const table = $('#course-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
                buttons: [
                    {
                        text: 'Create New',
                        action: function (e: any, dt: any, node: any, config: any) {
                            navigate("/admin/university/course/new");
                        },
                    },
                ],
            });
            table.buttons().container().appendTo('#course-table_wrapper .col-md-6:eq(0)');

            return () => {
                table.destroy();
            }
        }

    }, [loading]);

    const handleDelete = async (id: string) => {
        await deleteCourse(id);
        await listCourses();
    }

    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
            < BreadCrumb page_name="Course" parent_name="University" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <table id="course-table" className="table table-hover text-nowrap">
                                    <thead>
                                    <tr>
                                        <th className="col-2">Course ID</th>
                                        <th className="col-4">Course Name</th>
                                        <th className="col-3">Modules</th>
                                        <th className="col-1"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Array.isArray(course) && course.length > 0 ? (
                                                course.map((f: any) => (
                                                    <tr key={f.id}>
                                                        <td>{f.cid}</td>
                                                        <td><Link
                                                            to={`/admin/university/course/${f.id}/details`}>{f.title}</Link>
                                                        </td>
                                                        <td>0</td>
                                                        <td>
                                                            <i className="fas fa-ellipsis-v button-cursor-pointer"
                                                               id="dropdownMenuButton1" data-toggle="dropdown"
                                                               aria-haspopup="true"></i>
                                                            <div className="dropdown-menu"
                                                                 aria-labelledby="dropdownMenuButton1">
                                                                <a className="dropdown-item"
                                                                   href={`/admin/university/course/${f.id}/details`}>Edit</a>
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

export default Course;