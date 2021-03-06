/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import logo from './logo.svg';
import { CAPTURE_USER_MEDIA, CREATE_PEER_CONNECTIONS, START_NEGOTIATION, NEGOTIATING, NEGOTIATION_COMPLETED, STOP_STREAMING } from './constants'
import { initCameraStream, getCameraStream, stopMediaStreams } from './Utils/MediaCaptureUtils';
import { createPeerConnections, startStreaming, getRemoteStream, stopPeerConnections, getLocalPeerStats, getRemotePeerStats } from './Utils/WebRTCUtils';
import VideoComponent from './Components/VideoComponent/VideoComponent';
import ButtonComponent from './Components/ButtonComponent/ButtonComponent';
import ConnectionStatsComponent from './Components/ConnectionStatsComponent/ConnectionStatsComponent';

const App = () => {

  const [nextAction, setNextAction] = useState(CAPTURE_USER_MEDIA);
  const [controlButtonText, setControlButtonText] = useState('Capture User Media');
  const initializeStreams = async () => {
   await initCameraStream();
  }

  const startVideoStreaming = async ()=> {
    const localStream  = await getCameraStream();
    await startStreaming(localStream);
  }

  const stopStreaming = async() => {
    await stopMediaStreams();
    await stopPeerConnections();
  }

  const handleButtonClick  = async () => {
    console.log(nextAction);
    switch(nextAction) {
      case CAPTURE_USER_MEDIA:
        await initializeStreams();
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
        setNextAction(NEGOTIATION_COMPLETED);
        setNextAction(STOP_STREAMING);
        setControlButtonText('Stop Streaming');
        break;
      case STOP_STREAMING:
        setNextAction(CAPTURE_USER_MEDIA);
        setControlButtonText('Capture User Media');
        stopStreaming();
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
        <div css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <ConnectionStatsComponent
            getStats={getLocalPeerStats}
            ready={nextAction > NEGOTIATION_COMPLETED}
          />
          <VideoComponent
            ready={nextAction !== CAPTURE_USER_MEDIA}
            getMediaStream={getCameraStream}
          />
        </div>
        <div css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <ConnectionStatsComponent
            getStats={getRemotePeerStats}
            ready={nextAction > NEGOTIATION_COMPLETED}
          />
          <VideoComponent
            ready={nextAction > NEGOTIATION_COMPLETED}
            getMediaStream={getRemoteStream}
          />
        </div>
      </section>
      <section css={{
        display: 'flex',
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
