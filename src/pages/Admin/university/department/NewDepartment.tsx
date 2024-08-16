import { useNavigate } from "react-router-dom";
import { createDepartment } from "../../../../services/api/usiversityService";
import BreadCrumb from "../../../../components/Admin/Breadcrumb";

const NewDepartment = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const create = createDepartment({
            name: e.target.name.value,
            description: e.target.description.value
        });

        if (create && await create.then((res) => res?.status) === 201) {
            e.target.reset();

            const id = await create.then((res) => res?.data.id);

            navigate(`/university/department/${id}/details`);
        }
    }

    return (
        <section className="content">
            < BreadCrumb page_name="Department" parent_name="University" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card col-md-8">
                            <form className="form-horizontal" id="createRoleForm" onSubmit={handleSubmit}>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-sm-2 col-form-label">Department Name <span className="text-danger">*</span></label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="name" name="name" required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                        <div className="col-sm-10">
                                            <textarea className="form-control" id="description" name="description"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row mt-4">
                                        <label className="col-sm-2 col-form-label"></label>
                                        <div className="col-sm-10 d-flex">
                                            <button type="submit" className="btn btn-primary mr-4">Create</button>
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

export default NewDepartment;