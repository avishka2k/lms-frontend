import { useState } from "react";
import BreadCrumb from "../../../components/Admin/Breadcrumb";
import { createAssignment, createEvent, createExam, createMaintenance } from "../../../services/api/announcement";
import { CreateButton } from "../../../components/Admin/ButtonIndicator";
import {useNavigate} from "react-router-dom";
const NewAnnounce = () => {

    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: '',
        assignmentCourseCode: '',
        assignmentTitle: '',
        assignmentDueDate: '',
        assignmentInstructions: '',
        assignmentInstructor: '',
        examCourseCode: '',
        examDate: '',
        examTime: '',
        examLocation: '',
        examInstructor: '',
        examResources: '',
        eventDate: '',
        eventTime: '',
        eventLocation: '',
        eventOrganizer: '',
        eventContact: '',
        eventFlyer: '',
        eventRegistration: '',
        maintenanceStart: '',
        maintenanceEnd: '',
        maintenanceServices: '',
        maintenanceContact: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsCreating(true);
        switch (formData.type) {
            case 'assignment':
              const assignment =  await createAssignment({
                    title: formData.title,
                    description: formData.description,
                    type: formData.type,
                    assignmentCourseCode: formData.assignmentCourseCode,
                    assignmentDueDate: formData.assignmentDueDate,
                    assignmentInstructions: formData.assignmentInstructions,
                    assignmentInstructor: formData.assignmentInstructor,
                });
                if (assignment && assignment.status === 200) {
                    navigate('/admin/announcements');
                }
                break;
            case 'exam':
                const exam =  await createExam({
                    title: formData.title,
                    description: formData.description,
                    type: formData.type,
                    examCourseCode: formData.examCourseCode,
                    examDate: formData.examDate,
                    examTime: formData.examTime,
                    examLocation: formData.examLocation,
                    examInstructor: formData.examInstructor,
                    examResources: formData.examResources,
                })
                if (exam && exam.status === 200) {
                    navigate('/admin/announcements');
                }
                break;
            case 'event':
             const event = await createEvent({
                    title: formData.title,
                    description: formData.description,
                    type: formData.type,
                    eventDate: formData.eventDate,
                    eventTime: formData.eventTime,
                    eventLocation: formData.eventLocation,
                    eventOrganizer: formData.eventOrganizer,
                    eventContact: formData.eventContact,
                    eventFlyer: formData.eventFlyer,
                    eventRegistration: formData.eventRegistration,
                })
                if (event && event.status === 200) {
                    navigate('/admin/announcements');
                }
                break;
            case 'maintenance':
             const maintenance = await createMaintenance({
                    title: formData.title,
                    description: formData.description,
                    type: formData.type,
                    maintenanceStart: formData.maintenanceStart,
                    maintenanceEnd: formData.maintenanceEnd,
                    maintenanceServices: formData.maintenanceServices,
                    maintenanceContact: formData.maintenanceContact,
                })
                console.log(maintenance);
                if (maintenance && maintenance.status === 200) {
                    navigate('/admin/announcements');
                }
                break;
            default:
                break;
        }
        setIsCreating(false);
    }
    return (
        <section className="content">
            < BreadCrumb page_name="New Announcement" parent_name="Announcements" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-7">
                        <div className="card">
                            {/* /.card-header */}
                            <div className="card-body">
                                <form autoComplete="on" onSubmit={handleSubmit}>
                                    {/* Common Fields */}
                                    <div className="form-group">
                                        <label htmlFor="title">Title <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="title" value={formData.title} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description <span className="text-danger">*</span></label>
                                        <textarea className="form-control" id="description" value={formData.description} onChange={handleChange} rows={4} required></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="type">Type <span className="text-danger">*</span></label>
                                        <select className="form-control" id="type" value={formData.type} onChange={handleChange} required>
                                            <option value="">Select Type</option>
                                            <option value="assignment">Assignment</option>
                                            <option value="exam">Exam</option>
                                            <option value="event">Event</option>
                                            <option value="maintenance">Maintenance</option>
                                        </select>
                                    </div>

                                    {/* Assignment Announcement Specific Fields */}
                                    {formData.type === 'assignment' && (
                                        <div id="assignmentFields">
                                            <div className="form-group">
                                                <label htmlFor="assignmentCourseCode">Course Code:</label>
                                                <input type="text" className="form-control" id="assignmentCourseCode" value={formData.assignmentCourseCode} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="assignmentTitle">Assignment Title:</label>
                                                <input type="text" className="form-control" id="assignmentTitle" value={formData.assignmentTitle} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="assignmentDueDate">Due Date:</label>
                                                <input type="date" className="form-control" id="assignmentDueDate" value={formData.assignmentDueDate} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="assignmentInstructions">Submission Instructions:</label>
                                                <textarea className="form-control" id="assignmentInstructions" value={formData.assignmentInstructions} onChange={handleChange} rows={3}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="assignmentInstructor">Instructor Name:</label>
                                                <input type="text" className="form-control" id="assignmentInstructor" value={formData.assignmentInstructor} onChange={handleChange} />
                                            </div>
                                        </div>
                                    )}

                                    {/* Exam Announcement Specific Fields */}
                                    {formData.type === 'exam' && (
                                        <div id="examFields">
                                            <div className="form-group">
                                                <label htmlFor="examCourseCode">Course Code:</label>
                                                <input type="text" className="form-control" id="examCourseCode" value={formData.examCourseCode} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="examDate">Exam Date:</label>
                                                <input type="date" className="form-control" id="examDate" value={formData.examDate} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="examTime">Exam Time:</label>
                                                <input type="time" className="form-control" id="examTime" value={formData.examTime} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="examLocation">Location (if applicable):</label>
                                                <input type="text" className="form-control" id="examLocation" value={formData.examLocation} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="examInstructor">Instructor Name:</label>
                                                <input type="text" className="form-control" id="examInstructor" value={formData.examInstructor} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="examResources">Additional Resources/Links:</label>
                                                <input type="url" className="form-control" id="examResources" value={formData.examResources} onChange={handleChange} />
                                            </div>
                                        </div>
                                    )}

                                    {/* Event Announcement Specific Fields */}
                                    {formData.type === 'event' && (
                                        <div id="eventFields">
                                            <div className="form-group">
                                                <label htmlFor="eventDate">Date:</label>
                                                <input type="date" className="form-control" id="eventDate" value={formData.eventDate} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="eventTime">Time:</label>
                                                <input type="time" className="form-control" id="eventTime" value={formData.eventTime} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="eventLocation">Location:</label>
                                                <input type="text" className="form-control" id="eventLocation" value={formData.eventLocation} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="eventOrganizer">Organizer Name:</label>
                                                <input type="text" className="form-control" id="eventOrganizer" value={formData.eventOrganizer} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="eventContact">Contact Information:</label>
                                                <input type="text" className="form-control" id="eventContact" value={formData.eventContact} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="eventFlyer">Flyer/Image Link:</label>
                                                <input type="url" className="form-control" id="eventFlyer" value={formData.eventFlyer} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="eventRegistration">Registration Link:</label>
                                                <input type="url" className="form-control" id="eventRegistration" value={formData.eventRegistration} onChange={handleChange} />
                                            </div>
                                        </div>
                                    )}

                                    {/* Maintenance Announcement Specific Fields */}
                                    {formData.type === 'maintenance' && (
                                        <div id="maintenanceFields">
                                            <div className="form-group">
                                                <label htmlFor="maintenanceStart">Start Date and Time:</label>
                                                <input type="datetime-local" className="form-control" id="maintenanceStart" value={formData.maintenanceStart} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="maintenanceEnd">End Date and Time:</label>
                                                <input type="datetime-local" className="form-control" id="maintenanceEnd" value={formData.maintenanceEnd} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="maintenanceServices">Affected Services:</label>
                                                <textarea className="form-control" id="maintenanceServices" value={formData.maintenanceServices} onChange={handleChange} rows={3}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="maintenanceContact">Contact Information for Further Assistance:</label>
                                                <input type="text" className="form-control" id="maintenanceContact" value={formData.maintenanceContact} onChange={handleChange} />
                                            </div>
                                        </div>
                                    )}

                                    <CreateButton isSaving={isCreating} />
                                </form>
                            </div>
                            {/* /.card-body */}
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="card">
                            <div className="card-body">
                                <h5><strong>Instructions</strong></h5>
                                <p>Select the type of announcement and fill in the required fields. Depending on the type, additional fields will appear.</p>
                                <ul>
                                    <li><strong>Course:</strong> Updates specific to a course.</li>
                                    <li><strong>Assignment:</strong> Information regarding assignments.</li>
                                    <li><strong>Exam:</strong> Exam related updates.</li>
                                    <li><strong>Event:</strong> Events such as webinars, guest lectures, etc.</li>
                                    <li><strong>General University:</strong> General information not tied to a specific course.</li>
                                    <li><strong>Maintenance:</strong> System maintenance updates.</li>
                                    <li><strong>Emergency:</strong> Urgent updates such as campus closures, health advisories, etc..</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-md-5">
                            <div className="card">
                                <div className="card-body">
                                    <h5><strong>Description Preview</strong></h5>
                                    <p className="card-text">{formData.description}</p>
                                </div>
                            </div>
                        </div> */}
                    {/* /.col */}
                </div>
                {/* /.row */}
            </div>
            {/* /.container-fluid */}
        </section>
    );
}

export default NewAnnounce;