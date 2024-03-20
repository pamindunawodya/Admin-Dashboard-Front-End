import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UserEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    // useEffect(() => {
    //     getUserData()
    // }, [])
    //
    // let getUserData = async () => {
    //     try {
    //         const headers = {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         };
    //         const users = await axios.get(`http://localhost:8085/auth`,{headers:headers});
    //         myFormik.setValues(users.data);
    //         setLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const myFormik = useFormik({
        initialValues: {
            email: params.id,
            username: "",
            fname: "",
            lname: "",
            password: ""
        },
        onSubmit: async (values) => {
            const headers={
                'Content-Type':'application/json'
            }
            try {
                setLoading(true);
                await axios.put(`http://localhost:8085/update/users`, values, { headers:headers });
                setLoading(false);
                navigate("/portal/user-list");
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    });


    return (
        <>

            <div className='container'>
                <form onSubmit={myFormik.handleSubmit}>
                    <h3>UserEdit - email : {params.id} </h3>

                    <input type="hidden" name="email" value={params.id} onChange={myFormik.handleChange} />

                    <div className='row'>
                        <div className="col-lg-6">
                            <label>Username</label>
                            <input name='username' value={myFormik.values.username} onChange={myFormik.handleChange} type={"text"}
                                   className={`form-control ${myFormik.errors.username ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.username}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>First-Name</label>
                            <input name='fname' value={myFormik.values.fname} onChange={myFormik.handleChange} type={"text"}
                                   className={`form-control ${myFormik.errors.fname ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.fname}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>Name</label>
                            <input name='lname' value={myFormik.values.lname} onChange={myFormik.handleChange} type={"text"}
                                   className={`form-control ${myFormik.errors.lname ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.lname}</span>
                        </div>



                        <div className="col-lg-6">
                            <label>Password</label>
                            <input name='password' value={myFormik.values.password} onChange={myFormik.handleChange} type={"text"}
                                   className={`form-control ${myFormik.errors.password ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.password}</span>
                        </div>


                        {/* Repeat similar code for other input fields */}
                        <div className='col-lg-4 mt-3'>
                            <input disabled={isLoading} type="submit" value={isLoading ? "Updating..." : "Update"} className=' btn btn-primary' />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UserEdit;