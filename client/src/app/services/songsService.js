import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../api";

export const songsApi = createApi({
  reducerPath: "songs",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/songs` }),
  endpoints: (builder) => ({
    getAllSongs: builder.query({
      query: () => "/"
    }),
    getSongById: builder.query({
      query: (id) => `/${id}`
    })
  })
});

export const { useGetAllSongsQuery, useGetSongByIdQuery } = songsApi;
