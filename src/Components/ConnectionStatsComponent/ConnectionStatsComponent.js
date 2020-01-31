import React, {useState, useEffect} from 'react';


const ConnectionStatsComponent = ({getStats, ready}) => {

  const [stats, setStats] = useState({
    timestamp: 0,
    bytesSent: 0,
    bytesReceived: 0,
  });

  useEffect(()=>{
    let statInterval = null;
    if(ready){
      statInterval = setInterval(async ()=>{
        const peerStats = await getStats();
        for(const report of peerStats){
          const {timestamp, type, bytesSent, bytesReceived} = report[1];
          if(type == 'transport') {
            setStats({timestamp, bytesSent: bytesSent, bytesReceived: bytesReceived});
          }
        }
      }, 1000)
    }
    return ()=>{
      clearInterval(statInterval);
    }
  })


  return(
    <p>{ready && `sent: ${ Math.round(stats.bytesSent/1024) } / received: ${Math.round(stats.bytesReceived/1024)} (Kb)`}</p>
  )
}

export default ConnectionStatsComponent;