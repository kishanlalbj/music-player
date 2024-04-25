import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../api";

export const playlistApi = createApi({
  reducerPath: "playlists",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/playlists`,
  }),
  endpoints: (builder) => ({
    getAllPlaylists: builder.query({
      query: () => "/all"
    }),
    getPlaylistById: builder.query({
      query: (id) => `/${id}`
    })
  })
});

export const { useGetAllPlaylistsQuery, useGetPlaylistByIdQuery } = playlistApi;