import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UserCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik(
    {
      initialValues: {
        username: "",
        fname: "",
        lname: "",
        email: "",
        password: ""
      },
      //Validating Forms while entering the data
      validate: (values) => {
        let errors = {};//Validating the form once the error returns empty else onsubmit won't work

        if (!values.username) {
          errors.username = "Please enter username";
        // } else if (values.username.length < 5) {
        //   errors.username = "Name shouldn't be less than 3 letters";
        // } else if (values.username.length > 20) {
        //   errors.username = "Name shouldn't be more than 20 letters";
        }

        if (!values.fname) {
          errors.city = "Please select any one city";
        }

        if (!values.lname) {
          errors.city = "Please select any one city";
        }


        if (!values.email) {
          errors.email = "Please enter email";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.password) {
          errors.country = "Please select any one state";
        }

        return errors;
      },
      //one can be able to submit once the validates returns empty value (validation successful) else can't be submitted
      onSubmit: async (values) => {
        const config = {
          headers:{
            'Content-Type': 'application/json',
          }

        };

        try {
          setLoading(true);
          await axios.post("http://localhost:8085/user", values,config);
          // console.log(values);
          navigate("/portal/user-list");
        } catch (error) {
          console.log(error);
          alert("Validation failed");
          setLoading(false);
        }


      }

    });
  return (
    <div className='container'>

      <form onSubmit={myFormik.handleSubmit}>
        <div className='row'>
          <div className="col-lg-6">
            <label>Name</label>
            <input name='username' value={myFormik.values.username} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.errors.username ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.username}</span>
          </div>

          <div className="col-lg-6">
            <label>Name</label>
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
            <label>E-Mail</label>
            <input name='email' value={myFormik.values.email} onChange={myFormik.handleChange} type={"mail"}
              className={`form-control ${myFormik.errors.email ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.email}</span>
          </div>

          <div className="col-lg-6">
            <label>Name</label>
            <input name='password' value={myFormik.values.password} onChange={myFormik.handleChange} type={"text"}
                   className={`form-control ${myFormik.errors.password ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.password}</span>
          </div>

          <div className='col-lg-4 mt-3'>
            <input disabled={isLoading} type="submit" value={isLoading ? "Submitting..." : "Create"} className=' btn btn-primary' />
          </div>
        </div>
      </form>
      {/* {JSON.stringify(myFormik.values)} */}
    </div>
  );
}

export default UserCreate