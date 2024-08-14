import { h } from 'gridjs';
import { Grid } from 'gridjs-react';
// import 'gridjs/dist/theme/mermaid.css';
import { useEffect, useState } from 'react';
import BreadCrumb from '../../components/Admin/Breadcrumb';
import axios from 'axios';
import { Auth } from 'aws-amplify';
const StudentApplicant = () => {

    const [data, setData] = useState<(string | null)[][]>([]);

    const fetchData = async () => {
        const session = await Auth.currentSession();
        const idToken = session.getIdToken().getJwtToken();
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/applicants/student`, {
            headers: {
                'Authorization': `Bearer ${idToken}`
            }
        });

        console.log(response);

        let tableData = response.data.map((item: any) => [
            item.id,
            item.fullName,
            item.phone,
            item.email,
            item.course,
            new Date(item.dateOfApplication).toLocaleDateString(),
            null
        ]);
        setData(tableData);
    }

    useEffect(() => {
        fetchData();
        // Generate fake data

        // const gridData = Array(50).fill(null).map(() => [
        //     faker.person.firstName(),
        //     faker.phone.number(),
        //     faker.internet.email(),
        //     faker.person.prefix(),
        //     new Date().toLocaleDateString(),
        //     null
        // ]);
        // setData(gridData);
    }, []);

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
                                                            onClick: () => console.log(`Viewing "${row.cells[0].data}"`)
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