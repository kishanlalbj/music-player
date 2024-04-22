const formatTime = (time) => {
  if (!time) return "00:00";
  let min, sec;
  min = Math.floor(time / 60);
  sec = Math.floor(time % 60);

  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

export default formatTime;
