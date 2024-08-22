import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";
import { createCourse } from "../../../../services/api/course"; // Updated API function
import { CreateButton } from "../../../../components/Admin/ButtonIndicator";
import { useState } from "react";

const NewCourse = () => {
    const navigate = useNavigate();
    const [isCreating, setIsCreating] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsCreating(true);
        const create = createCourse({
            title: e.target.title.value,
            description: e.target.description.value,
            lecturer: e.target.lecturer.value,
            duration: parseInt(e.target.duration.value, 10),
            level: e.target.level.value,
            language: e.target.language.value,
            format: e.target.format.value,
            credits: parseInt(e.target.credits.value, 10),
        });

        if (create && await create.then((res) => res?.status) === 201) {
            e.target.reset();

            const id = await create.then((res) => res?.data.id);

            navigate(`/university/course/${id}/details`);
        }
        setIsCreating(false);
    }

    return (
        <section className="content">
            <BreadCrumb page_name="Course" parent_name="University" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card col-md-8">
                            <form className="form-horizontal" id="createCourseForm" onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="title" className="col-sm-2 col-form-label">Course Title <span className="text-danger">*</span></label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="title" name="title" required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                        <div className="col-sm-10">
                                            <textarea className="form-control" id="description" name="description"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="lecturer" className="col-sm-2 col-form-label">Lecturer</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="lecturer" name="lecturer" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="duration" className="col-sm-2 col-form-label">Duration (hours)</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control" id="duration" name="duration" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="level" className="col-sm-2 col-form-label">Level</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="level" name="level" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="language" className="col-sm-2 col-form-label">Language</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="language" name="language" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="format" className="col-sm-2 col-form-label">Format</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="format" name="format" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="credits" className="col-sm-2 col-form-label">Credits</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control" id="credits" name="credits" />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-4">
                                        <label className="col-sm-2 col-form-label"></label>
                                        <div className="col-sm-10 d-flex">
                                            <CreateButton isSaving={isCreating} />
                                            <button type="reset" className="btn btn-default float-right">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
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

export default NewCourse;