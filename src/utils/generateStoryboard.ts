interface PreviewFrame {
  urls: string[];
  frameWidth: number;
  frameHeight: number;
  totalCount: number;
  durationPerFrame: number;
  framesPerPageX: number;
  framesPerPageY: number;
}

export const generateStoryboard = (previewFrames: PreviewFrame | undefined) => {
  if (!previewFrames) return "";
  let output = "WEBVTT\n\n";
  let currentTime = 0;

  for (let url of previewFrames.urls) {
    for (let y = 0; y < previewFrames.framesPerPageY; y++) {
      for (let x = 0; x < previewFrames.framesPerPageX; x++) {
        if (
          currentTime >=
          previewFrames.totalCount * previewFrames.durationPerFrame
        ) {
          break;
        }

        let startX = x * previewFrames.frameWidth;
        let startY = y * previewFrames.frameHeight;

        output += `${formatTime(currentTime)} --> ${formatTime(
          currentTime + previewFrames.durationPerFrame
        )}\n`;
        output += `${url}#xywh=${startX},${startY},${previewFrames.frameWidth},${previewFrames.frameHeight}\n\n`;

        currentTime += previewFrames.durationPerFrame;
      }
    }
  }

  function formatTime(ms: number) {
    let hours = Math.floor(ms / 3600000);
    ms -= hours * 3600000;
    let minutes = Math.floor(ms / 60000);
    ms -= minutes * 60000;
    let seconds = Math.floor(ms / 1000);
    ms -= seconds * 1000;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms
      .toString()
      .padStart(3, "0")}`;
  }

  const blob = new Blob([output], { type: "text/vtt" });
  return URL.createObjectURL(blob);
};
