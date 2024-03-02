import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/api";
import { Button, TextInput} from 'flowbite-react'

const StudentListView = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [originalDataList, setOriginalDataList] = useState([]);
  const [searchInput, setsearchInput] = useState("");

  // Fetch Student Data List
  useEffect(() => {
    api.get("/studentList")
      .then((res) => {
        setDataList(res.data);
        setOriginalDataList(res.data); // Store the original list
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setsearchInput(inputValue);
    const filteredData = originalDataList.filter((student) =>
      student.studentId.toString().includes(inputValue)||
      student.studentName.toLowerCase().includes(inputValue) 
    );
    setDataList(inputValue === "" ? originalDataList : filteredData);
  };
  
  return (
    <div className="w-screen h-full" style={{backgroundColor:"#e9def4"}}>
      <div className="m-3 md:mx-10 lg:mx-12 md: p-3 md:p-6 flex justify-center text-white">
        <h1 className="font-bold text-dark text-xl md:text-2xl lg:text-3xl">
          WELCOME TO STUDENT MANAGEMENT SYSTEM
        </h1>
      </div>

      <div className="flex justify-around items-center">
        <div style={{marginLeft:'60px', marginRight:'-90px'}}>
        <Button
        onClick={() => navigate("/")}
        className=" ms-4 md:ms-10"
        color="purple"
      >
        Back
      </Button>
        </div>
      <div style={{marginLeft:'100px'}}>
      <TextInput
        className="w-100"
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Name.... or Id...."
      />
      </div>
      
      </div>
      <div className="flex flex-col w-full h-full overflow-x-auto">
        <div className="mx-5 lg:mx-10 py-2 sm:px-6 lg:px-8">
          <table className="table table-hover text-white">
            <thead className="bg-gradient">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length > 0 ? (
                dataList.map((student, index) => (
                  <tr key={student.studentId}>
                    <td>{student.studentId}</td>
                    <td>{student.studentName}</td>
                    <td>{student.studentAge}</td>
                    <td>{student.studentEmail}</td>
                    <td>{student.studentAddress}</td>
                    <td>{student.studentPhone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    NO Data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentListView;
