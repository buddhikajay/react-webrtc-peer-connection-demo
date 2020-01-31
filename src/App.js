/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import logo from './logo.svg';
import { CAPTURE_USER_MEDIA, CREATE_PEER_CONNECTIONS, START_NEGOTIATION, NEGOTIATING, NEGOTIATION_COMPLETED, START_STREAMING, STATUS_STREAMING } from './constants'
import { getCameraStream } from './Utils/MediaCaptureUtils';
import { createPeerConnections, startStreaming, getRemoteStream } from './Utils/WebRTCUtils';
import VideoComponent from './Components/VideoComponent/VideoComponent';
import ButtonComponent from './Components/ButtonComponent/ButtonComponent';

const App = () => {

  const [nextAction, setNextAction] = useState(CAPTURE_USER_MEDIA);
  const [controlButtonText, setControlButtonText] = useState('Capture User Media');
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
        setControlButtonText('Create Peer Connections');
        break;
      case CREATE_PEER_CONNECTIONS:
        createPeerConnections();
        setNextAction(START_NEGOTIATION);
        setControlButtonText('Start Negotiation');
        break;
      case START_NEGOTIATION:
        setNextAction(NEGOTIATING);
        await startVideoStreaming();
        setNextAction(NEGOTIATION_COMPLETED)
        setControlButtonText('Start Streaming');
        break;
      case NEGOTIATION_COMPLETED:
        setNextAction(STATUS_STREAMING);
        setControlButtonText('Stop Streaming');
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
          ready={nextAction == NEGOTIATION_COMPLETED}
          getMediaStream={getRemoteStream}
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
