export type CurrentDeviceType =  {
  [key in MediaDeviceInfo["kind"]]?: string
}
let localStream: MediaStream;
let currentDeviceIds: CurrentDeviceType= {};
// let currentCameraDeviceId: string;
// let currentMicrophoneDeviceId: string;

interface getNextDeviceIdOptions {
  kind: MediaDeviceKind;
  currentDeviceId?: string;
}
// Returns the id of the next available device for a given input kind
// If current device is the only available device, return that
export const getNextDeviceId = async ({ kind, currentDeviceId }: getNextDeviceIdOptions): Promise<string> => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const availalbeDevices = devices.filter(device => device.kind === kind)
  // If no currentDevice, return the first device from the list
  if(!currentDeviceId) return availalbeDevices[0].deviceId;
  return availalbeDevices.filter(device => device.deviceId !== currentDeviceId)[0]?.deviceId || currentDeviceId;
}

export const captureLocalStream = async (opts?: MediaStreamConstraints) => {
  return new Promise(async (resolve, reject)=>{
    try {
      // capturing for the first time
      if(!opts) {
        const tempLocalStream = await navigator.mediaDevices.getUserMedia(opts || {
          audio: true,
          video: true
        });
        currentDeviceIds['audioinput'] = await getNextDeviceId({ kind: 'audioinput'});
        currentDeviceIds['videoinput'] = await getNextDeviceId({ kind: 'videoinput'});
        await stopMediaStream(tempLocalStream);
      }
      localStream = await navigator.mediaDevices.getUserMedia(opts || {
        audio: {
          deviceId: currentDeviceIds['audioinput']
        },
        video: {
          deviceId: currentDeviceIds['videoinput']
        }
      });

      resolve(localStream);
    } catch (error) {
      console.log('An error occured while capturing camera', error);
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

export const switchDevice = async (kind: MediaDeviceKind) => {
  const nextDeviceId = await getNextDeviceId({ kind, currentDeviceId: currentDeviceIds[kind]});
  const mediaStreamConstraints = {
    video: {
      deviceId: kind === 'videoinput' ?nextDeviceId: currentDeviceIds['videoinput']
    },
    audio: {
      deviceId: kind === 'audioinput' ?nextDeviceId: currentDeviceIds['audioinput']
    }
  }
  await captureLocalStream(mediaStreamConstraints);
  currentDeviceIds[kind] = nextDeviceId;
  return currentDeviceIds;
}

export const stopMediaStream = (stream: MediaStream)=> {
  if(!stream) return Promise.resolve();
  return new Promise<void>( (resolve, reject) => {
    try {
      console.log(localStream);
      const tracks = stream.getTracks();
      tracks.forEach(function(track) {
        track.stop();
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}