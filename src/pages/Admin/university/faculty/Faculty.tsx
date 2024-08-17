import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { Link } from "react-router-dom";
import { deleteFaculty, getFaculties } from "../../../../services/api/usiversityService";
import { Button } from "@aws-amplify/ui-react";
import PageLoading from "../../../../components/Admin/PageLoading";

const Faculty = () => {
    const [faculty, setFaculty] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const listFaculties = async () => {
        const data = await getFaculties();
        setFaculty(data);
        setLoading(false);
    }

    useEffect(() => {
        listFaculties();
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
                            window.location.href = '/university/faculty/new';
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
        listFaculties();
    }

    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
            < BreadCrumb page_name="Faculty" parent_name="University" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <table id="faculty-table" className="table table-hover text-nowrap">
                                    <thead>
                                        <tr>
                                            <th className="col-3">Faculty Name</th>
                                            <th className="col-3">Description</th>
                                            <th className="col-3">Courses</th>
                                            <th className="col-1"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            Array.isArray(faculty) && faculty.length > 0 ? (
                                                faculty.map((f: any) => (
                                                    <tr key={f.id}>
                                                        <td><Link to={`/university/faculty/${f.id}/details`}>{f.name}</Link></td>
                                                        <td>{f.description}</td>
                                                        <td>0</td>
                                                        <td>
                                                            <i className="fas fa-ellipsis-v button-cursor-pointer" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true"></i>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                <a className="dropdown-item" href={`/university/faculty/${f.id}/details`}>Edit</a>
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

export default Faculty;