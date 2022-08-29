var cameraStream = undefined;

export const getNextDevicePair = async () => {
  return await navigator.mediaDevices.enumerateDevices()
}

export const initCameraStream = async (opts) => {
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
  return new Promise(async (resolve, reject)=>{
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
  return new Promise( (resolve, reject) => {
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