import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getModulesByCourseIdForLecturer} from "../../../services/api/course";
import {getLecturerDetailsByUsername} from "../../../services/api/user";
import {Auth} from "aws-amplify";
import PageLoading from "../../../components/Admin/PageLoading";

const LecturerHome = () => {

    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    const images = [
        "/dist/img/course-img/3173315.jpg",
        "/dist/img/course-img/3213221.jpg",
        "/dist/img/course-img/5952133.jpg",
        "/dist/img/course-img/3181113.jpg",
        "/dist/img/course-img/5319401.jpg",
        "/dist/img/course-img/3196599.jpg",
    ];

    const getRandomImage = () => {
        return images[Math.floor(Math.random() * images.length)];
    };

    const fetchUser = async () => {
        try {
            const session = await Auth.currentSession();
            return session.getIdToken().payload["cognito:username"];
        } catch (error) {
            console.log("Error fetching JWT token:", error);
        }
    };

    useEffect(() => {
        const fetchAndSetUserDetails = async () => {
            try {
                const username = await fetchUser();
                const userDetails = await getLecturerDetailsByUsername(username);
                const listModule = await getModulesByCourseIdForLecturer(userDetails.id);
                setModules(listModule);
            } catch (error) {
                console.log("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAndSetUserDetails().then(r => r);
    }, []);

    if (loading) {
        return <PageLoading />
    }

    return (
        <>
            <div className="content-header">
                <div className="container">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Your Modules</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/lecturer"}>Lecturer</Link></li>
                                <li className="breadcrumb-item active">Home</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            {modules.length === 0 ? (
                <div className="content d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                    <div className="">
                        No Module
                    </div>
                </div>
                ) : (
                <div className="content">
                    <div className="container">
                        <div className="row">
                            {modules.map((module: any, index) => (
                                <div className="col-lg-4" key={index}>
                                    <div className="card card-primary card-outline">
                                        <img src={getRandomImage()} alt="Card cover" className="card-img-top"/>
                                        <div className="card-body">
                                            <div className="card-text pb-2 text-secondary">
                                                {module.semester}
                                            </div>
                                            <h5 className="card-title">
                                                <Link className="text-dark" to={`/lecturer/${module.id}/materials`}>
                                                    <span className="text-black font-weight-bolder">{module.mid}</span> {module.title}
                                                </Link>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                )
            }
        </>
    );
}

export default LecturerHome;