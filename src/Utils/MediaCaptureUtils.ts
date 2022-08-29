var cameraStream: MediaStream;

export const getNextDevicePair = async () => {
  return await navigator.mediaDevices.enumerateDevices()
}

export const initCameraStream = async (opts?: any) => {
  return new Promise(async (resolve, reject)=>{
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia(opts || {
        audio: true,
        video: true
      })
      resolve(cameraStream);
    } catch (error) {
      console.log('An error occured while capturing camera');
      reject('Something went wrong ! Could not capture user media');
    }
  })
}
export const getCameraStream = () => {
  return new Promise<MediaStream>(async (resolve, reject)=>{
    if((cameraStream !== undefined) && (cameraStream !== null) && cameraStream.id) {
      console.log('Camera stream avaialble');
      resolve(cameraStream);
    }
    reject('Camera stream not available');

  })
}

export const switchCamera = () => {

}

export const stopMediaStreams = ()=> {
  return new Promise<void>( (resolve, reject) => {
    try {
      console.log(cameraStream);
      const tracks = cameraStream.getTracks();
      tracks.forEach(function(track) {
        track.stop();
      });
      // for(const track of cameraStream.getTracks()) {
      //   console.log('stopping local media');
      //   console.log(track);
      //   track.stop();
      // }
      console.log('stopped all');
      console.log(cameraStream.getTracks());
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}