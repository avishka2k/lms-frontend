import BreadCrumb from "../../../components/Admin/Breadcrumb";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getApplicants} from "../../../services/api/applicants";
import {getCourseNameById} from "../../../services/api/course";
import PageLoading from "../../../components/Admin/PageLoading";

const Dashboard = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [courseNames, setCourseNames] = useState<{ [key: string]: string }>({});

    const fetchData = async () => {
        try {
            const applicants = await getApplicants();

            const courseNamesMap: { [key: string]: string } = {};

            // Fetch course names for each applicant
            for (const applicant of applicants) {
                const courseName = await getCourseNameById(applicant.course);
                courseNamesMap[applicant.course] = courseName;
            }

            setCourseNames(courseNamesMap);
            setData(applicants);
            setLoading(false);
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <PageLoading />;
    }


    return (
        <section className="content">
            <BreadCrumb page_name="Dashboard" parent_name="" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        
                        <div className="small-box bg-info">
                            <div className="inner">
                                <h3>2</h3>

                                <p>New Applicants</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-person-add"></i>
                            </div>
                            <a href="#" className="small-box-footer">More info <i
                                className="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        
                        <div className="small-box bg-success">
                            <div className="inner">
                                <h3>5</h3>

                                <p>Students</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-person"></i>
                            </div>
                            <a href="#" className="small-box-footer">More info <i
                                className="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        
                        <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>3</h3>

                                <p>Lecturers</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-person"></i>
                            </div>
                            <a href="#" className="small-box-footer">More info <i
                                className="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        
                        <div className="small-box bg-danger">
                            <div className="inner">
                                <h3>34</h3>

                                <p>Unique Visitors</p>
                            </div>
                            <div className="icon">
                                <i className="ion ion-pie-graph"></i>
                            </div>
                            <a href="#" className="small-box-footer">More info <i
                                className="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header border-0">
                                <div className="d-flex justify-content-between">
                                    <h3 className="card-title">Online Visitors</h3>
                                    <a href="javascript:void(0);">View Report</a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex">
                                    <p className="d-flex flex-column">
                                        <span className="text-bold text-lg">34</span>
                                        <span>Visitors Over Time</span>
                                    </p>
                                    <p className="ml-auto d-flex flex-column text-right">
                                        <span className="text-success">
                                          <i className="fas fa-arrow-up"></i> 12.5%
                                        </span>
                                        <span className="text-muted">Since last week</span>
                                    </p>
                                </div>

                                <div className="position-relative mb-4">
                                    <canvas id="visitors-chart" height="200"></canvas>
                                </div>

                                <div className="d-flex flex-row justify-content-end">
                                  <span className="mr-2">
                                    <i className="fas fa-square text-primary"></i> This Week
                                  </span>
                                  <span>
                                    <i className="fas fa-square text-gray"></i> Last Week
                                  </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header border-0">
                                <h3 className="card-title">New Applicants</h3>
                                <div className="card-tools">
                                    <a href="#" className="btn btn-tool btn-sm">
                                        <i className="fas fa-download"></i>
                                    </a>
                                    <a href="#" className="btn btn-tool btn-sm">
                                        <i className="fas fa-bars"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="card-body table-responsive p-0">
                                <table className="table table-striped table-valign-middle">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>More</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                      Array.isArray(data) && data.length > 0 ? (
                                        data.map((applicant: any) => (
                                            <tr>
                                                <td>
                                                    <img src="/dist/img/default-150x150.png" alt="Product 1"
                                                         className="img-circle img-size-32 mr-2"/>
                                                    {applicant.fullName}
                                                </td>
                                                <td>{courseNames[applicant.course]}</td>
                                                <td>
                                                    <a href="#" className="text-muted">
                                                        <i className="fas fa-search"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                        ) : (
                                            <></>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/* /.container-fluid */}
        </section>
    );
}

export default Dashboard;
