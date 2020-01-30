/** @jsx jsx */

import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import logo from './logo.svg';
import { getCameraStream } from './Utils/MediaCaptureUtils';
import VideoComponent from './Components/VideoComponent/VideoComponent';
import ButtonComponent from './Components/ButtonComponent/ButtonComponent'

const App = () => {

  const [ready, setReady] = useState(false);
  const initializeStreams = async () => {
    const cameraStream = await getCameraStream();
    if(typeof(cameraStream) !== 'string') {
      setReady(true);
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
          ready={ready}
          getMediaStream={getCameraStream}
        />
        <VideoComponent
          ready={ready}
          getMediaStream={()=>null}
        />
      </section>
      <section css={{
        display: 'fles',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <ButtonComponent
          onClick={initializeStreams}
        />
      </section>
    </div>
  );
}

export default App;
