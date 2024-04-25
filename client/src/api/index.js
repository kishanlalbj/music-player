export const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/api`;

export const fetchSongsApi = async () => {
  const res = await fetch(`${BASE_URL}/songs`);
  const data = await res.json();

  return data;
};

export const uploadSongApi = async ({ file, onSuccess }) => {
  try {
    const formData = new FormData();

    console.log("API", file);
    console.log("NAME", file.name);

    formData.append("name", file.name);
    formData.append("file", file, file.name);

    const res = await fetch(`${BASE_URL}/songs`, {
      method: "POST",
      body: formData
    });

    await res.json();

    onSuccess("ok");
  } catch (error) {
    console.log(error);
  }
};
