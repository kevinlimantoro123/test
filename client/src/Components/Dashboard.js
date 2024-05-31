import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  async function getName() {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "POST",
        headers: { token: localStorage.token },
      });
      const parseRes = await res.json();
      setName(parseRes.name);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function verify() {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await res.json();
      setVerified(parseRes.auth);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      console.log("Logged out succcessfully");
      setVerified(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  useEffect(() => {
    verify();
  }, []);

  if (verified) {
    return (
      <Fragment>
        <h1>Welcome {name}</h1>
        <button
          className="btn btn-primary border-black border-2 p-2 m-2"
          onClick={logout}
        >
          Logout
        </button>
        <br />
        <span className="text-black border-black border-2 p-2 m-2">
          <a className="h-full" href="/calendar">
            calendar
          </a>
        </span>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h1>INVALID CREDENTIALS/SESSION HAS EXPIRED</h1>
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Sign in
        </button>
      </Fragment>
    );
  }
};

export default Dashboard;
