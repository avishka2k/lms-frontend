import {Link} from "react-router-dom";

const Materials = () => {

    return (
        <>
            <div className="content-header">
                <div className="container">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Course Materials</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/student"}>Home</Link></li>
                                <li className="breadcrumb-item active">Materials</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="content">
                <div className="container">
                </div>
            </div>
        </>
    );
}

export default Materials;