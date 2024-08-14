import BreadCrumb from "../../../components/Admin/Breadcrumb";

const Courses = () => {
    return (
        <section className="content">
            < BreadCrumb page_name="Courses" parent_name="University" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/* /.card-header */}
                            <div className="card-body">
                                Courses
                            </div>
                            {/* /.card-body */}
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

export default Courses;