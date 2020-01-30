/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import logo from './logo.svg';
import { CAPTURE_USER_MEDIA, CREATE_PEER_CONNECTIONS, START_NEGOTIATION, STATUS_NEGOTIATION_STARTED, START_STREAMING, STATUS_STREAMING } from './constants'
import { getCameraStream } from './Utils/MediaCaptureUtils';
import { createPeerConnections, startStreaming } from './Utils/WebRTCUtils';
import VideoComponent from './Components/VideoComponent/VideoComponent';
import ButtonComponent from './Components/ButtonComponent/ButtonComponent'

const App = () => {

  const [nextAction, setNextAction] = useState(CAPTURE_USER_MEDIA);
  const [controlButtonText, setControlBetButtonText] = useState('Capture User Media');
  const initializeStreams = async () => {
    const cameraStream = await getCameraStream();
  }

  const startVideoStreaming = async ()=> {
    const localStream  = await getCameraStream();
    await startStreaming(localStream);
  }
  const handleButtonClick  = async () => {
    console.log(nextAction);
    switch(nextAction) {
      case CAPTURE_USER_MEDIA:
        initializeStreams();
        setNextAction(CREATE_PEER_CONNECTIONS);
        setControlBetButtonText('Create Peer Connections');
        break;
      case CREATE_PEER_CONNECTIONS:
        createPeerConnections();
        setNextAction(START_NEGOTIATION);
        setControlBetButtonText('Start Negotiation');
        break;
      case START_NEGOTIATION:
        startVideoStreaming();
        setNextAction(STATUS_NEGOTIATION_STARTED);
        setControlBetButtonText('Start Streaming');
        break;
      case START_STREAMING:
        setNextAction(STATUS_STREAMING);
        setControlBetButtonText('Stop Streaming');
        break;
      default:
        return
    }
  }
  return (
    <div css={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'spaceAround',
      alignItems: 'center'
    }}>
      <section css={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'spaceAround'
        
      }}>
        <VideoComponent
          ready={nextAction !== CAPTURE_USER_MEDIA}
          getMediaStream={getCameraStream}
        />
        <VideoComponent
          ready={true}
          getMediaStream={()=>null}
        />
      </section>
      <section css={{
        display: 'fles',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <ButtonComponent
          onClick={handleButtonClick}
          text= {controlButtonText}
        />
      </section>
    </div>
  );
}

export default App;
