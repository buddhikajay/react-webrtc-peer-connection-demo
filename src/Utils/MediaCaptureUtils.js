var cameraStream = undefined;

export const getCameraStream = () => {
  return new Promise((resolve, reject)=>{
    if((cameraStream !== undefined) && (cameraStream !== null) && cameraStream.id) {
      console.log('Camera stream avaialble');
      resolve(cameraStream);
    }
    try {
      cameraStream = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }).then(resolve(cameraStream));
    } catch (error) {
      console.log('An error occured while capturing camera');
      reject('Something went wrong ! Could not capture user media');
    }
  })
}