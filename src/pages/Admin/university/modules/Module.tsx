import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { Link, useNavigate } from "react-router-dom";
import { deleteModule, getModules } from "../../../../services/api/course";
import PageLoading from "../../../../components/Admin/PageLoading";

const Module = () => {
    const [module, setModule] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const listModules = async () => {
        const data = await getModules();
        setModule(data);
        setLoading(false);
    }

    useEffect(() => {
        listModules().then(r => r);
    }, []);

    useEffect(() => {
        if (!loading) {
            const table = $('#module-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
                buttons: [
                    {
                        text: 'Create New',
                        action: function (e: any, dt: any, node: any, config: any) {
                            navigate("/admin/university/module/new");
                        },
                    },
                ],
            });
            table.buttons().container().appendTo('#module-table_wrapper .col-md-6:eq(0)');

            return () => {
                table.destroy();
            }
        }

    }, [loading]);

    const handleDelete = async (id: string) => {
        await deleteModule(id);
        await listModules();
    }

    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
            <BreadCrumb page_name="Module" parent_name="University" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <table id="module-table" className="table table-hover text-nowrap">
                                    <thead>
                                    <tr>
                                        <th className="col-2">Module ID</th>
                                        <th className="col-4">Module Name</th>
                                        <th className="col-3">Students</th>
                                        <th className="col-1"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        Array.isArray(module) && module.length > 0 ? (
                                            module.map((f: any) => (
                                                <tr key={f.id}>
                                                    <td>{f.mid}</td>
                                                    <td><Link
                                                        to={`/admin/university/module/${f.id}/details`}>{f.title}</Link>
                                                    </td>
                                                    <td>0</td>
                                                    <td>
                                                        <i className="fas fa-ellipsis-v button-cursor-pointer"
                                                           id="dropdownMenuButton1" data-toggle="dropdown"
                                                           aria-haspopup="true"></i>
                                                        <div className="dropdown-menu"
                                                             aria-labelledby="dropdownMenuButton1">
                                                            <a className="dropdown-item"
                                                               href={`/admin/university/module/${f.id}/details`}>Edit</a>
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

export default Module;