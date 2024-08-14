import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <a href="index3.html" className="brand-link">
                <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: 0.8 }} />
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>

            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">Alexander Pierce</a>
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
                            <NavLink to="/" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Dashboard
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-header">University Management</li>
                        <li className="nav-item">
                            <NavLink to="/university/faculty" className="nav-link">
                                <i className="fas fa-home nav-icon"></i>
                                <p>
                                    Faculty
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/university/department" className="nav-link">
                                <i className="fas fa-sitemap nav-icon"></i>
                                <p>
                                    Department
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/university/courses" className="nav-link">
                                <i className="fas fa-book nav-icon"></i>
                                <p>
                                    Courses
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/university/modules" className="nav-link">
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
                                    <span className="badge badge-info right">6</span>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink to="/student/applicants" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Applicants</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/student/onboarding" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Student Enroll</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="pages/layout/top-nav-sidebar.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Import Students</p>
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
                                    <NavLink to="/lecturer/onboarding" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Onboarding</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="pages/charts/flot.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Import Lecturers</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-header">Enrollment Management</li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="fas fa-plus-square nav-icon"></i>
                                <p>
                                    Enrollments
                                    <i className="right fas fa-angle-right"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <NavLink to="pages/charts/chartjs.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Enroll New Students</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="pages/charts/flot.html" className="nav-link">
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Batch Enrollments</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-header">Communication</li>
                        <li className="nav-item">
                            <NavLink to="announcements" className="nav-link">
                                <i className="fas fa-headset nav-icon"></i>
                                <p>
                                    Announcements
                                    <span className="badge badge-info right">2</span>
                                </p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/messages" className="nav-link">
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
                                <i className="fas fa-file-alt nav-icon"></i>
                                <p>
                                    Reports
                                </p>
                            </NavLink>
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