import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editToast } from "./Toaster";

const Edit = () => {
  const [isEdit, setEdit] = useState({});
  let { id } = useParams();
  useEffect(() => {
    const updateData = async () => {
      let responseUrl = await fetch(
        `https://task-668b3-default-rtdb.firebaseio.com/students/${id}.json`,
      );
      let data = await responseUrl.json();
      console.log(data);
      setEdit(data);
    };
    updateData();
  }, [id]);
let handleupdate = async (e) => {
  e.preventDefault();

  const dateObj = new Date(isEdit.datetime);

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedDate = `${String(dateObj.getDate()).padStart(2, "0")}-${String(
    dateObj.getMonth() + 1
  ).padStart(2, "0")}-${dateObj.getFullYear()} ${hours}:${String(
    minutes
  ).padStart(2, "0")} ${ampm}`;

  const updatedData = {
    ...isEdit,
    datetime: formattedDate,
  };

  await fetch(
    `https://task-668b3-default-rtdb.firebaseio.com/students/${id}.json`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );

  editToast();
  navigate("/");
};
  let navigate = useNavigate();
  return (
    <>
      <div className="from-block">
        <div className="form-top d-flex align-item-center justify-content-between">
          <h3>Edit Data</h3>
        </div>
        <form onSubmit={handleupdate}>
          <div className="from-control">
            <label> Username </label>
            <input
              type="text"
              value={isEdit.userName}
              onChange={(e) => setEdit({ ...isEdit, userName: e.target.value })}
            />
          </div>
          <div className="from-control">
            <label> Course </label>
            <input
              type="text"
              value={isEdit.Course}
              onChange={(e) => setEdit({ ...isEdit, Course: e.target.value })}
            />
          </div>
          <div className="from-control">
            <label> Year </label>
            <input
              type="text"
              value={isEdit.year}
              onChange={(e) => setEdit({ ...isEdit, year: e.target.value })}
            />
          </div>
          <div className="from-control">
            <label> Mail </label>
            <input
              type="text"
              value={isEdit.mail}
              onChange={(e) => setEdit({ ...isEdit, mail: e.target.value })}
            />
          </div>
          <div className="from-control">
            <label> Date Time </label>
            <input
              type="datetime-local"
              value={isEdit.datetime}
              onChange={(e) => setEdit({ ...isEdit, datetime: e.target.value })}
            />
          </div>
          <button className="btn btn-success">Update</button>
        </form>
      </div>
    </>
  );
};

export default Edit;
