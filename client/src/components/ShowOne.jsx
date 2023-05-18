import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ShowOne = () => {
  // ---- get one by :id ----
  const { id } = useParams();

  // ---- state ----
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [chests, setChests] = useState(0);
  const [catchPhrase, setCatchPhrase] = useState("");
  const [position, setPosition] = useState("Captain");
  const [pegLeg, setPegLeg] = useState(true);
  const [eyePatch, setEyePatch] = useState(true);
  const [hookHand, setHookHand] = useState(true);

  // ---- get one from db ----
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pirates/${id}`)
      .then((serverRes) => {
        console.log(serverRes.data);
        setName(serverRes.data.name);
        setImage(serverRes.data.image);
        setChests(serverRes.data.chests);
        setCatchPhrase(serverRes.data.catchPhrase);
        setPosition(serverRes.data.position);
        setPegLeg(serverRes.data.pegLeg);
        setEyePatch(serverRes.data.eyePatch);
        setHookHand(serverRes.data.hookHand);
      })
      .catch((serverErr) => console.log(serverErr));
  }, [id]);

  // ---- patch hook, leg and eye ----
  const updatePirate = () => {
    const updatedPirate = {
      eyePatch: eyePatch,
      pegLeg: pegLeg,
      hookHand: hookHand,
    };

    axios
      .patch(`http://localhost:8000/api/pirates/${id}`, updatedPirate)
      .then((serverRes) => {
        console.log(serverRes.data);
      })
      .catch((serverErr) => {
        console.log(serverErr);
      });
  };

  // ---- toggles for eye, leg and hook ----
  const toggleEyePatch = () => {
    setEyePatch(!eyePatch);
    updatePirate()
  };

  const togglePegLeg = () => {
    setPegLeg(!pegLeg);
    updatePirate()
  };

  const toggleHookHand = () => {
    setHookHand(!hookHand);
    updatePirate()
  };

  return (
    <>
      <div className="d-flex justify-content-between my-5">
        <h1>{name}</h1>
        <Link to={"/pirates"}>
          <button className="btn btn-info">Crew Board</button>
        </Link>
      </div>
      <div className="row">
        <div className="col p-3">
          <img src={image} alt="pirateImage" className="showOneImg" />
          <h2 className="mt-2">"{catchPhrase}"</h2>
        </div>
        <div className="col p-3">
          <h2>About</h2>
          <p>Position: {position}</p>
          <p>Treasures: {chests}</p>
          <p>Peg Leg: {pegLeg ? "✔" : "❌"}</p>
          <button className="btn btn-info mb-3" onClick={togglePegLeg}>
            {pegLeg ? "Lost it again!" : "Got a new leg!"}
          </button>
          <p>Eye Patch: {eyePatch ? "✔" : "❌"}</p>
          <button className="btn btn-info mb-3" onClick={toggleEyePatch}>
            {eyePatch ? "Lost it again!" : "Found my eyeball!"}
          </button>
          <p>Hook Hand: {hookHand ? "✔" : "❌"}</p>
          <button className="btn btn-info mb-3" onClick={toggleHookHand}>
            {hookHand ? "Lost a limb" : "Got it reconnected"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ShowOne;
