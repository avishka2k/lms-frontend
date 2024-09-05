import React, {useEffect, useRef, useState} from "react";
import BreadCrumb from "../../../components/Admin/Breadcrumb";
import Inputmask from "inputmask";
import {useParams} from "react-router-dom";
import {getApplicantById} from "../../../services/api/applicants";
import PageLoading from "../../../components/Admin/PageLoading";
import {getCourseNameById} from "../../../services/api/course";
import {CreateButton} from "../../../components/Admin/ButtonIndicator";
import {createStudent} from "../../../services/api/user";

const StudentOnboarding = () => {
    const { id } = useParams<{ id: string }>();
    const autogenerateNumber = Math.floor(Math.random() * 1000000);
    const [isApprove, setIsApprove] = useState(false);
    const [loading, setLoading] = useState(true);
    const [courseName, setCourseName] = useState<string>('');
    const [applicant, setApplicant] = useState({
        username: '',
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
        intake: '',
        studentId: ''
    });

    const getApplicantsDetails = async () => {
        const data = await getApplicantById(id || '');
        setApplicant(data);
        setLoading(false);

        // Generate the username when data is fetched
        if (data.firstName) {
            const generatedUsername = genUsername(data.firstName, autogenerateNumber);
            setApplicant(prev => ({
                ...prev,
                username: generatedUsername,
                studentId: autogenerateNumber.toString(),
                intake: ''
            }));
        }
    };

    const genUsername = (name: string, id: number) => {
        return `${name.toLowerCase()}${id}`;
    };

    const fetchCourseName = async (id: string) => {
        const name = await getCourseNameById(id);
        setCourseName(name);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setIsApprove(true);
        await createStudent(applicant);
        setTimeout(() => {
            setIsApprove(false);
        }, 1000);
        console.log(applicant);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        if (id in applicant.address) {
            // Update address nested object
            setApplicant({
                ...applicant,
                address: {
                    ...applicant.address,
                    [id]: value,
                },
            });
        } else {
            // Update top-level fields
            setApplicant({
                ...applicant,
                [id]: value,
            });
        }
    };

    useEffect(() => {
        if (applicant.course) {
            fetchCourseName(applicant.course).then(r => r);
        }
    }, [applicant.course]);

    useEffect(() => {
        getApplicantsDetails().then(r => r);
    }, []);

    if (loading) {
        return <PageLoading />
    }


    return (
        <section className="content">
            < BreadCrumb page_name="Student Onboarding" parent_name="Student" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-7">
                        {/* Default box */}
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <h5 className="pb-4"><strong>Basic Information</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>First Name <span className="text-danger">*</span></label>
                                                <input className="form-control" value={applicant.firstName} type="text"
                                                       disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input className="form-control" value={applicant.lastName} type="text"
                                                       disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Full Name (Initials) <span
                                                    className="text-danger">*</span></label>
                                                <input className="form-control" type="text" value={applicant.fullName}
                                                       disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Date of Birth <span className="text-danger">*</span></label>
                                                <div className="input-group date" id="datetimepicker4"
                                                     data-target-input="nearest">
                                                    <input type="date" className="form-control"
                                                           value={applicant.dateOfBirth} disabled/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Gender <span className="text-danger">*</span></label>
                                                <input type="text" className="form-control" value={applicant.gender}
                                                       disabled/>
                                            </div>
                                        </div>
                                        <label className="col-12">Address <span className="text-danger">*</span></label>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <input className="form-control" type="text"
                                                       value={applicant.address.addressLine1} disabled/>
                                                <p><small>Address Line 1</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <input className="form-control" type="text"
                                                       value={applicant.address.addressLine2} disabled/>
                                                <p><small>Address Line 2</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <input className="form-control" type="text"
                                                       value={applicant.address.city} disabled/>
                                                <p><small>City</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <input className="form-control" type="text"
                                                       value={applicant.address.state} disabled/>
                                                <p><small>State / Province</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <input className="form-control" type="text"
                                                       value={applicant.address.country} disabled/>
                                                <p><small>Country</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input className="form-control" type="text" value={applicant.phone}
                                                       disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Email Address <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" value={applicant.email}
                                                       disabled/>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="pb-4 pt-4"><strong>Guardian Information</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Guardian Name <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" placeholder=""
                                                       value={applicant.guardianName} disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Relationship to Student <span
                                                    className="text-danger">*</span></label>
                                                <input className="form-control" type="text" placeholder=""
                                                       value={applicant.guardianRelationship} disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Phone Number <span className="text-danger">*</span></label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><strong>+94</strong></span>
                                                    </div>
                                                    <input className="form-control" type="text" placeholder="0712345678"
                                                           value={applicant.guardianPhone} disabled/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input className="form-control" type="text"
                                                       placeholder="example@domain.com" value={applicant.guardianEmail}
                                                       disabled/>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="pb-4 pt-4"><strong>Academic Information</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Student ID <em>(Auto Generated)</em></label>
                                                <input className="form-control" type="text" value={applicant.studentId}
                                                       disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Enrollment Number</label>
                                                <input className="form-control" type="text" value="#343" disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Program/Course of Study <span
                                                    className="text-danger">*</span></label>
                                                <select className="form-control select2bs4" style={{width: '100%'}}>
                                                    <option value={applicant.course}>
                                                        {courseName}
                                                    </option>
                                                </select>

                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Intake <span className="text-danger">*</span></label>
                                                <select className="form-control" id="intake" value={applicant.intake} style={{width: '100%'}}
                                                        onChange={handleChange} required>
                                                    <option value="">Select Intake</option>
                                                    <option value="24.1">24.1</option>
                                                    <option value="24.2">24.2</option>
                                                    <option value="25.1">25.1</option>
                                                    <option value="25.2">25.2</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="pb-4 pt-4"><strong>Login Credentials</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Username <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text"
                                                       id="username"
                                                       onChange={handleChange}
                                                       value={applicant.username}
                                                       required/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input className="form-control" type="text"
                                                       value="Generates In Creation" disabled/>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5"></div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-block btn-default btn-lg">Save
                                                    As Draft
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <CreateButton isSaving={isApprove} customClass={"btn-block btn-lg"} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* /.card */}
                    </div>
                    <div className="col-5">
                        {/* Default box */}
                        <div className="card">
                            <div className="card-body col">
                                <div className="mt-3">
                                    <label>Profile Image</label>
                                    <div className="list-group list-group-numbered">
                                    <div
                                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <img src="/dist/img/avatar.png" className="img-thumbnail"
                                                     alt="..."></img>
                                            </div>
                                            <div className="row">
                                                <button type="button"
                                                        className="btn btn-default btn-sm btn-custom-download">Download
                                                </button>
                                                <button type="button"
                                                        className="btn btn-default ml-2 btn-sm btn-custom-view">View
                                                </button>
                                                <button type="button"
                                                        className="btn btn-default ml-2 btn-sm btn-custom-change-request">Change
                                                    Request
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label>National Identity Card</label>
                                    <div className="list-group list-group-numbered">
                                        <div
                                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <i className="far fa-file-pdf fa-lg mr-2 text-danger"></i>Test document
                                                1
                                            </div>
                                            <div className="row">
                                                <button type="button"
                                                        className="btn btn-default btn-sm btn-custom-download">Download
                                                </button>
                                                <button type="button"
                                                        className="btn btn-default ml-2 btn-sm btn-custom-view">View
                                                </button>
                                                <button type="button"
                                                        className="btn btn-default ml-2 btn-sm btn-custom-change-request">Change
                                                    Request
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label>National Identity Card</label>
                                    <div className="list-group list-group-numbered">
                                        <div
                                            className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <i className="far fa-file-pdf fa-lg mr-2 text-danger"></i>Test document 1
                                            </div>
                                            <div className="row">
                                                <button type="button" className="btn btn-default btn-sm btn-custom-download">Download</button>
                                                <button type="button" className="btn btn-default ml-2 btn-sm btn-custom-view">View</button>
                                                <button type="button" className="btn btn-default ml-2 btn-sm btn-custom-change-request">Change Request</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label>Birth Certificate</label>
                                    <div className="list-group list-group-numbered">
                                        <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <i className="far fa-file-pdf fa-lg mr-2 text-danger"></i>Test document 1
                                            </div>
                                            <div className="row">
                                                <button type="button" className="btn btn-default btn-sm btn-custom-download">Download</button>
                                                <button type="button" className="btn btn-default ml-2 btn-sm btn-custom-view">View</button>
                                                <button type="button" className="btn btn-default ml-2 btn-sm btn-custom-change-request">Change Request</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.card */}
                    </div>
                </div>
            </div>
        </section>
    );
}
export default StudentOnboarding;