import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemanApi = createApi({
  reducerPath: 'pokemanApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  tagTypes: ['Pokeman'],
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: name => `pokemon/${name}`,
      providesTags: (result, error, arg) => result ? ({ type: 'Pokeman', id: arg.name }) : ['Pokeman'],
    }),
    updatePokemonByName: builder.mutation({
      query: name => ({
        url: 'pokemon',
        name,
      }),
      invalidatesTags:  (result, error, arg) => result ? ({ type: 'Pokeman', id: arg.name }) : ['Pokeman'],
    }),
  }),
});

export const { useGetPokemonByNameQuery, useUpdatePokemonByNameMutation } = pokemanApi;
