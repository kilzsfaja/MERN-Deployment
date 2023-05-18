import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const CreateOne = () => {
  // ---- state ----
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [chests, setChests] = useState(0);
  const [catchPhrase, setCatchPhrase] = useState("");
  const [position, setPosition] = useState("");
  const [pegLeg, setPegLeg] = useState(true);
  const [eyePatch, setEyePatch] = useState(true);
  const [hookHand, setHookHand] = useState(true);
  const [errors, setErrors] = useState([]);

  // ---- navigate ----
  const navigate = useNavigate();

  // ---- create one ----
  const createPirate = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:8000/api/pirates")
      .then((serverRes) => {
        const existingCrewMembers = serverRes.data;

        // --- check if captain exists ----
        const captainExists = existingCrewMembers.some(
          (member) => member.position === "Captain"
        );

        if (captainExists && position === "Captain") {
          setErrors(["There can only be 1 Captain Jack Sparrow!"]);
        } else {
          const tempToServer = {
            name: name,
            image: image,
            chests: chests,
            catchPhrase: catchPhrase,
            position: position,
            pegLeg: pegLeg,
            eyePatch: eyePatch,
            hookHand: hookHand,
          };

          // ---- post new pirate to server ----
          axios
            .post("http://localhost:8000/api/pirates", tempToServer)
            .then((serverRes) => {
              console.log(serverRes.data);
              navigate("/pirates");
            })
            .catch((err) => {
              const errorResponseObj = err.response.data.errors;
              console.log("❌", err.response.data.errors);
              const errorArr = [];
              for (const key of Object.keys(errorResponseObj)) {
                errorArr.push(errorResponseObj[key].message);
              }
              setErrors(errorArr);
            });
        }
      })
      .catch((err) => {
        console.log("❌",err);
      });
  };
  return (
    <>
      <div className="d-flex justify-content-between my-5">
        <h1>Add Pirate</h1>
        <Link to={"/pirates"}>
          <button className="btn btn-info">Crew Board</button>
        </Link>
      </div>
      <div>
        <form onSubmit={createPirate}>
          <div>
            {errors.map((err, index) => (
              <h5 style={{ color: "red" }} key={index}>
                {err}
              </h5>
            ))}
            <label className="form-label">Pirate Name:</label>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="form-label">Image Url:</label>
            <input
              className="form-control"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <label className="form-label"># of Treasure Chests:</label>
            <input
              className="form-control"
              type="number"
              min={0}
              value={chests}
              onChange={(e) => setChests(e.target.value)}
            />
            <label className="form-label">Pirate Catch Phrase</label>
            <input
              className="form-control"
              type="text"
              value={catchPhrase}
              onChange={(e) => setCatchPhrase(e.target.value)}
            />
            <label className="form-label">Crew Position</label>
            <select
              className="form-select"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option>Select One:</option>
              <option value="Captain">Captain</option>
              <option value="First Mate">First Mate</option>
              <option value="Quarter Master">Quarter Master</option>
              <option value="Boatswain">Boatswain</option>
              <option value="Powder Monkey">Powder Monkey</option>
            </select>
            <div className="custom-control custom-checkbox mt-2">
              <input
                type="checkbox"
                className="custom-control-input"
                checked={pegLeg}
                onChange={(e) => setPegLeg(e.target.checked)}
              />
              <label className="custom-control-label ms-2">Peg Leg</label>
            </div>
            <div className="custom-control custom-checkbox mt-2">
              <input
                type="checkbox"
                className="custom-control-input"
                checked={eyePatch}
                onChange={(e) => setEyePatch(e.target.checked)}
              />
              <label className="custom-control-label ms-2">Eye Patch</label>
            </div>
            <div className="custom-control custom-checkbox mt-2">
              <input
                type="checkbox"
                className="custom-control-input"
                checked={hookHand}
                onChange={(e) => setHookHand(e.target.checked)}
              />
              <label className="custom-control-label ms-2">Hook Hand</label>
            </div>
            <button className="btn btn-success mt-3">Add Pirate</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateOne;
