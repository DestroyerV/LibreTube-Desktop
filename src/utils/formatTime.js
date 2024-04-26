export default function formateTime(s) {
  let hour = Math.floor(s / 3600);
  s -= hour * 3600;
  let minute = Math.floor(s / 60);
  s -= minute * 60;

  let timestamp = "";
  if (hour > 0) {
    timestamp += hour.toString().padStart(2, "0") + ":";
  }
  timestamp +=
    minute.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");

  return timestamp;
}
