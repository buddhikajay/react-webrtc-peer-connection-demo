var localPeerConnection = null;
var remotePeerConnection = null;

const configuration = { iceServers: [{
  urls: "stun:stun.services.mozilla.com"
}]};
export const createPeerConnections = () => {
  localPeerConnection = new RTCPeerConnection(configuration);
  remotePeerConnection = new RTCPeerConnection(configuration);
}

const addMediaStreamToPeerConnection = (mediaStream, pc) => {
  for(const track of mediaStream.getTracks()) {
    pc.addTrack(track);
  }
}

export const addMediaStreamToLocalPeerConnection = (mediaStream) => {
  addMediaStreamToPeerConnection(mediaStream, localPeerConnection)
}


export const startStreaming = (mediaStream) => {
  return new Promise( async (resolve, reject) => {
    try {

      addMediaStreamToPeerConnection(mediaStream, localPeerConnection);

      localPeerConnection.onicecandidate = (e)=>{
        if(e.candidate){
          remotePeerConnection.addIceCandidate(e.candidate);
        }
      }
      remotePeerConnection.onicecandidate = (e)=>{
        if(e.candidate){
          localPeerConnection.addIceCandidate(e.candidate);
        }
      }

      remotePeerConnection.ontrack = (e)=>{
        console.log('Event received');
        console.log(e.streams);
        resolve(e.streams[0]);
      };

      const localDescription = await localPeerConnection.createOffer();
      await localPeerConnection.setLocalDescription(localDescription);

      await remotePeerConnection.setRemoteDescription(localDescription);
      const answer = await remotePeerConnection.createAnswer();
      await remotePeerConnection.setLocalDescription(answer);

      await localPeerConnection.setRemoteDescription(answer);

      console.log(localPeerConnection);
      console.log(remotePeerConnection);


    } catch (error) {
      reject(error)
    }
  })
}