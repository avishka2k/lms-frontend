import { h } from 'gridjs';
import { Grid } from 'gridjs-react';
import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../../components/Admin/Breadcrumb';
import {getAdmins, getStudents} from '../../../services/api/user';
import {getApplicants} from "../../../services/api/applicants";
import {getCourseNameById} from "../../../services/api/course";
import {useNavigate} from "react-router-dom";
const StudentApplicant = () => {

    const [data, setData] = useState<(string | null)[][]>([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const applicants = await getApplicants();

            let tableData = await Promise.all(applicants.map(async (item: any) => [
                item.id,
                item.fullName,
                item.phone,
                item.email,
                await getCourseName(item.course),
                new Date(item.dateOfApplication).toLocaleDateString(),
                null
            ]));
            setData(tableData);
        } catch (error: any) {
            console.log(error);
        }
    }

    const getCourseName = async (id: string) => {
        return await getCourseNameById(id);
    }

    useEffect(() => {
        fetchData().then(r => r);
    }, []);

    const handleView = (id: string) => {
        navigate(`/admin/student/applicants/${id}/view`);
    }

    return (
        <section className="content">
            < BreadCrumb page_name="Student Applicants" parent_name="Student" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/* /.card-header */}
                            <div className="card-body">
                                <Grid
                                    data={() => {
                                        return new Promise(resolve => {
                                            setTimeout(() =>
                                                resolve(data), 2000);
                                        });
                                    }}
                                    columns={[
                                        { name: 'ID', hidden: true },
                                        { name: 'Student Name' },
                                        { name: 'Phone' },
                                        { name: 'Email' },
                                        { name: 'Course/Program' },
                                        { name: 'Application Date' },
                                        {
                                            name: 'Status',
                                            formatter: (cell, row) => {
                                                return h('div', { className: 'badge badge-warning' }, 'Pending');
                                            }
                                        },
                                        {
                                            name: 'Actions',
                                            formatter: (cell, row) => {
                                                return h(
                                                    'div',
                                                    { className: 'action-buttons' },
                                                    h(
                                                        'button',
                                                        {
                                                            className: 'btn btn-primary btn-flat btn-sm gridjs-action-button',
                                                            onClick: () => console.log(`Editing "${row.cells[0].data}"`)
                                                        },
                                                        h('i', { className: 'fa fa-eye' })
                                                    ),
                                                    h(
                                                        'button',
                                                        {
                                                            className: 'btn btn-success btn-flat btn-sm gridjs-action-button ml-2',
                                                            onClick: () => handleView(`${row.cells[0].data}`)
                                                        },
                                                        h('i', { className: 'fas fa-comment-dots' })
                                                    ),
                                                    h(
                                                        'button',
                                                        {
                                                            className: 'btn btn-danger btn-flat btn-sm gridjs-action-button ml-2',
                                                            onClick: () => console.log(`Viewing "${row.cells[0].data}"`)
                                                        },
                                                        h('i', { className: 'fas fa-times px-1' })
                                                    )
                                                );
                                            }
                                        }
                                    ]}
                                    search={true}
                                    pagination={{
                                        limit: 10,
                                    }}
                                />
                            </div>
                            {/* /.card-body */}
                        </div>
                    </div>
                    {/* /.col */}
                </div>
                {/* /.row */}
            </div>
            {/* /.container-fluid */}
        </section>
    )
}

export default StudentApplicant;