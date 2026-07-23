import React, { use, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// import styles from "../styles/videoComponent.Module.css";

const server = "http://localhost:3030";

var connection = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun.l.google.com:19302" }],
};

export default function VideoMeet() {
  var socketRef = useRef();
  let socketRefId = useRef();

  let localVideoRef = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);

  let [audioAvailable, setAudioAvailable] = useState(true);

  let [video, setVideo] = useState([]);

  let [audio, setAudio] = useState();

  let [screen, setScreen] = useState();

  let [showModal, setShowModal] = useState(true);

  let [screenAvailable, setScreenAvailable] = useState();

  let [messages, setMessages] = useState([]);

  let [message, setMessage] = useState("");

  let [newMessages, setNewMessages] = useState(0);

  let [askForUsername, setAskForUsername] = useState(true);

  let [username, setUsername] = useState("");

  const videoRef = useRef();

  let [videos, setVideos] = useState();

  useEffect(() => {
    getPermission();
  });

  let getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(() => {})
        .then((stream) => {})
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (video != undefined && audio != undefined) {
      getUserMedia();
    }
  }, [audio, video]);

  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);

    // connectToSocketServer();
  };

  const getPermission = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoPermission) {
        setVideoAvailable(true);
      } else {
        setVideoAvailable(false);
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      if (audioPermission) {
        setAudioAvailable(true);
      } else {
        setAudioAvailable(false);
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(true);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });

        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {askForUsername === true}

      <div>
        <h2>Enter into looby</h2>

        <TextField
          id="outlined-basic"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained">Connect</Button>
        <div>
          <video ref={localVideoRef} autoPlay muted></video>
        </div>
      </div>
    </div>
  );
}
