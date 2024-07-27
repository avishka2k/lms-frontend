import BreadCrumb from "../../components/Admin/Breadcrumb";

const EmptyScreen = () => {
    return (
        <section className="content">
            < BreadCrumb page_name="Student Applicants" parent_name="Student" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/* /.card-header */}
                            <div className="card-body">
                                    Content
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

export default EmptyScreen;