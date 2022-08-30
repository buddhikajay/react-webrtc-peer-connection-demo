import { useState } from "react";
import {
  CAPTURE_USER_MEDIA,
  CREATE_PEER_CONNECTIONS,
  START_NEGOTIATION,
  NEGOTIATING,
  NEGOTIATION_COMPLETED,
  STOP_STREAMING,
} from "./constants";
import {
  captureLocalStream,
  getLocalStream,
  stopMediaStream,
  switchDevice,
  CurrentDeviceType,
} from "./Utils/MediaCaptureUtils";
import {
  createPeerConnections,
  startStreaming,
  getRemoteStream,
  stopPeerConnections,
  getLocalPeerStats,
  getRemotePeerStats
} from "./Utils/WebRTCUtils";
import VideoComponent from "./Components/VideoComponent/VideoComponent";
import ButtonComponent from "./Components/ButtonComponent/ButtonComponent";
import ConnectionStatsComponent from "./Components/ConnectionStatsComponent/ConnectionStatsComponent";

const App = () => {
  const [nextAction, setNextAction] = useState(CAPTURE_USER_MEDIA);
  const [controlButtonText, setControlButtonText] =
    useState("Capture User Media");
  const [currentDeviceIds, setCurrentDeviceIds] = useState<CurrentDeviceType>(
    {}
  );
  const initializeStreams = async () => {
    await captureLocalStream();
  };

  const startVideoStreaming = async () => {
    const localStream = getLocalStream();
    await startStreaming(localStream);
  };

  const stopStreaming = async () => {
    const localStream = getLocalStream();
    await stopMediaStream(localStream);
    await stopPeerConnections();
  };

  const handleButtonClick = async () => {
    console.log(nextAction);
    switch (nextAction) {
      case CAPTURE_USER_MEDIA:
        await initializeStreams();
        setNextAction(CREATE_PEER_CONNECTIONS);
        setControlButtonText("Create Peer Connections");
        break;
      case CREATE_PEER_CONNECTIONS:
        createPeerConnections();
        setNextAction(START_NEGOTIATION);
        setControlButtonText("Start Negotiation");
        break;
      case START_NEGOTIATION:
        setNextAction(NEGOTIATING);
        await startVideoStreaming();
        setNextAction(NEGOTIATION_COMPLETED);
        setNextAction(STOP_STREAMING);
        setControlButtonText("Stop Streaming");
        break;
      case STOP_STREAMING:
        setNextAction(CAPTURE_USER_MEDIA);
        setControlButtonText("Capture User Media");
        stopStreaming();
        break;
      default:
        return;
    }
  };
  const handleSwitchDevice = async (kind: MediaDeviceInfo['kind']) => {
    const newDeviceIds = await switchDevice(kind);
    await startStreaming(getLocalStream());
    console.log('set current device ids', newDeviceIds);
    setCurrentDeviceIds(newDeviceIds);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "spaceAround",
        alignItems: "center",
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "spaceAround",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ConnectionStatsComponent
            getStats={getLocalPeerStats}
            ready={nextAction > NEGOTIATION_COMPLETED}
          />
          <VideoComponent
            ready={nextAction !== CAPTURE_USER_MEDIA}
            mediaStream={getLocalStream()}
          />
          <div>
            <p>{`Camera: ${currentDeviceIds.videoinput}, mic: ${currentDeviceIds.audioinput}`}</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ConnectionStatsComponent
            getStats={getRemotePeerStats}
            ready={nextAction > NEGOTIATION_COMPLETED}
          />
          <VideoComponent
            ready={nextAction > NEGOTIATION_COMPLETED}
            mediaStream={getRemoteStream()}
          />
        </div>
      </section>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <ButtonComponent onClick={handleButtonClick} text={controlButtonText} />
        {nextAction > NEGOTIATION_COMPLETED && (
          <ButtonComponent
            onClick={() => handleSwitchDevice('videoinput')}
            text={"Switch Camera"}
          ></ButtonComponent>
        )}
        {nextAction > NEGOTIATION_COMPLETED && (
          <ButtonComponent
          onClick={() => handleSwitchDevice('audioinput')}
            text={"Switch Mic"}
          ></ButtonComponent>
        )}
      </section>
    </div>
  );
};

export default App;
