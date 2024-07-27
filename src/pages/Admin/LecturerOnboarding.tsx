import { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../components/Admin/Breadcrumb";
import Inputmask from "inputmask";


const LecturerOnboarding = () => {
    const [intake, setIntake] = useState<any>([]);
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
            < BreadCrumb page_name="Lecturer Onboarding" parent_name="Lecturer" />
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
                                                <p><small>Zip Code</small></p>
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
                                    <h5 className="pb-4 pt-4"><strong>Professional Information</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Lecturer ID <em>(Auto Generated)</em></label>
                                                <input className="form-control" type="text" value={autogeneratenumber} disabled />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Designation</label>
                                                <input className="form-control" type="text" placeholder="e.g., Professor, Assistant Professor, Lecturer" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Office Location  <span className="text-danger">*</span></label>
                                                <select className="form-control">
                                                    <option value="Colombo 7">Colombo 7</option>
                                                    <option value="homagama">Homagama</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Employment Type <span className="text-danger">*</span></label>
                                                <select className="form-control">
                                                    <option value="Full Time">Full Time</option>
                                                    <option value="Part Time">Part Time</option>
                                                    <option value="Visiting Faculty">Visiting Faculty</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="pb-4 pt-4"><strong>Academic Background</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Highest Degree Obtained <span className="text-danger">*</span></label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Specialization / Major</label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>University/Institution of Highest Degree</label>
                                                <input className="form-control" type="text" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Areas of Research Interest</label>
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
                                                <label>Role</label>
                                                <input className="form-control" type="text" value="Lecturer" disabled />
                                            </div>
                                        </div>
                                    </div>

                                    <h5 className="pb-4 pt-4"><strong>Other Information</strong></h5>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>LinkedIn </label>
                                                <input className="form-control" type="text" placeholder="" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Emergency Contact Number <span className="text-danger">*</span></label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><strong>+94</strong></span>
                                                    </div>
                                                    <input className="form-control" type="text" ref={phoneInputRef} placeholder="0712345678" />
                                                </div>
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
export default LecturerOnboarding;