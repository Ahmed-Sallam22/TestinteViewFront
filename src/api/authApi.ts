import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://test-interview-back.vercel.app/';

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('Accept-Language', 'ar');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        Adminlogin: builder.mutation<any, any>({
            query: (formData) => ({
                url: `auth/login`,
                method: 'POST',
                body: formData,
            }),
            transformResponse: (response, meta) => {
                console.log(meta?.response?.status);
                return response;
            },
            transformErrorResponse: (response, meta) => {
                return response;
            },
        }),


        logout: builder.mutation<void, void>({
            query: () => {
                const accessToken = JSON.parse(localStorage.getItem('TestInterView') || '');
                return {
                    url: 'auth/logout',
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                };
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Clean up client-side state or tokens
                    localStorage.removeItem('TestInterView');
                } catch (error) {
                    console.error('Logout failed:', error);
                }
            },
        }),
    }),
});

// Export the generated hooks and the API slice
export const { 
    useAdminloginMutation,
    useLogoutMutation 
} = authApi;
export default authApi;
