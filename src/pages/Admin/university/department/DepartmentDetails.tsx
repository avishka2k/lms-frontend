import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { Link, useParams } from "react-router-dom";
import {
    assignCourseToDepartment,
    getCoursesByDepartmentId,
    getCoursesWithoutAssigned,
    unassignCourseFromDepartment,
} from "../../../../services/api/course";
import { AssignButton, SaveButton } from "../../../../components/Admin/ButtonIndicator";
import PageLoading from "../../../../components/Admin/PageLoading";
import { notifyError, notifySuccess } from "../../../../components/notify";
import {getDepartmentById, updateDepartment} from "../../../../services/api/usiversity";

const DepartmentDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [courseLoading, setCourseLoading] = useState(true);
    const [departmentCourseLoading, setDepartmentCourseLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isAssign, setIsAssign] = useState(false);
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
    const [department, setDepartment] = useState<any>({
        id: '',
        cid: '',
        name: '',
        description: '',
        phone: '',
        email: '',
        createdDate: ''
    });
    const [courses, setCourses] = useState<any[]>([]);
    const [departmentCourses, setDepartmentCourses] = useState<any[]>([]);

    // Fetch department details using the id
    useEffect(() => {
        const fetchDepartmentDetails = async () => {
            const departmentData = await getDepartmentById(id || '');
            setDepartment(departmentData);
            setLoading(false);
        };
        fetchDepartmentDetails().then(r => r);
    }, [id]);

    // Fetch all courses
    const fetchCourses = async () => {
        const coursesData = await getCoursesWithoutAssigned();
        setCourses(coursesData);
        setCourseLoading(false);
    };
    useEffect(() => {
        fetchCourses().then(r => r);
    }, []);

    // Fetch courses by department ID
    const fetchCoursesByDepartment = async () => {
        const departmentCoursesData = await getCoursesByDepartmentId(id || '');
        setDepartmentCourses(departmentCoursesData);
        setDepartmentCourseLoading(false);
    };
    useEffect(() => {
        fetchCoursesByDepartment().then(r => r);
    }, [id]);


    // Initialize DataTables for department courses
    useEffect(() => {
        if (!departmentCourseLoading) {
            const table = $('#department-courses-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
                buttons: [
                    {
                        text: 'Add Course',
                        action: function (e: any, dt: any, node: any, config: any) {
                            $('<button type="button" style="display:none;" data-toggle="modal" data-target="#addCourseModal"></button>')
                                .appendTo('body')
                                .trigger('click')
                                .remove();
                        },
                    },
                ],
            });

            table.buttons().container().appendTo('#department-courses-table_wrapper .col-md-6:eq(0)');

            return () => {
                table.destroy();
            }
        }
    }, [departmentCourseLoading, id, loading]);

    // Initialize DataTables for all courses
    useEffect(() => {
        if (!courseLoading) {
            const depTable = $('#course-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
            });

            return () => {
                depTable.destroy();
            }
        }
    }, [courseLoading, id, loading]);

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

    const handleCheckboxChange = (id: string) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const getCheckedIds = () => {
        return Object.keys(checkedItems).filter(id => checkedItems[id]);
    };

    const handleUnassign = async (cid: string) => {
        await unassignCourseFromDepartment(id || '', cid);
        await fetchCoursesByDepartment();
        await fetchCourses();
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
                checkedIds.map(async (courseId: any) => {
                    console.log(courseId);
                    await assignCourseToDepartment(id || '', courseId);
                })
            );
            setTimeout(() => {
                setIsAssign(false);
            }, 1000);
            notifySuccess("Course assigned successfully");
            await fetchCoursesByDepartment();
            await fetchCourses();

        } catch (error: any) {
            notifyError(error.response.data);
            setIsAssign(false);
        }
    }

    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
            <BreadCrumb title={department.name ? department.name : 'Loading...'} page_name="Course" parent_name="University" />
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
                                        <a className="nav-link" id="custom-tabs-four-courses-tab" data-toggle="pill" href={"#custom-tabs-four-courses"} role="tab" aria-controls="custom-tabs-four-courses" aria-selected="false">Courses</a>
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
                                                        <label htmlFor="cId" className="col-sm-2 col-form-label">Department ID <span className="text-danger">*</span></label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="cId" name="cId" value={department.did} disabled />
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
                                            <div className="modal fade" id="addCourseModal">
                                                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title">Add course to department</h4>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            {courseLoading ? (
                                                                <div>Loading...</div>
                                                            ) : (
                                                                <table id="course-table" className="table table-hover text-nowrap">
                                                                    <thead>
                                                                    <tr>
                                                                        {/* <th className="col-3">
                                                                                <div className="custom-control custom-checkbox">
                                                                                    <input type="checkbox" name="terms" className="custom-control-input scope-checkbox" id="scopeMainCheck" />
                                                                                    <label className="custom-control-label" htmlFor="scopeMainCheck"></label>
                                                                                    Course ID
                                                                                </div>
                                                                            </th> */}
                                                                        <th className="col-3">Course ID</th>
                                                                        <th className="col-3">Course Name</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {
                                                                        Array.isArray(courses) && courses.length > 0 ? (
                                                                            courses.map((d: any) => (
                                                                                <tr key={d.id}>
                                                                                    <td>
                                                                                        <div className="custom-control custom-checkbox">
                                                                                            <input type="checkbox" name="terms" className="custom-control-input scope-checkbox" id={`checkbox-${d.id}`}
                                                                                                   checked={checkedItems[d.id]} onChange={() => handleCheckboxChange(d.id)} />
                                                                                            <label className="custom-control-label" htmlFor={`checkbox-${d.id}`}></label>
                                                                                            <Link to={``}>{d.cid}</Link>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>{d.title}</td>
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

                                            {departmentCourseLoading ? (
                                                <div>Loading...</div>
                                            ) : (
                                                <table id="department-courses-table" className="table table-hover text-nowrap">
                                                    <thead>
                                                    <tr>
                                                        <th className="col-2">Course ID</th>
                                                        <th className="col-3">Course Name</th>
                                                        <th className="col-1"></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {
                                                        Array.isArray(departmentCourses) && departmentCourses.length > 0 ? (
                                                            departmentCourses.map((d: any) => (
                                                                <tr key={d.id}>
                                                                    <td><a href="#">{d.cid}</a></td>
                                                                    <td>{d.title}</td>
                                                                    <td>
                                                                        <i className="fas fa-ellipsis-v button-cursor-pointer" typeof="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"></i>
                                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                            <button className="dropdown-item text-danger" onClick={() => handleUnassign(d.id)}>Unassign</button>
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

export default DepartmentDetails;