import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import VideoComponent from './VideoComponent';

test('Renders the default fallback text', ()=>{
  const defaultFallbackText = 'Video not loaded';
  render(
    <VideoComponent
      ready={false}
      _getSourceObject={()=>null}
    />
  );
  expect(screen.queryByText(defaultFallbackText)).toBeInTheDocument();
})

test('Renders the given fallback text', ()=>{
  const fallbackText = 'This is the fallback text';
  render(
    <VideoComponent
      ready={false}
      fallbackText={fallbackText}
      _getSourceObject={()=>null}
    />
  );
  expect(screen.queryByText(fallbackText)).toBeInTheDocument();
})

test('If the video is ready, it should call the getSrcObject', ()=>{
  const callback = jest.fn();
  render(
    <VideoComponent
      ready={true}
      _getSourceObject={()=>{callback()}}
    />
  );

  expect(callback).toHaveBeenCalledTimes(1);
})