import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import 'datatables.net-buttons-bs5';
import { useParams } from "react-router-dom";
import {
    getModuleById,
    updateModule
} from "../../../../services/api/course";
import { SaveButton } from "../../../../components/Admin/ButtonIndicator";
import PageLoading from "../../../../components/Admin/PageLoading";

const ModuleDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [module, setModule] = useState<any>({
        id: '',
        mid: '',
        title: '',
        description: '',
        duration: '',
        credits: '',
        createdDate: '',
        semester: ''
    });

    // Fetch module details using the id
    useEffect(() => {
        const fetchModuleDetails = async () => {
            const moduleData = await getModuleById(id || '');
            setModule(moduleData);
            setLoading(false);
        };
        fetchModuleDetails().then(r => r);
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setModule((prevModule: any) => ({
            ...prevModule,
            [name]: value
        }));
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(module);

        setIsSaving(true);
        if (id) {
            await updateModule(id, module);
        }
        setTimeout(() => {
            setIsSaving(false);
        }, 1000);
    };

    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
            <BreadCrumb title={module.title ? module.title : 'Loading...'} page_name="Module" parent_name="University" />
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
                                        <a className="nav-link" id="custom-tabs-four-lecturer-tab" data-toggle="pill" href={"#custom-tabs-four-lecturer"} role="tab" aria-controls="custom-tabs-four-lecturer" aria-selected="false">Lecturer</a>
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
                                                        <label htmlFor="fId" className="col-sm-2 col-form-label">Module
                                                            ID <span className="text-danger">*</span></label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="fId"
                                                                   name="mId" value={module.mid} disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="createdDate"
                                                               className="col-sm-2 col-form-label">Created At <span
                                                            className="text-danger">*</span></label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="createdDate"
                                                                   name="createdDate"
                                                                   value={new Date(module.createdDate).toLocaleString()}
                                                                   disabled/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="title" className="col-sm-2 col-form-label">Module
                                                            Title</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="title"
                                                                   name="title" value={module.title}
                                                                   onChange={handleChange} required/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="description"
                                                               className="col-sm-2 col-form-label">Description</label>
                                                        <div className="col-sm-10">
                                                            <textarea className="form-control" id="description"
                                                                      name="description" value={module.description}
                                                                      onChange={handleChange}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="duration" className="col-sm-2 col-form-label">Duration
                                                            (Hours)</label>
                                                        <div className="col-sm-10">
                                                            <input type="number" className="form-control" id="duration"
                                                                   name="duration" value={module.duration}
                                                                   onChange={handleChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="credits"
                                                               className="col-sm-2 col-form-label">Credits</label>
                                                        <div className="col-sm-10">
                                                            <input type="number" className="form-control" id="credits"
                                                                   name="credits" value={module.credits}
                                                                   onChange={handleChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="semester"
                                                               className="col-sm-2 col-form-label">Semester</label>
                                                        <div className="col-sm-10">
                                                            <select className="form-control" id="semester" name="semester" value={module.semester} onChange={handleChange}>
                                                                <option value="">Select Semester</option>
                                                                <option value="Year 1 - Semester 1">Year 1 Semester 1</option>
                                                                <option value="Year 1 - Semester 2">Year 1 Semester 2</option>
                                                                <option value="Year 2 - Semester 1">Year 2 Semester 1</option>
                                                                <option value="Year 2 - Semester 2">Year 2 Semester 2</option>
                                                                <option value="Year 3 - Semester 1">Year 3 Semester 1</option>
                                                                <option value="Year 3 - Semester 2">Year 3 Semester 2</option>
                                                                <option value="Year 4 - Semester 1">Year 4 Semester 1</option>
                                                                <option value="Year 4 - Semester 2">Year 4 Semester 2</option>
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
                                        <div className="tab-pane fade" id="custom-tabs-four-lecturer" role="tabpanel"
                                             aria-labelledby="custom-tabs-four-lecturer-tab">

                                        </div>

                                        <div className="tab-pane fade" id="custom-tabs-four-settings" role="tabpanel"
                                             aria-labelledby="custom-tabs-four-settings-tab">

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

export default ModuleDetails;