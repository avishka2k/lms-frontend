
import { Auth } from 'aws-amplify';
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await Auth.signOut();
            navigate("/")
        } catch (error) {
            console.log('Error signing out: ', error);
        }
    };
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                {/* Notifications Dropdown Menu */}
                <li className="nav-item dropdown">
                    <button className="nav-link border-0 bg-transparent" data-toggle="dropdown">
                        <i className="far fa-bell"></i>
                        <span className="badge badge-warning navbar-badge">15</span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span className="dropdown-item dropdown-header">15 Notifications</span>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item">
                            <i className="fas fa-envelope mr-2"></i> 4 new messages
                            <span className="float-right text-muted text-sm">3 mins</span>
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item">
                            <i className="fas fa-users mr-2"></i> 8 friend requests
                            <span className="float-right text-muted text-sm">12 hours</span>
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item">
                            <i className="fas fa-file mr-2"></i> 3 new reports
                            <span className="float-right text-muted text-sm">2 days</span>
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item dropdown-footer">See All Notifications</button>
                    </div>
                </li>
                <li className="nav-item">
                    <button className="nav-link border-0 bg-transparent" data-widget="fullscreen">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </button>
                </li>
                <li className="nav-item">
                    <button className="nav-link border-0 bg-transparent" onClick={handleSignOut}>
                        <i className="fas fa-sign-out-alt fa-lg text-danger"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;