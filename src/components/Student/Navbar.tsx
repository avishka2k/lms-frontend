
import { Auth } from 'aws-amplify';
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Navbar = () => {

    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, [username]);

    const fetchUser = async () => {
        try {
            const session = await Auth.currentSession();
            const username = session.getIdToken().payload["cognito:username"];
            setUsername(username);
        } catch (error) {
            console.log("Error fetching JWT token:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await Auth.signOut();
            navigate("/")
        } catch (error) {
            console.log('Error signing out: ', error);
        }
    };

    const onClickProfile = () => {
        navigate("/student/profile");
    }

    return (
        <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
            <div className="container">
                <Link to={"/student"} className="navbar-brand">
                    {/*<img src="/dist/img/main-logo.png" alt="LMS Logo"*/}
                    {/*     className="brand-image img-circle"/>*/}
                    <span className="brand-text font-weight-bolder">LMS</span>
                    <span className="text-sm">Student</span>
                </Link>


                <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                    
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to={"/student"} className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/student/announcements"} className="nav-link">Announcements</Link>
                        </li>
                    </ul>

                    
                    <form className="form-inline ml-0 ml-md-3">
                        <div className="input-group input-group-sm">
                            <input className="form-control form-control-navbar" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <div className="input-group-append">
                                <button className="btn btn-navbar" type="submit">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <i className="far fa-bell"></i>
                            <span className="badge badge-danger navbar-badge">3</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <a href="#" className="dropdown-item">

                                <div className="media">
                                    <img src="../../dist/img/user1-128x128.jpg" alt="User Avatar"
                                         className="img-size-50 mr-3 img-circle"/>
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            Brad Diesel
                                            <span className="float-right text-sm text-danger"><i
                                                className="fas fa-star"></i></span>
                                        </h3>
                                        <p className="text-sm">Call me whenever you can...</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours
                                            Ago</p>
                                    </div>
                                </div>

                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">

                                <div className="media">
                                    <img src="../../dist/img/user8-128x128.jpg" alt="User Avatar"
                                         className="img-size-50 img-circle mr-3"/>
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            John Pierce
                                            <span className="float-right text-sm text-muted"><i
                                                className="fas fa-star"></i></span>
                                        </h3>
                                        <p className="text-sm">I got your message bro</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours
                                            Ago</p>
                                    </div>
                                </div>

                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">

                                <div className="media">
                                    <img src="../../dist/img/user3-128x128.jpg" alt="User Avatar"
                                         className="img-size-50 img-circle mr-3"/>
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            Nora Silvester
                                            <span className="float-right text-sm text-warning"><i
                                                className="fas fa-star"></i></span>
                                        </h3>
                                        <p className="text-sm">The subject goes here</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours
                                            Ago</p>
                                    </div>
                                </div>

                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <div className="user-panel d-flex">
                                <div className="info">
                                    <p className="d-block">{username}</p>
                                </div>
                                <div className="image">
                                    <img src="/dist/img/default-user.png" className="img-circle" alt="User"/>
                                </div>
                            </div>
                        </a>
                        <div className="dropdown-menu">
                            <button className="dropdown-item" type="button" onClick={onClickProfile}>Profile</button>
                            <button className="dropdown-item text-danger" type="button" onClick={handleSignOut}>Logout</button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;