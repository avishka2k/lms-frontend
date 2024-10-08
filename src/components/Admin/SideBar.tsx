import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {getApplicantsLength} from "../../services/api/applicants";

const Sidebar = () => {

    const [username, setUsername] = useState("");
    const [applicantLength, setApplicantLength] = useState(0);

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

    useEffect(() => {
        getApplicantsLength().then(
            data => {
                setApplicantLength(data);
            }
        )
    }, []);

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="index3.html" className="brand-link">
                <img src="/dist/img/main-logo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: 0.8 }} />
                <span className="brand-text font-weight-light">UNI LMS</span>
            </a>

            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="/dist/img/default-user.png" className="img-circle elevation-2" alt="User" />
                    </div>
                    <div className="info">
                        <a href="/profile" className="d-block">{username}</a>
                    </div>
                </div>

                {/* SidebarSearch Form */}
                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class with font-awesome or any other icon font library */}
                        <li className="nav-item">
                            <NavLink to="/admin/index" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-header">University Management</li>
                        <li className="nav-item">
                            <NavLink to="/admin/university/faculty" className="nav-link">
                                <i className="fas fa-home nav-icon"></i>
                                <p>
                                    Faculty
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/university/department" className="nav-link">
                                <i className="fas fa-sitemap nav-icon"></i>
                                <p>
                                    Department
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/university/course" className="nav-link">
                                <i className="fas fa-book nav-icon"></i>
                                <p>
                                    Course
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/university/module" className="nav-link">
                                <i className="fas fa-book-open nav-icon"></i>
                                <p>
                                    Modules
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-header">User Management</li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fas fa-graduation-cap nav-icon"></i>
                                <p>
                                    Students
                                    <i className="fas fa-angle-right right"></i>
                                    {applicantLength > 0 && <span className="badge badge-info right">{applicantLength}</span>}
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink to="/admin/student/applicants" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>
                                            Applicants
                                            {applicantLength > 0 && <span className="badge badge-info right">{applicantLength}</span>}
                                        </p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/admin/student/enrolled" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Enrolled Students</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fas fa-book-reader nav-icon"></i>
                                <p>
                                    Lecturers
                                    <i className="right fas fa-angle-right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink to="/admin/lecturer/onboarding" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>New</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/admin/lecturer/all" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>All Lecturers</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-header">Communication</li>
                        <li className="nav-item">
                            <NavLink to="/admin/announcements" className="nav-link">
                                <i className="fas fa-headset nav-icon"></i>
                                <p>
                                    Announcements
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/messages" className="nav-link">
                                <i className="fas fa-comment-alt nav-icon"></i>
                                <p>
                                    Messages
                                    <span className="badge badge-info right">2</span>
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-header">Others</li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fas fa-cog nav-icon"></i>
                                <p>
                                    Settings
                                    <i className="fas fa-angle-right right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink to="pages/UI/general.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>General Settings</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="pages/UI/icons.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>User Settings</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="pages/UI/buttons.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Notification Settings</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink to="pages/calendar.html" className="nav-link">
                                <i className="fas fa-question-circle nav-icon"></i>
                                <p>
                                    Support
                                </p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    );
}

export default Sidebar;