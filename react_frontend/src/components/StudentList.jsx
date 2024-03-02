import React, { useEffect, useState } from "react";
import EditStudent from "./EditStudent";
import { deleteStudent } from "../service/StudentService";
import AddStudent from "./AddStudent";
import { Link } from "react-router-dom";
import { Table } from 'flowbite-react';
import { api } from "../api/api";
import { Button } from "flowbite-react";

const StudentList = () => {
  const [data, setData] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false); // State to manage delete alert visibility
  const [showEditAlert, setShowEditAlert] = useState(false);

  // Fetch Student Data List
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("http://localhost:8080/studentList");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStData = async (studentId) => {
    try {
      await deleteStudent(studentId);
      setShowDeleteAlert(true); // Show delete alert after successful deletion
      fetchData(); // Fetch updated data after deletion
      // Hide delete alert after 3 seconds
      setTimeout(() => {
        setShowDeleteAlert(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };


  const updateStudentList = () => {
    fetchData();
  };

  return (
    
    <div>
      
      <div className="md:mx-10 lg:mx-12 md:p-3 md:p-6 justify-content-center d-flex" style={{backgroundColor:"#f5ece1"}}>
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl mb-2">
          WELCOME TO STUDENT MANAGEMENT SYSTEM
        </h1>
      </div>
      
      <div className="flex justify-around mt-8 ms-5">
        <AddStudent updateStudentList={fetchData} />
        <Link to="/studentListView">
          <Button type="button" color="purple">
            ALL <span className="ms-1 d-none d-md-inline">Student</span>
          </Button>
        </Link>
      </div>
      {(showDeleteAlert || showEditAlert) && (
    <div className={`flex items-center p-4 mb-4 text-sm rounded-lg justify-center mx-auto ${showDeleteAlert ? 'bg-red-50 dark:bg-gray-800 dark:text-red-400' : 'bg-blue-50 dark:bg-gray-800 dark:text-blue-400'}`}>
      <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span className="sr-only">{showDeleteAlert ? 'Alert!' : 'Info Alert!'}</span>
      <div>
        <span className="font-medium">{showDeleteAlert ? 'Alert!' : 'Info Alert!'}</span> {showDeleteAlert ? 'Data Deleted.!' : 'Successfully Edited.'}
      </div>
    </div>
  )}
      <div className="overflow-x-auto">
        <Table hoverable striped style={{ backgroundColor: "blue" }}>
          {/* Table header */}
          <Table.Head style={{ backgroundColor: "blue" }}>
            {/* Table header cells */}
            <Table.HeadCell style={{ backgroundColor: "#B4ACA3", color: "white" }}>No.</Table.HeadCell>
            <Table.HeadCell style={{ backgroundColor: "#B4ACA3", color: "white" }}>ID</Table.HeadCell>
            <Table.HeadCell style={{ backgroundColor: "#B4ACA3", color: "white" }}>Name</Table.HeadCell>
            <Table.HeadCell style={{ backgroundColor: "#B4ACA3", color: "white" }}>Age</Table.HeadCell>
            <Table.HeadCell style={{ backgroundColor: "#B4ACA3", color: "white" }}>Email</Table.HeadCell>
            <Table.HeadCell style={{ backgroundColor: "#B4ACA3", color: "white" }}>Address</Table.HeadCell>
            <Table.HeadCell style={{ backgroundColor: "#B4ACA3", color: "white" }}>Phone</Table.HeadCell>
            <Table.HeadCell style={{ backgroundColor: "#B4ACA3", color: "white" }}>Action</Table.HeadCell>
          </Table.Head>
          {/* Table body */}
          <Table.Body hoverable>
            {data.map((datas, index) => (
              <Table.Row key={datas.studentId || index} hoverable className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{datas.studentId}</Table.Cell>
                <Table.Cell>{datas.studentName}</Table.Cell>
                <Table.Cell>{datas.studentAge}</Table.Cell>
                <Table.Cell>{datas.studentEmail}</Table.Cell>
                <Table.Cell>{datas.studentAddress}</Table.Cell>
                <Table.Cell>{datas.studentPhone}</Table.Cell>
                <Table.Cell>
                  <div className="flex">
                    <EditStudent key={index} studentName={datas.studentName} className="me-2" updateStudentList={updateStudentList} showAlertMessage={setShowEditAlert}
 />
                    <Button type="button" onClick={() => deleteStData(datas.studentId)} color="failure">Delete</Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      
      </div>     
    </div>
  );
};

export default StudentList;
