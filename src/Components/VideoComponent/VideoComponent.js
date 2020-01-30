/** @jsx jsx */

import React, {useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { jsx } from '@emotion/core';


const VideoComponent = ({ready, fallbackText ,_getSourceObject}) => {

  const videoElement = useRef(null);

  useEffect(()=>{
    if(videoElement && _getSourceObject && videoElement.current)
    videoElement.current.srcObject = _getSourceObject();
  })
  
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
 _getSourceObject: PropTypes.func.isRequired,
}

export default VideoComponent