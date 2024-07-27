import { Link, NavLink } from "react-router-dom";

const BreadCrumb = ({parent_name, page_name}: { parent_name: string, page_name: string}) => {
    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">{page_name}</h1>
                    </div>{/* /.col */}
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to="#">{parent_name}</Link></li>
                            <li className="breadcrumb-item active">{page_name}</li>
                        </ol>
                    </div>{/* /.col */}
                </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>
    );
}

export default BreadCrumb;