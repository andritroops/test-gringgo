import React from "react";
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";

export default function IndexProvinces() {
    const [provinces, setProvinces] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [alertSuccess, setAlertSuccess] = React.useState(false);
    const [alertError, setAlertError] = React.useState(false);
    const [messageSuccess, setMessageSuccess] = React.useState();

    React.useEffect(() => {
        axios.get(process.env.API_URL + '/api/propinsi/list').then((response) => {
            setProvinces(response.data);
        });
    }, [provinces]);

    const datas = provinces && provinces.data;

    const handlePageChange = async page => {

        setPage(page);
    };

    const deleteHandle = async event => {

        var ok = confirm("Apakah kamu yakin akan mengapus data ini?");

        if (ok) {
            console.log(event.target.id)
            const data = {
                id_prov: event.target.id
            };
          
            axios.post(process.env.API_URL + '/api/propinsi/delete', data)
                .then(res => {
                    console.log(res);
                    setAlertSuccess(true);
                    setMessageSuccess(res.data);
                }).catch(error => {
                    if (error.response) {
                        setAlertSuccess(false);
                        setAlertError(true);
                    }
                });
        }

    };

    const renderMessages = () => {

        if (alertSuccess && messageSuccess.status == true) {
            return (
                <>
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {messageSuccess.message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </>
            )
        }
        else if (alertError) {
            return (
                <>
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {'Delete failed.'}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </>
            )
        }
    }

    const columns = [
        {
            name: '#',
            cell: (row, index) => (page - 1) * 10 + index + 1,
            grow: 0,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <Link className="btn btn-sm btn-warning" to={`/provinces/edit/`+row.id}>Edit</Link>
                    <Link className="btn btn-sm btn-primary mx-2" to={`/provinces/view/`+row.id}>View</Link>
                    <button className="btn btn-sm btn-danger" onClick={deleteHandle} id={row.id}>Delete</button>
                </div>
            )

        }
    ];



    const paginationComponentOptions = {
        noRowsPerPage: true,
        paginationPerPage: 10
    };

    return (

        <div>
            <div className="container py-3">

                <div className="card">
                    <div className="card-body">
                        <h3>Data Provinces</h3>
                        {renderMessages()}
                        <Link to={'/provinces/add'} title="Add data" className="btn btn-primary my-2">+ ADD DATA</Link>
                        {provinces && provinces.data.length > 0 ? (
                            <DataTable
                                columns={columns}
                                data={datas}
                                pagination
                                paginationComponentOptions={paginationComponentOptions}
                                onChangePage={handlePageChange}
                            />
                        ) : ''}


                    </div>
                </div>

            </div>

        </div>
    );
}