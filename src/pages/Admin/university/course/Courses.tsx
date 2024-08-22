import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { Link, useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourses } from "../../../../services/api/course";
import PageLoading from "../../../../components/Admin/PageLoading";

const Course = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const listCourses = async () => {
        const data = await getAllCourses();
        setCourses(data);
        setLoading(false);
    }

    useEffect(() => {
        listCourses();
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
                            navigate("/university/course/new");
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

    const handleDelete = async (id: number) => {
        await deleteCourse(id);
        listCourses();
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
                                            <th className="col-3">Course Name</th>
                                            <th className="col-3">Description</th>
                                            <th className="col-3">Faculty</th>
                                            <th className="col-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Array.isArray(courses) && courses.length > 0 ? (
                                                courses.map((course: any) => (
                                                    <tr key={course.id}>
                                                        <td><Link to={`/university/course/${course.id}/details`}>{course.name}</Link></td>
                                                        <td>{course.description}</td>
                                                        <td>{course.facultyName || "N/A"}</td>
                                                        <td>
                                                            <i className="fas fa-ellipsis-v button-cursor-pointer" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true"></i>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                <a className="dropdown-item" href={`/university/course/${course.id}/details`}>Edit</a>
                                                                <a className="dropdown-item text-danger" type="button" onClick={() => handleDelete(course.id)}>Delete</a>
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
