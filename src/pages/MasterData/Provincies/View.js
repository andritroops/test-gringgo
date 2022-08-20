import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

export default function ViewProvince() {
    const [province, setProvince] = React.useState(null);

    const id = useParams().id

    React.useEffect(() => {
        axios.get(process.env.API_URL + `/api/propinsi/viewedit?id_prov=` + id).then((response) => {
            setProvince(response.data);

        });
    }, []);


    return (

        <div>
            <div className="container py-3">
                <div className="card">
                    <div className="card-body">
                        <h3 className="mb-3">
                            View Data
                        </h3>
                        <div className="mb-3 row">
                            <label htmlFor="ID" className="col-sm-2 col-form-label">ID</label>
                            <div className="col-sm-10 col-lg-4 col-md-4">
                                <p className="form-control-plaintext" id="ID">{province && province.data[0].id}</p>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="Name" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10 col-lg-4 col-md-4">
                                <p className="form-control-plaintext" id="Name">{province && province.data[0].name}</p>
                            </div>
                        </div>
                        <Link to={'/'} title="Back" className="my-2 btn btn-warning">Back</Link>
                    </div>
                </div>

            </div>

        </div>
    );
}