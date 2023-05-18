import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DisplayAll = () => {
  // ---- state ------
  const [pirates, setPirates] = useState([]);

  // ---- get all ----
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pirates")
      .then((serverRes) => {
        console.log(serverRes.data);
        const sortedPirates = serverRes.data.sort((a, b) => a.name.localeCompare(b.name));
        setPirates(sortedPirates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ---- delete one ----
  const deletePirate = (pirateId) => {
    axios
      .delete("http://localhost:8000/api/pirates/" + pirateId)
      .then((serverRes) => {
        console.log(serverRes.data);
        const updatePirate = pirates.filter(
          (pirate) => pirate._id !== pirateId
        );
        setPirates(updatePirate);
      })
      .catch((serverError) => console.log("❌", serverError));
  };

  return (
    <>
      <div className="d-flex justify-content-between my-5">
        <h1>Pirate Crew</h1>
        <Link to={"/pirate/new"}><button className="btn btn-info">Add Pirate</button></Link>
      </div>
      {/* ---- map through pirate crew ---- */}
      {pirates.map((pirate) => {
        return (
          <div className="card mt-3 mb-3" key={pirate._id}>
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={pirate.image}
                  className="img-fluid rounded-start pirateImg"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">{pirate.name}</h3>
                  <p className="card-text mt-5">
                    <Link to={`/pirate/${pirate._id}`}>
                      <button className="btn btn-info">View Pirate</button>
                    </Link>
                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => deletePirate(pirate._id)}
                    >
                      Walk the Plank
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DisplayAll;
