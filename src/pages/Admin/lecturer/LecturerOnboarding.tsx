import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../../components/Admin/Breadcrumb";
import {CreateButton} from "../../../components/Admin/ButtonIndicator";
import {createLecturer} from "../../../services/api/user";


const LecturerOnboarding = () => {
    const autogenerateNumber = Math.floor(Math.random() * 1000000);
    const [isSave, setIsSave] = useState(false);
    const [lecturer, setLecturer] = useState({
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
        lecturerId: '',
        designation: '',
        workType: '',
        officeLocation: '',
        highestDegree: '',
        major: '',
        linkedin: '',
        emergencyPhone: '',
        institution: '',
        researchInterest: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        if (id in lecturer.address) {
            // Update address nested object
            setLecturer({
                ...lecturer,
                address: {
                    ...lecturer.address,
                    [id]: value,
                },
            });
        } else {
            // Update top-level fields
            setLecturer({
                ...lecturer,
                [id]: value,
            });
        }
    };

    useEffect(() => {
        const generatedUsername = genUsername(lecturer.firstName, autogenerateNumber);
        setLecturer({
            ...lecturer,
            username: generatedUsername,
            lecturerId: autogenerateNumber.toString(),
        });
    }, [lecturer.firstName]);

    const genUsername = (name: string, id: number) => {
        return `${name.toLowerCase()}${id}`;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSave(true);
        await createLecturer(lecturer);
        setTimeout(() => {
            setIsSave(false);
        }, 1000)
        console.log(lecturer);
    }

    return (

        <section className="content">
            < BreadCrumb page_name="Lecturer Onboarding" parent_name="Lecturer" />
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
                                                <input className="form-control" type="text" id="firstName" name="firstName" value={lecturer.firstName} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input className="form-control" type="text" id="lastName" name="lastName" value={lecturer.lastName} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Full Name (Initials) <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" id="fullName" name="fullName" value={lecturer.fullName} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Date of Birth <span className="text-danger">*</span></label>
                                                <div className="input-group date" id="datetimepicker4"
                                                     data-target-input="nearest">
                                                    <input type="date" className="form-control"
                                                           value={lecturer.dateOfBirth} id="dateOfBirth" name="dateOfBirth" onChange={handleChange} required/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Gender <span className="text-danger">*</span></label>
                                                <select className="form-control" id="gender" name="gender" value={lecturer.gender} onChange={handleChange} required>
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <label className="col-12">Address <span className="text-danger">*</span></label>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <input className="form-control" type="text" id="addressLine1" name="addressLine1" value={lecturer.address.addressLine1} onChange={handleChange} required/>
                                                <p><small>Address Line 1</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <input className="form-control" type="text" id="addressLine2" name="addressLine2" value={lecturer.address.addressLine2} onChange={handleChange} />
                                                <p><small>Address Line 2</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <input className="form-control" type="text" id="city" name="city" value={lecturer.address.city} onChange={handleChange}/>
                                                <p><small>City</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <input className="form-control" type="text" id="state" name="state" value={lecturer.address.state} onChange={handleChange}/>
                                                <p><small>State / Province</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <input className="form-control" type="text" id="country" name="country" value={lecturer.address.country} onChange={handleChange}/>
                                                <p><small>Country</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input className="form-control" type="text" id="phone" name="phone" value={lecturer.phone} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Email Address <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" id="email" name="email" value={lecturer.email} onChange={handleChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="pb-4 pt-4"><strong>Professional Information</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Lecturer ID <em>(Auto Generated)</em></label>
                                                <input className="form-control" type="text" value={lecturer.lecturerId} id="lecturerId" name="lecturerId" onChange={handleChange} disabled />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Designation</label>
                                                <input className="form-control" type="text" placeholder="e.g., Professor, Assistant Professor, Lecturer" id="designation" name="designation" value={lecturer.designation} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Office Location  <span className="text-danger">*</span></label>
                                                <select className="form-control" id="officeLocation" name="officeLocation" value={lecturer.officeLocation} onChange={handleChange}>
                                                    <option value="">Select Location</option>
                                                    <option value="Colombo 7">Colombo 7</option>
                                                    <option value="homagama">Homagama</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Employment Type <span className="text-danger">*</span></label>
                                                <select className="form-control" id="workType" name="workType" value={lecturer.workType} onChange={handleChange}>
                                                    <option value="Full Time">Full Time</option>
                                                    <option value="Part Time">Part Time</option>
                                                    <option value="Visiting Course">Visiting Course</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="pb-4 pt-4"><strong>Academic Background</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Highest Degree Obtained <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" id="highestDegree" name="highestDegree" value={lecturer.highestDegree} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Specialization / Major</label>
                                                <input className="form-control" type="text" id="major" name="major" value={lecturer.major} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>University/Institution of Highest Degree</label>
                                                <input className="form-control" type="text" id="institution" name="institution" value={lecturer.institution} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Areas of Research Interest</label>
                                                <input className="form-control" type="text" id="researchInterest" name="researchInterest" value={lecturer.researchInterest} onChange={handleChange}/>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="pb-4 pt-4"><strong>Login Credentials</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Username <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" id="username" name="username" value={lecturer.username} onChange={handleChange} required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Role</label>
                                                <input className="form-control" type="text" value="Lecturer" id="name" name="name" onChange={handleChange} disabled />
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="pb-4 pt-4"><strong>Other Information</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>LinkedIn </label>
                                                <input className="form-control" type="text" placeholder="" id="linkedin" name="linkedin" value={lecturer.linkedin} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Emergency Contact Number <span className="text-danger">*</span></label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><strong>+94</strong></span>
                                                    </div>
                                                    <input className="form-control" type="text" id="emergencyPhone" name="emergencyPhone" value={lecturer.emergencyPhone} onChange={handleChange} placeholder="0712345678" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5"></div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-block btn-default btn-lg">Cancel</button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <CreateButton isSaving={isSave} customClass={"btn-block btn-lg"}/>
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
                                        <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
                                            <div className="ms-2 me-auto">
                                                <img src="/dist/img/avatar.png" className="img-thumbnail" alt="..."></img>
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
                                    <label>National Identity Card</label>
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
                                <div className="mt-3">
                                    <label>National Identity Card</label>
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
export default LecturerOnboarding;