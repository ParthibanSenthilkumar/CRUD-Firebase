import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Read = () => {
  const [userData, setuserData] = useState([]);
  const [isError, seterror] = useState(null);
  const [isLoading, setloading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setloading(true);
        let response = await fetch(
          "https://task-668b3-default-rtdb.firebaseio.com/students.json",
        );
        let resData = await response.json();
        console.log(resData);
        let loaduser = [];
        for (let key in resData) {
          loaduser.push({
            id: key,
            ...resData[key],
          });
        }
        console.log("arryconversion", JSON.stringify(loaduser));
        setuserData(loaduser);
      } catch (error) {
        seterror(error.message);
      } finally {
        setloading(false);
      }
    };
    fetchdata();
  }, []);
  const navigate = useNavigate();
  const editHandeler = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <div className="container">
        <div className="user_details mt-5">
          <h3>User Details</h3>
          {isError && <p>{isError}</p>}
          <table className="table table-bordered mt-3 text-center">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>Name</th>
                <th>Course</th>
                <th>Year</th>
                <th>Datetime</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <div className="d-flex justify-content-center py-4">
                      <Loader />
                    </div>
                  </td>
                </tr>
              ) : (
                userData.map((user, index) => (
                  <tr key={user.id}>
                    <th>{index + 1}</th>
                    <td>{user.name || user.userName || "--"}</td>
                    <td>{user.Course || user.course || "--"}</td>
                    <td>{user.year || "--"}</td>
                    <td>{user.datetime || "--"}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary m-2"
                        onClick={() => editHandeler(user.id)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-outline-danger m-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Read;
