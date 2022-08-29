let localStream: MediaStream;
// let currentCameraDeviceId: string;
// let currentMicrophoneDeviceId: string;

export const getNextDevicePair = async () => {
  return await navigator.mediaDevices.enumerateDevices()
}



export const initLocalStream = async (opts?: any) => {
  return new Promise(async (resolve, reject)=>{
    try {
      localStream = await navigator.mediaDevices.getUserMedia(opts || {
        audio: true,
        video: true
      })
      resolve(localStream);
    } catch (error) {
      console.log('An error occured while capturing camera');
      reject('Something went wrong ! Could not capture user media');
    }
  })
}
export const getLocalStream = () => {
  return new Promise<MediaStream>(async (resolve, reject)=>{
    if((localStream !== undefined) && (localStream !== null) && localStream.id) {
      console.log('Camera stream avaialble');
      resolve(localStream);
    }
    reject('Camera stream not available');

  })
}

export const switchCamera = () => {

}

export const stopMediaStreams = ()=> {
  return new Promise<void>( (resolve, reject) => {
    try {
      console.log(localStream);
      const tracks = localStream.getTracks();
      tracks.forEach(function(track) {
        track.stop();
      });
      // for(const track of localStream.getTracks()) {
      //   console.log('stopping local media');
      //   console.log(track);
      //   track.stop();
      // }
      console.log('stopped all');
      console.log(localStream.getTracks());
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}