/** @jsx jsx */

import React from 'react';
import { jsx } from '@emotion/core';


const VideoComponent = (props) => {
  return(
    <video autoPlay css={{
      maxWidth: '500px',
      padding: '30px',
    }}>
      <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"/>
    </video>
  )
}

export default VideoComponent