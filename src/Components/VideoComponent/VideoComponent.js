/** @jsx jsx */

import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';


const VideoComponent = ({ready, fallbackText ,getMediaStream}) => {

  const videoElement = useRef(null);

  useEffect(()=>{
    setMediStream();
  })

  const setMediStream = async () => {
    if(ready && getMediaStream ){
      const mediaStream = await getMediaStream();
      videoElement.current.srcObject = mediaStream;
    }
  }
  
  if(!ready) {
    return(
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '500px',
          minHeight: '300px',
          margin: '30px',
          background: '#dddd'
        }}
      >
        <p>
          { fallbackText || 'Video not loaded' }
        </p>
      </div>
    )
  }

  return(
    <video
      ref= {videoElement}
      autoPlay
      css={{
        maxWidth: '500px',
        margin: '30px',
      }}>
      <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"/>
    </video>
  )
}

VideoComponent.propTypes = {
 ready: PropTypes.bool.isRequired,
 fallbackText: PropTypes.string,
 getMediaStream: PropTypes.func.isRequired,
}

export default VideoComponent