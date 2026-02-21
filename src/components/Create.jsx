  import React from "react";
  import { useState } from "react";
  import { successToast } from "./Toaster";

  const Create = () => {
    let [username, setUsername] = useState("");
    let [course, setcourse] = useState("");
    let [year, setyear] = useState("");
    let [mail, setmail] = useState("");
    let [datetime, setDateTime] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      const formattedDate = new Date(datetime).toLocaleString("en-IN", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      console.log("Formatted:", formattedDate);

      fetch("https://task-668b3-default-rtdb.firebaseio.com/students.json", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          Course: course,
          year: year,
          mail: mail,
          datetime: formattedDate,
        }),
      });
      successToast();
      setUsername("");
      setcourse("");
      setyear("");
      setmail("");
      setDateTime("");
    };
    return (
      <>
        <div className="from-block">
          <h3>CRUD WITH FIREBASE</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="from-control">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="enter the name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="from-control">
              <label htmlFor="Course">Course</label>
              <input
                type="text"
                placeholder="enter the name"
                value={course}
                onChange={(e) => setcourse(e.target.value)}
              />
            </div>
            <div className="from-control">
              <label htmlFor="year">Year</label>
              <input
                type="text"
                placeholder="enter the name"
                value={year}
                onChange={(e) => setyear(e.target.value)}
              />
            </div>
            <div className="from-control">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                placeholder="enter the name"
                value={mail}
                onChange={(e) => setmail(e.target.value)}
              />
            </div>
            <div className="from-control">
              <label htmlFor="datetime">DateTime</label>
              <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  };

  export default Create;
