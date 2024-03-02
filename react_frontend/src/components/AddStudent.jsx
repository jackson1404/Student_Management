import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addStudent } from "../service/StudentService";
import { Button } from "flowbite-react";

const AddStudent = ({updateStudentList}) => {
  const [openModal, setOpenModal] = useState(false);
  const [studentName, setName] = useState("");
  const [studentAge, setAge] = useState("");
  const [studentPhone, setPhone] = useState("");
  const [studentEmail, setEmail] = useState("");
  const [studentAddress, setAddress] = useState("");

  const postStData = async () => {
    if (
      studentName !== "" &&
      studentAge > 4 &&
      studentAge < 41 &&
      studentPhone !== "" &&
      studentEmail !== "" &&
      studentAddress !== ""
    ) {
      const stData = {
        studentName: studentName,
        studentAge: studentAge,
        studentEmail: studentEmail,
        studentAddress: studentAddress,
        studentPhone: studentPhone,
      };

      // Create Student Data
      await addStudent(stData);
      onCloseModal();
      setName("");
      setAge("");
      setPhone("");
      setEmail("");
      setAddress("");

      updateStudentList();
    } else {
      // Handle invalid input
    }
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Link to="/addStudent">
        <Button 
          color="blue"
          style={{ margin: '0px 10px 20px -40px' }} // Adjust the margin value as needed
          onClick={() => setOpenModal(true)}
        >
          Add <span className="ms-1 hidden md:block">Student</span>
        </Button>
      </Link>

      {openModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Student Register</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <input
                        placeholder="Name"
                        value={studentName}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control mb-3"
                        required
                      />
                      <input
                        placeholder="Age (5 - 45)"
                        value={studentAge}
                        onChange={(e) => setAge(e.target.value)}
                        type="number"
                        min="5"
                        max="40"
                        className="form-control mb-3"
                        required
                      />
                      <input
                        placeholder="Email"
                        value={studentEmail}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control mb-3"
                        required
                      />
                      <textarea
                        placeholder="Address..."
                        value={studentAddress}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control mb-3"
                        rows={2}
                        required
                      ></textarea>
                      <input
                        placeholder="Phone"
                        value={studentPhone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="tel"
                        className="form-control mb-3"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onCloseModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={postStData}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStudent;
