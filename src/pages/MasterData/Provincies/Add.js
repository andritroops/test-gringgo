import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function AddProvince() {
    const [alertSuccess, setAlertSuccess] = React.useState(false);
    const [alertError, setAlertError] = React.useState(false);
    const [messageError, setMessageError] = React.useState();
    const [messageSuccess, setMessageSuccess] = React.useState();

    const handleSubmit = async event => {
        event.preventDefault();
        // const formData = new FormData(event.target);

        const datas = {
            id: event.target.id.value,
            name: event.target.name.value
        };
        // console.log(datas);
        axios.post(process.env.API_URL + '/api/propinsi/add', datas)
            .then(res => {
                console.log(res);
                setAlertError(false);
                setAlertSuccess(true);
                setMessageSuccess(res.data);
                document.getElementById("formInput").reset();
            }).catch(error => {
                if (error.response) {
                    console.log(error.response);
                    setAlertError(true);
                    setAlertSuccess(false);
                    setMessageError(error.response);
                }
            });
    }

    const renderErrors = () => {

        if (alertError && messageError.data.status4 == false) {
            return (
                <>
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {messageError.data.errors}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </>
            )
        }
        else if (alertError && messageError.data.status2 ==false) {
            return (
                <>
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                       {'Ini Kalau input ID > 100 muncul error'}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </>
            )
        }
        else if (alertError && messageError.data.status5 ==false) {
            return (
                <>
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                       {'Form tidak boleh kosong'}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </>
            )
        }
    }

    const renderSuccesses = () => {
        if (alertSuccess) {
            console.log(messageSuccess);
        }
        if (alertSuccess && messageSuccess.status3 == true) {
            return (
                <>
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {messageSuccess.message}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </>
            )
        }
    }

    return (
        <div>
            <div className="container py-3">

                <div className="card">
                    <div className="card-body">
                        <h3 className="mb-3">
                            Add Data
                        </h3>
                        {renderErrors()}
                        {renderSuccesses()}
                        <form onSubmit={handleSubmit} id="formInput">
                            <div className="mb-3 row">
                                <label htmlFor="inputID" className="col-sm-2 col-form-label">ID</label>
                                <div className="col-sm-10 col-lg-4 col-md-4">
                                    <input type="number" className="form-control" name="id" id="inputID"
                                    //  max={99}
                                     />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10 col-lg-4 col-md-4">
                                    <input type="text" name="name" className="form-control" id="inputName" />
                                </div>
                            </div>
                            <button className="btn btn-primary">Submit</button>
                            <Link to={'/'} title="Back" className="mx-2 btn btn-warning">Back</Link>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    );
}