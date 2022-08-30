import { useRef, useEffect } from "react";

interface VideoComponentProps {
  ready: boolean;
  fallbackText?: string;
  mediaStream: MediaStream;
}

const VideoComponent = ({
  ready,
  fallbackText,
  mediaStream,
}: VideoComponentProps) => {
  const videoElement = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log('setting media stream to <video/>', mediaStream)
    setMediStream();
  });

  const setMediStream = async () => {
    if (ready && mediaStream) {
      if (videoElement && videoElement.current) {
        videoElement.current.srcObject = mediaStream;
      }
    }
  };

  if (!ready) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "500px",
          minHeight: "300px",
          margin: "30px",
          background: "#dddd",
        }}
      >
        <p>{fallbackText || "Video not loaded"}</p>
      </div>
    );
  }

  return (
    <video
      ref={videoElement}
      autoPlay
      style={{
        maxWidth: "500px",
        margin: "30px",
      }}
    >
      <source
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        type="video/mp4"
      />
    </video>
  );
};

export default VideoComponent;
