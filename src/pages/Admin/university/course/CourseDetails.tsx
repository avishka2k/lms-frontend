import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { Link, useParams } from "react-router-dom";
import {
    assignModuleToCourse,
    getModulesByCourseId,
    getModulesWithoutAssigned,
    getCourseById,
    unassignModuleFromCourse,
    updateCourse
} from "../../../../services/api/course";
import { AssignButton, SaveButton } from "../../../../components/Admin/ButtonIndicator";
import PageLoading from "../../../../components/Admin/PageLoading";
import { notifyError, notifySuccess } from "../../../../components/notify";

const CourseDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [moduleLoading, setModuleLoading] = useState(true);
    const [courseModuleLoading, setCourseModuleLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isAssign, setIsAssign] = useState(false);
    const [course, setCourse] = useState<any>({
        id: '',
        cid: '',
        name: '',
        description: '',
        duration: '',
        credits: '',
        format: '',
        language: '',
        createdDate: ''
    });
    const [modules, setModules] = useState<any[]>([]);
    const [courseModules, setCourseModules] = useState<any[]>([]);

    // Fetch course details using the id
    useEffect(() => {
        const fetchCourseDetails = async () => {
            const courseData = await getCourseById(id || '');
            setCourse(courseData);
            setLoading(false);
        };
        fetchCourseDetails().then(r => r);
    }, [id]);

    // Fetch all modules
    const fetchModules = async () => {
        const modulesData = await getModulesWithoutAssigned();
        setModules(modulesData);
        console.log(modulesData);
        setModuleLoading(false);
    };
    useEffect(() => {
        fetchModules().then(r => r);
    }, []);

    // Fetch modules by course ID
    const fetchModulesByCourse = async () => {
        const courseModulesData = await getModulesByCourseId(id || '');
        setCourseModules(courseModulesData);
        setCourseModuleLoading(false);
    };
    useEffect(() => {
        fetchModulesByCourse().then(r => r);
    }, [id]);

    // Initialize DataTables for course modules
    useEffect(() => {
        if (!courseModuleLoading) {
            const table = $('#course-modules-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
                buttons: [
                    {
                        text: 'Add Module',
                        action: function (e: any, dt: any, node: any, config: any) {
                            $('<button type="button" style="display:none;" data-toggle="modal" data-target="#addModuleModal"></button>')
                                .appendTo('body')
                                .trigger('click')
                                .remove();
                        },
                    },
                ],
            });

            table.buttons().container().appendTo('#course-modules-table_wrapper .col-md-6:eq(0)');

            return () => {
                table.destroy();
            }
        }
    }, [courseModuleLoading, id, loading]);

    // Initialize DataTables for all modules
    useEffect(() => {
        if (!moduleLoading) {
            const depTable = $('#module-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
            });

            return () => {
                depTable.destroy();
            }
        }
    }, [moduleLoading, id, loading]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCourse((prevCourse: any) => ({
            ...prevCourse,
            [name]: value
        }));
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSaving(true);
        if (id) {
            await updateCourse(id, course);
        }
        setTimeout(() => {
            setIsSaving(false);
        }, 1000);
    };

    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxChange = (id: string) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const getCheckedIds = () => {
        return Object.keys(checkedItems).filter(id => checkedItems[id]);
    };

    const handleUnassign = async (id: string) => {
        await unassignModuleFromCourse(id);
        await fetchModulesByCourse();
        await fetchModules();
    }

    // next day start from here
    const handleAssign = async () => {
        const checkedIds = getCheckedIds();
        if (checkedIds.length === 0) {
            return;
        }
        try {
            setIsAssign(true);
            await Promise.all(
                checkedIds.map(async (moduleId: any) => {
                    await assignModuleToCourse(id || '', moduleId);
                })
            );
            setTimeout(() => {
                setIsAssign(false);
            }, 1000);
            notifySuccess("Module assigned successfully");
            await fetchModulesByCourse();
            await fetchModules();

        } catch (error: any) {
            notifyError(error.response.data);
        }
    }


    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
            < BreadCrumb title={course.title ? course.title : 'Loading...'} page_name="Course" parent_name="University" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-primary card-outline card-outline-tabs">
                            <div className="card-header p-0 border-bottom-0">
                                <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="custom-tabs-four-details-tab" data-toggle="pill" href={"#custom-tabs-four-details"} role="tab" aria-controls="custom-tabs-four-details" aria-selected="true">Details</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="custom-tabs-four-modules-tab" data-toggle="pill" href={"#custom-tabs-four-modules"} role="tab" aria-controls="custom-tabs-four-modules" aria-selected="false">Modules</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="custom-tabs-four-settings-tab" data-toggle="pill" href={"#custom-tabs-four-settings"} role="tab" aria-controls="custom-tabs-four-settings" aria-selected="false">Settings</a>
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
                                                        <label htmlFor="cId" className="col-sm-2 col-form-label">Course
                                                            ID <span className="text-danger">*</span></label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="cId"
                                                                   name="cId" value={course.cid} disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="createdDate"
                                                               className="col-sm-2 col-form-label">Created At <span
                                                            className="text-danger">*</span></label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="createdDate"
                                                                   name="createdDate"
                                                                   value={new Date(course.createdDate).toLocaleString()}
                                                                   disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="title" className="col-sm-2 col-form-label">Course
                                                            Title</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="title"
                                                                   name="title" value={course.title}
                                                                   onChange={handleChange} required/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="description"
                                                               className="col-sm-2 col-form-label">Description</label>
                                                        <div className="col-sm-10">
                                                            <textarea className="form-control" id="description"
                                                                      name="description" value={course.description}
                                                                      onChange={handleChange}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="duration" className="col-sm-2 col-form-label">Duration
                                                            (Years)</label>
                                                        <div className="col-sm-10">
                                                            <input type="number" className="form-control" id="duration"
                                                                   name="duration" value={course.duration}
                                                                   onChange={handleChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="credits"
                                                               className="col-sm-2 col-form-label">Credits</label>
                                                        <div className="col-sm-10">
                                                            <input type="number" className="form-control" id="credits"
                                                                   name="credits" value={course.credits}
                                                                   onChange={handleChange}/>
                                                        </div>
                                                    </div>

                                                    <div className="form-group row">
                                                        <label htmlFor="credits"
                                                               className="col-sm-2 col-form-label">Language</label>
                                                        <div className="col-sm-10">
                                                            <select className="form-control" id="language" name="language" value={course.language} onChange={handleChange}>
                                                                <option value="">Select Language</option>
                                                                <option value="English">English</option>
                                                                <option value="Sinhala">Sinhala</option>
                                                                <option value="Hindi">Hindi</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form-group row mt-4">
                                                        <label className="col-sm-2 col-form-label"></label>
                                                        <div className="col-sm-10 d-flex">
                                                            <SaveButton isSaving={isSaving} onClick={handleUpdate}/>
                                                            <button type="reset"
                                                                    className="btn btn-default float-right">Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="tab-pane fade" id="custom-tabs-four-modules" role="tabpanel"
                                             aria-labelledby="custom-tabs-four-modules-tab">
                                            <div className="modal fade" id="addModuleModal">
                                                <div
                                                    className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title">Add module to course</h4>
                                                            <button type="button" className="close" data-dismiss="modal"
                                                                    aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            {moduleLoading ? (
                                                                <div>Loading...</div>
                                                            ) : (
                                                                <table id="module-table" className="table table-hover text-nowrap">
                                                                    <thead>
                                                                        <tr>
                                                                            {/* <th className="col-3">
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input type="checkbox" name="terms" className="custom-control-input scope-checkbox" id="scopeMainCheck" />
                                                                                    <label className="custom-control-label" htmlFor="scopeMainCheck"></label>
                                                                                    Module ID
                                                                                </div>
                                                                            </th> */}
                                                                            <th className="col-3">Module ID</th>
                                                                            <th className="col-3">Module Name</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            Array.isArray(modules) && modules.length > 0 ? (
                                                                                modules.map((m: any) => (
                                                                                    <tr key={m.id}>
                                                                                        <td>
                                                                                            <div className="custom-control custom-checkbox">
                                                                                                <input type="checkbox" name="terms" className="custom-control-input scope-checkbox" id={`checkbox-${m.id}`}
                                                                                                       checked={checkedItems[m.id]} onChange={() => handleCheckboxChange(m.id)} />
                                                                                                <label className="custom-control-label" htmlFor={`checkbox-${m.id}`}></label>

                                                                                                <Link to={``}>{m.mid}</Link>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>{m.title}</td>
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
                                                            <AssignButton onClick={() => handleAssign()} isSaving={isAssign} disabled={Object.keys(checkedItems).filter(id => checkedItems[id]).length === 0} />
                                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {courseModuleLoading ? (
                                                <div>Loading...</div>
                                            ) : (
                                                <table id="course-modules-table" className="table table-hover text-nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th className="col-2">Module ID</th>
                                                            <th className="col-3">Module Name</th>
                                                            <th className="col-1"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            Array.isArray(courseModules) && courseModules.length > 0 ? (
                                                                courseModules.map((m: any) => (
                                                                    <tr key={m.id}>
                                                                        <td><a href="#">{m.mid}</a></td>
                                                                        <td>{m.title}</td>
                                                                        <td>
                                                                            <i className="fas fa-ellipsis-v button-cursor-pointer" typeof="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"></i>
                                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                                <button className="dropdown-item text-danger" onClick={() => handleUnassign(m.id)}>Unassign</button>
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

export default CourseDetails;