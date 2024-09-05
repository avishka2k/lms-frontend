import { useEffect, useRef, useState } from "react";
import Inputmask from "inputmask";
import BreadCrumb from "../../components/Admin/Breadcrumb";
import { getPublicCourses } from "../../services/api/course";
import { getPublicDepartment } from "../../services/api/usiversity";
import {studentReq} from "../../services/api/applicants";

const StudentRequest = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const [course, setCourse] = useState<any[]>([]); // Initialize as an array
    const [department, setDepartment] = useState<any[]>([]); // Initialize as an array
    const [selectedDepartment, setSelectedDepartment] = useState<string>("");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        fullName: '',
        dateOfBirth: '',
        gender: '',
        address: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            country: '',
        },
        phone: '',
        email: '',
        guardianName: '',
        guardianRelationship: '',
        guardianPhone: '',
        guardianEmail: '',
        course: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        if (id in formData.address) {
            // Update address nested object
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [id]: value,
                },
            });
        } else {
            // Update top-level fields
            setFormData({
                ...formData,
                [id]: value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await studentReq(formData)
    };

    useEffect(() => {
        if (phoneInputRef.current) {
            Inputmask({ mask: '099 999 9999' }).mask(phoneInputRef.current);
        }
        if (emailInputRef.current) {
            Inputmask({ alias: 'email' }).mask(emailInputRef.current);
        }
        if (usernameInputRef.current) {
            Inputmask({ regex: "^[a-z._]*[0-9]{0,3}[a-z._]*$" }).mask(usernameInputRef.current);
        }
    }, []);

    const getCourses = async (departmentId: string) => {
        try {
            const response = await getPublicCourses(departmentId);
            if (Array.isArray(response)) {
                setCourse(response);
            } else {
                console.error("Unexpected response format for courses", response);
                setCourse([]);
            }
        } catch (error) {
            console.error("Error fetching courses", error);
            setCourse([]);
        }
    };

    const getDepartments = async () => {
        try {
            const response = await getPublicDepartment();
            if (Array.isArray(response)) {
                setDepartment(response);
            } else {
                console.error("Unexpected response format for departments", response);
                setDepartment([]);
            }
        } catch (error) {
            console.error("Error fetching departments", error);
            setDepartment([]);
        }
    };

    useEffect(() => {
        getDepartments();
    }, []);

    useEffect(() => {
        if (selectedDepartment) {
            getCourses(selectedDepartment);
        }
    }, [selectedDepartment]);

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-5">
                        <h1 className="text-center my-4">Student Request Form</h1>
                        {/* Default box */}
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    {/* Basic Information */}
                                    <h5 className="pb-4"><strong>Basic Information</strong></h5>
                                    <div className="row">
                                        {/* First Name */}
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>First Name <span className="text-danger">*</span></label>
                                                <input
                                                    id="firstName"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {/* Last Name */}
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input
                                                    id="lastName"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {/* Full Name */}
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Full Name (Initials) <span
                                                    className="text-danger">*</span></label>
                                                <input
                                                    id="fullName"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {/* Date of Birth */}
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Date of Birth <span className="text-danger">*</span></label>
                                                <div className="input-group date" id="datetimepicker4"
                                                     data-target-input="nearest">
                                                    <input
                                                        id="dateOfBirth"
                                                        type="date"
                                                        className="form-control"
                                                        value={formData.dateOfBirth}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Gender */}
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Gender <span className="text-danger">*</span></label>
                                                <select
                                                    id="gender"
                                                    className="form-control"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* Address */}
                                        <label className="col-12">Address <span className="text-danger">*</span></label>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <input
                                                    id="addressLine1"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.address.addressLine1}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <p><small>Address Line 1</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <input
                                                    id="addressLine2"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.address.addressLine2}
                                                    onChange={handleChange}
                                                />
                                                <p><small>Address Line 2</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <input
                                                    id="city"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.address.city}
                                                    onChange={handleChange}
                                                />
                                                <p><small>City</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <input
                                                    id="state"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.address.state}
                                                    onChange={handleChange}
                                                />
                                                <p><small>State / Province</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <input
                                                    id="country"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.address.country}
                                                    onChange={handleChange}
                                                />
                                                <p><small>Country</small></p>
                                            </div>
                                        </div>
                                        {/* Phone Number */}
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input
                                                    id="phone"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        {/* Email Address */}
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Email Address <span className="text-danger">*</span></label>
                                                <input
                                                    id="email"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Programme Details */}
                                    <h5 className="pb-4 pt-4"><strong>Programme Details</strong></h5>
                                    <div className="row">
                                        {/* Department */}
                                        <div className="col-12 col-sm-6">
                                        <div className="form-group">
                                                <label>Department <span className="text-danger">*</span></label>
                                                <select
                                                    className="form-control"
                                                    style={{ width: '100%' }}
                                                    value={selectedDepartment}
                                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                                >
                                                    <option value="">Select Department</option>
                                                    {department && department.map((d: any) => (
                                                        <option key={d.id} value={d.id}>{d.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        {/* Program/Course */}
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Program/Course of Study <span className="text-danger">*</span></label>
                                                <select
                                                    className="form-control"
                                                    style={{ width: '100%' }}
                                                    disabled={!selectedDepartment}
                                                    id={"course"}
                                                    value={formData.course}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Course</option>
                                                    {course && course.map((c: any) => (
                                                        <option key={c.id} value={c.id}>{c.title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Guardian Information */}
                                    <h5 className="pb-4 pt-4"><strong>Guardian Information</strong></h5>
                                    <div className="row">
                                        {/* Guardian Name */}
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Guardian Name <span className="text-danger">*</span></label>
                                                <input
                                                    id="guardianName"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.guardianName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        {/* Guardian Relationship */}
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Guardian Relationship <span className="text-danger">*</span></label>
                                                <select id="guardianRelationship"
                                                        className="form-control"
                                                        value={formData.guardianRelationship}
                                                        onChange={handleChange}>
                                                    <option value="">Select Relationship</option>
                                                    <option value="father">Father</option>
                                                    <option value="mother">Mother</option>
                                                    <option value="guardian">Guardian</option>
                                                    <option value="step-mother">Step-Mother</option>
                                                    <option value="step-father">Step-Father</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* Guardian Phone Number */}
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Guardian Phone Number <span className="text-danger">*</span></label>
                                                <input
                                                    id="guardianPhone"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.guardianPhone}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        {/* Guardian Email Address */}
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Guardian Email Address <span
                                                    className="text-danger">*</span></label>
                                                <input
                                                    id="guardianEmail"
                                                    className="form-control"
                                                    type="text"
                                                    value={formData.guardianEmail}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="row mt-5">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <button type="button"
                                                        className="btn btn-block btn-default btn-lg">Cancel
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-block btn-primary btn-lg">Send Application</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* /.card */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentRequest;
