import { useEffect, useRef } from "react";
import BreadCrumb from "../../../components/Admin/Breadcrumb";
import Inputmask from "inputmask";


const StudentOnboarding = () => {
    // const [intake, setIntake] = useState<any>([]);
    const autogeneratenumber = Math.floor(Math.random() * 1000000);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const usernameInputRef = useRef<HTMLInputElement>(null);

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

    return (

        <section className="content">
            < BreadCrumb page_name="Student Onboarding" parent_name="Student" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-7">
                        {/* Default box */}
                        <div className="card">
                            <div className="card-body">
                                <form action="">
                                    <h5 className="pb-4"><strong>Basic Information</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>First Name <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Full Name (Initials) <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Date of Birth <span className="text-danger">*</span></label>
                                                <div className="input-group date" id="datetimepicker4" data-target-input="nearest">
                                                    <input type="text" className="form-control datetimepicker-input" data-target="#datetimepicker4" />
                                                    <div className="input-group-append" data-target="#datetimepicker4" data-toggle="datetimepicker">
                                                        <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Gender <span className="text-danger">*</span></label>
                                                <select className="form-control">
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </div>
                                        </div>
                                        <label className="col-12">Address <span className="text-danger">*</span></label>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <input className="form-control" type="text" />
                                                <p><small>Address Line 1</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <input className="form-control" type="text" />
                                                <p><small>Address Line 2</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <input className="form-control" type="text" />
                                                <p><small>City</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <input className="form-control" type="text" />
                                                <p><small>State / Province</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <div className="form-group">
                                                <input className="form-control" type="text" />
                                                <p><small>Country</small></p>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Email Address <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="pb-4 pt-4"><strong>Academic Information</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Student ID <em>(Auto Generated)</em></label>
                                                <input className="form-control" type="text" value={autogeneratenumber} disabled />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Enrollment Number</label>
                                                <input className="form-control" type="text" value="#343" disabled />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Program/Course of Study  <span className="text-danger">*</span></label>
                                                <select className="form-control select2bs4" style={{ width: '100%' }}>
                                                    <option value="BSc (Honours) in Data Science">BSc (Honours) in Data Science</option>
                                                    <option value="BSc (Hons) in Computer Networks">BSc (Hons) in Computer Networks </option>
                                                    <option value="BSc (Hons) in Computer Science">BSc (Hons) in Computer Science </option>
                                                    <option value="BSc (Hons) in Software Engineering">BSc (Hons) in Software Engineering</option>
                                                    <option value="BSc in Management Information Systems (Special)">BSc in Management Information Systems (Special)</option>
                                                    <option value="BSc (Hons) Technology Management">BSc (Hons) Technology Management</option>
                                                    <option value="BSc (Hons) Computer Science-Plymouth University">BSc (Hons) Computer Science-Plymouth University</option>
                                                    <option value="BSc (Hons) Computer Networks">BSc (Hons) Computer Networks</option>
                                                    <option value="BSc (Hons) Software Engineering">BSc (Hons) Software Engineering</option>
                                                    <option value="BSc (Hons) in Data Science">BSc (Hons) in Data Science </option>
                                                    <option value="Bachelor of Information Technology (Major in Cyber Security)">Bachelor of Information Technology (Major in Cyber Security)</option>
                                                    <option value="Foundation Programme for Bachelor’s Degree-Business / Computing ">Foundation Programme for Bachelor’s Degree-Business / Computing </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Intake <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="pb-4 pt-4"><strong>Login Credentials</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Username <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" ref={usernameInputRef} required />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input className="form-control" type="text" value="Generates In Creation" disabled />
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="pb-4 pt-4"><strong>Guardian Information</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Guardian Name <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" placeholder="" />

                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Relationship to Student  <span className="text-danger">*</span></label>
                                                <select className="form-control select2bs4" style={{ width: '100%' }}>
                                                    <option value="mother">Mother</option>
                                                    <option value="father">Father</option>
                                                    <option value="step-mother">Step-Mother</option>
                                                    <option value="step-father">Step-Father</option>
                                                    <option value="grandmother">Grandmother</option>
                                                    <option value="grandfather">Grandfather</option>
                                                    <option value="aunt">Aunt</option>
                                                    <option value="uncle">Uncle</option>
                                                    <option value="legal-guardian">Legal Guardian</option>
                                                    <option value="foster-parent">Foster Parent</option>
                                                    <option value="older-sibling">Older Sibling</option>
                                                    <option value="other-relative">Other Relative</option>
                                                    <option value="family-friend">Family Friend</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Phone Number <span className="text-danger">*</span></label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><strong>+94</strong></span>
                                                    </div>
                                                    <input className="form-control" type="text" ref={phoneInputRef} placeholder="0712345678" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input className="form-control" type="text" ref={emailInputRef} placeholder="example@domain.com" />
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5"></div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-block btn-default btn-lg">Save As Draft</button>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <button type="button" className="btn btn-block btn-primary btn-lg">Approve</button>
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
export default StudentOnboarding;