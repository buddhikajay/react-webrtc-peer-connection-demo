import { getCameraStream } from "./MediaCaptureUtils";

var localPeerConnection = null;
var remotePeerConnection = null;
var remoteStream = null;

const configuration = { iceServers: [{
  urls: "stun:stun.l.google.com:19302"
}]};
export const createPeerConnections = () => {
  localPeerConnection = new RTCPeerConnection(configuration);
  remotePeerConnection = new RTCPeerConnection(configuration);
}

const addMediaStreamToPeerConnection = (mediaStream, pc) => {
  for(const track of mediaStream.getTracks()) {
    pc.addTrack(track, mediaStream);
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
        if(e.candidate && (isSrflx(e.candidate))){
          console.log('Adding Candidate')
          remotePeerConnection.addIceCandidate(e.candidate);
        }
      }
      remotePeerConnection.onicecandidate = (e)=>{
        if(e.candidate && (isSrflx(e.candidate))){
          console.log('Adding Candidate')
          localPeerConnection.addIceCandidate(e.candidate);
        }
      }

      remotePeerConnection.ontrack = (e)=>{
        console.log('Event received');
        console.log(e);
        remoteStream = e.streams[0];
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

const stopStream = (stream) => {
  return new Promise(async (resolve, reject) => {
    try {
      for(const track of stream.getTracks()) {
        await track.stop();
      }
      resolve()
    } catch (error) {
      reject(error);
    }
  })
}
export const stopPeerConnections = ()=> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('stopping remote stram');
      await stopStream(remoteStream);
      await localPeerConnection.close();
      await remotePeerConnection.close();

      resolve();
    } catch (error) {
      reject(error);
    }
  })
}

export const isSrflx = ({candidate}) => {
  console.log(candidate);
  const regex = /typ (?<candidateType>host|srflx|relay)/;
  const found = candidate.match(regex);
  return found && found.groups && (found.groups.candidateType === 'host');
}

export const getRemoteStream = () => {
  return new Promise((resolve, reject) => {
    resolve(remoteStream)
  })
};

const getRTPtats = (pc) => {
  return new Promise((resolve, reject)=>{
    if(pc){
      resolve(pc.getStats())
    }
    reject('Cannot get stats. No active peer connection');
  })
}

export const getLocalPeerStats = () => {
  return getRTPtats(localPeerConnection);
}

export const getRemotePeerStats = () => {
  return getRTPtats(remotePeerConnection);
}