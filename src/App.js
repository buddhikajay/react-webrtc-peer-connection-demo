/** @jsx jsx */

import React from 'react';
import { jsx } from '@emotion/core';
import logo from './logo.svg';
import VideoComponent from './Components/VideoComponent/VideoComponent';
import ButtonComponent from './Components/ButtonComponent/ButtonComponent'

function App() {
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
        <VideoComponent/>
        <VideoComponent/>
      </section>
      <section css={{
        display: 'fles',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <ButtonComponent/>
      </section>
    </div>
  );
}

export default App;
