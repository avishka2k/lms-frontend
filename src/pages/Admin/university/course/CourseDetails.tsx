import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { Link, useParams } from "react-router-dom";
import { getCourseById, updateCourse, deleteCourse } from "../../../../services/api/course"; 
import { AssignButton, SaveButton } from "../../../../components/Admin/ButtonIndicator";
import PageLoading from "../../../../components/Admin/PageLoading";
import { notifyError, notifySuccess } from "../../../../components/notify";

const CourseDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [modelLoading, setModelLoading] = useState(true);
    const [courseModelLoading, setCourseModelLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isAssign, setIsAssign] = useState(false);
    const [course, setCourse] = useState<{
        id: number;
        title: string;
        description: string;
        lecturer: string;
        duration: number; 
        level: string;
        language: string;
        format: string; 
        credits: number;
        createdDate: string;
    }>({
        id: 0,
        title: '',
        description: '',
        lecturer: '',
        duration: 0,
        level: '',
        language: '',
        format: '',
        credits: 0,
        createdDate: ''
    });
    const [models, setModels] = useState<any[]>([]);
    const [courseModels, setCourseModels] = useState<any[]>([]);

    // Fetch course details using the id
    useEffect(() => {
        const fetchCourseDetails = async () => {
            if (typeof id === 'number') {
                try {
                    const courseData = await getCourseById(id);
                    setCourse(courseData);
                } catch (error) {
                    console.error("Failed to fetch course details:", error);
                    // Optionally, notify the user of the error here
                } finally {
                    setLoading(false);
                }
            } else {
                console.error("Invalid ID: ID should be a number");
                setLoading(false);
            }
        };
    
        fetchCourseDetails();
    }, [id]);

    // Fetch all models
    // const fetchModels = async () => {
    //     const modelsData = await getModelsWithoutAssigned();
    //     setModels(modelsData);
    //     setModelLoading(false);
    // };
    // useEffect(() => {
    //     fetchModels();
    // }, []);

    // Fetch models by course ID
    const fetchModelsByCourse = async () => {
        if (typeof id === 'number') {
            try {
                setCourseModelLoading(true);
                const courseModelsData = await getCourseById(id);
                setCourseModels(courseModelsData);
            } catch (error) {
                console.error("Failed to fetch course models:", error);
                // Optionally, notify the user of the error here
            } finally {
                setCourseModelLoading(false);
            }
        } else {
            console.error("Invalid ID: ID should be a number");
            setCourseModelLoading(false);
        }
    };
    useEffect(() => {
        fetchModelsByCourse();
    }, [id]);

    // Initialize DataTables for course models
    useEffect(() => {
        if (!courseModelLoading) {
            const table = $('#course-models-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
                buttons: [
                    {
                        text: 'Add Model',
                        action: function (e: any, dt: any, node: any, config: any) {
                            $('<button type="button" style="display:none;" data-toggle="modal" data-target="#addModelModal"></button>')
                                .appendTo('body')
                                .trigger('click')
                                .remove();
                        },
                    },
                ],
            });

            table.buttons().container().appendTo('#course-models-table_wrapper .col-md-6:eq(0)');

            return () => {
                table.destroy();
            }
        }
    }, [courseModelLoading, id, loading]);

    // Initialize DataTables for all models
    useEffect(() => {
        if (!modelLoading) {
            const depTable = $('#model-table').DataTable({
                lengthChange: false,
                autoWidth: false,
                ordering: false,
            });

            return () => {
                depTable.destroy();
            }
        }
    }, [modelLoading, id, loading]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCourse((prevCourse: any) => ({
            ...prevCourse,
            [name]: value
        }));
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        setIsSaving(true);
    
        if (typeof id === 'number') {
            try {
                await updateCourse(id, course);
            } catch (error) {
                console.error("Failed to update course:", error);
            }
        } else {
            console.error("Invalid ID: ID should be a number");
        }

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

    // const handleUnassign = async (id: string) => {
    //     await unassignModelFromCourse(id);
    //     fetchModelsByCourse();
    //     fetchModels();
    // }

    // const handleAssign = async () => {
    //     const checkedIds = getCheckedIds();
    //     if (checkedIds.length === 0) {
    //         return;
    //     }
    //     try {
    //         setIsAssign(true);
    //         await Promise.all(
    //             checkedIds.map(async (modelId: any) => {
    //                 await assignModelToCourse(id || '', modelId);
    //             })
    //         );
    //         setTimeout(() => {
    //             setIsAssign(false);
    //         }, 1000);
    //         notifySuccess("Model assigned successfully");
    //         fetchModelsByCourse();
    //         fetchModels();

    //     } catch (error: any) {
    //         notifyError(error.response.data);
    //     }
    // }

    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
        <BreadCrumb title={course.title ? course.title : 'Loading...'} page_name="Course" parent_name="University" />
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card card-primary card-outline card-outline-tabs">
                        <div className="card-header p-0 border-bottom-0">
                            <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="custom-tabs-four-details-tab" data-toggle="pill" href="#custom-tabs-four-details" role="tab" aria-controls="custom-tabs-four-details" aria-selected="true">Details</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="custom-tabs-four-modules-tab" data-toggle="pill" href="#custom-tabs-four-modules" role="tab" aria-controls="custom-tabs-four-modules" aria-selected="false">Modules</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="custom-tabs-four-settings-tab" data-toggle="pill" href="#custom-tabs-four-settings" role="tab" aria-controls="custom-tabs-four-settings" aria-selected="false">Settings</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div className="tab-content" id="custom-tabs-four-tabContent">
                                    <div className="tab-pane fade show active" id="custom-tabs-four-details" role="tabpanel" aria-labelledby="custom-tabs-four-details-tab">
                                        <form className="form-horizontal" id="updateCourseForm" onSubmit={handleUpdate}>
                                            <div className="card-body">
                                                <div className="form-group row">
                                                    <label htmlFor="courseId" className="col-sm-2 col-form-label">Course ID</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" id="courseId" name="id" value={course.id} disabled />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="createdDate" className="col-sm-2 col-form-label">Created At</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" id="createdDate" name="createdDate" value={new Date(course.createdDate).toLocaleString()} disabled />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="title" className="col-sm-2 col-form-label">Course Title</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" id="title" name="title" value={course.title} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                                    <div className="col-sm-10">
                                                        <textarea className="form-control" id="description" name="description" value={course.description} onChange={handleChange}></textarea>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="lecturer" className="col-sm-2 col-form-label">Lecturer</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" id="lecturer" name="lecturer" value={course.lecturer} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="duration" className="col-sm-2 col-form-label">Duration (hours)</label>
                                                    <div className="col-sm-10">
                                                        <input type="number" className="form-control" id="duration" name="duration" value={course.duration} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="level" className="col-sm-2 col-form-label">Level</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" id="level" name="level" value={course.level} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="language" className="col-sm-2 col-form-label">Language</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" id="language" name="language" value={course.language} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="format" className="col-sm-2 col-form-label">Format</label>
                                                    <div className="col-sm-10">
                                                        <input type="text" className="form-control" id="format" name="format" value={course.format} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="credits" className="col-sm-2 col-form-label">Credits</label>
                                                    <div className="col-sm-10">
                                                        <input type="number" className="form-control" id="credits" name="credits" value={course.credits} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="form-group row mt-4">
                                                    <label className="col-sm-2 col-form-label"></label>
                                                    <div className="col-sm-10 d-flex">
                                                        <button type="submit" className="btn btn-primary" disabled={isSaving}>
                                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                                        </button>
                                                        <button type="reset" className="btn btn-default ml-2">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="tab-pane fade" id="custom-tabs-four-modules" role="tabpanel" aria-labelledby="custom-tabs-four-modules-tab">
                                        {/* Module content */}
                                    </div>
                                    <div className="tab-pane fade" id="custom-tabs-four-settings" role="tabpanel" aria-labelledby="custom-tabs-four-settings-tab">
                                        {/* Settings content */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
     
    );
}
}
export default CourseDetails;
  
    
            