import { AddLanguageRequest, Language, LanguageCountResponse } from '../../dtos/Language'
import apiSlice from './ApiSliceAuth'

const apiSliceLanguages = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createLanguage: builder.mutation<undefined, AddLanguageRequest>({
            query: (request) => ({
                url: `https://localhost:44398/languages`,
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['LANGUAGE']
        }),
        deleteLanguage: builder.mutation<undefined, number>({
            query: (id) => ({
                url: `https://localhost:44398/languages/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['LANGUAGE']
        }),
        getLanguageList: builder.query<Language[], { skip: number; take: number }>({
            query: ({ skip, take }) => ({
                url: `https://localhost:44398/languages?skip=${skip}&take=${take}`,
                method: 'GET'
            }),
            providesTags: ['LANGUAGE']
        }),
        getLanguageCount: builder.query<LanguageCountResponse, undefined>({
            query: () => ({
                url: 'https://localhost:44398/languages/count',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }),
        getLanguagesSuggestions: builder.query<Language[], string>({
            query: (name) => ({
                url:
                    name === ''
                        ? `https://localhost:44398/languages/suggestions?name=`
                        : `https://localhost:44398/languages/suggestions?name=${encodeURIComponent(
                              name
                          )}`,
                method: 'GET'
            }),
            providesTags: ['LANGUAGE']
        })
    })
})

export default apiSliceLanguages

export const {
    useCreateLanguageMutation,
    useDeleteLanguageMutation,
    useGetLanguageListQuery,
    useGetLanguageCountQuery,
    useGetLanguagesSuggestionsQuery
} = apiSliceLanguages
