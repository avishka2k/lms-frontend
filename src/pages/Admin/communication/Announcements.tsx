import { h } from 'gridjs';
import { Grid } from 'gridjs-react';
// import 'gridjs/dist/theme/mermaid.css';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import BreadCrumb from "../../../components/Admin/Breadcrumb";
import { Link } from 'react-router-dom';
import { deleteAnnouncement, getAllAnnouncements } from '../../../services/api/announcement';
import PageLoading from '../../../components/Admin/PageLoading';

const Announcements = () => {

    const [data, setData] = useState<(string | null)[][]>([]);
    const [loading, setLoading] = useState(true);

    const getAnnouncements = async () => {
        // Logic to get all announcements
        const all = await getAllAnnouncements();
        setData(all);
        setLoading(false);
    }

    useEffect(() => {
        // Generate fake data
        getAnnouncements();
    }, []);

    const handleCreateAnnouncement = () => {
        // Logic to create a new announcement
        console.log("Create New Announcement button clicked");
    };

    const handleDeleteAnnouncement = async (id: string) => {
        await deleteAnnouncement(id);
        getAnnouncements();
    }

    if (loading) {
        return <PageLoading />
    }

    return (
        <section className="content">
            < BreadCrumb page_name="Announcements" parent_name="Communication" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <Link to="/announcements/new"
                                    className="btn btn-primary"
                                >
                                    Create New Announcement
                                </Link>
                            </div>
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
                                        { name: 'Title' },
                                        { name: 'Description' },
                                        { name: 'Type', width: '20%' },
                                        {
                                            name: 'Status',
                                            formatter: (cell, row) => {
                                                return h('div', { className: 'badge badge-warning' }, 'Pending');
                                            },
                                            width: '10%'
                                        },
                                        {
                                            name: 'Actions',
                                            width: '15%',
                                            formatter: (cell, row) => {
                                                return h(
                                                    'div',
                                                    { className: 'action-buttons' },
                                                    h(
                                                        'button',
                                                        {
                                                            className: 'btn btn-primary btn-flat btn-sm gridjs-action-button',
                                                            onClick: () => console.log(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`)
                                                        },
                                                        h('i', { className: 'fa fa-eye' })
                                                    ),
                                                    h(
                                                        'button',
                                                        {
                                                            className: 'btn btn-success btn-flat btn-sm gridjs-action-button ml-2',
                                                            onClick: () => console.log(`Viewing "${row.cells[0].data}" "${row.cells[1].data}"`)
                                                        },
                                                        h('i', { className: 'fas fa-comment-dots' })
                                                    ),
                                                    h(
                                                        'button',
                                                        {
                                                            className: 'btn btn-danger btn-flat btn-sm gridjs-action-button ml-2',
                                                            onClick: () => handleDeleteAnnouncement(`${row.cells[0].data}`)
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
    );
}

export default Announcements;