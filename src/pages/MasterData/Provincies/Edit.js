import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

export default function EditProvince() {
    const [province, setProvince] = React.useState(null);
    const [alertSuccess, setAlertSuccess] = React.useState(false);
    const [alertError, setAlertError] = React.useState(false);
    const [messageSuccess, setMessageSuccess] = React.useState();

    const id  = useParams().id

    React.useEffect(() => {
        axios.get(process.env.API_URL + `/api/propinsi/viewedit?id_prov=`+id).then((response) => {
            setProvince(response.data);
            
        });
    }, [id,province]);



    const handleSubmit = async event => {
        event.preventDefault();
        //  console.log(province.data[0].name);

        const data = {
            name: event.target.name.value
        };
        // console.log(datas);
        axios.post(process.env.API_URL + `/api/propinsi/update?id_prov=`+province.data[0].id, data)
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
 
    return (
      
        <div>
            <div className="container py-3">

                <div className="card">
                    <div className="card-body">
                        <h3 className="mb-3">
                            Edit Data
                        </h3>
                        {renderMessages()}
                        <form onSubmit={handleSubmit} id="formInput">
                            <div className="mb-3 row">
                                <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10 col-lg-4 col-md-4">
                                    <input type="text" name="name" className="form-control" id="inputName" defaultValue={province && province.data[0].name}/>
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