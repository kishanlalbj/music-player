import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/axios";

export const playlistApi = createApi({
  reducerPath: "playlists",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/playlists`,
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('musico_token')}`)
    } 
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