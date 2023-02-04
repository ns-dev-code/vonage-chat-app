import { vonageApi as api } from './vonageApi';
export const addTagTypes = ['Users'] as const;

const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getUsers: build.query<GetUsersApiResponse, GetUsersApiResponseArg>({
        query: (queryArg) => ({
          url: `/getUsers`,
          params: queryArg,
        }),
        providesTags: ['Users'],
      }),
      getUserById: build.query<GetUserByIdApiResponse, GetUserByIdArg>({
        query: (queryArg) => ({ url: `/users/${queryArg.userId}` }),
        providesTags: ['Users'],
      }),
      createUser: build.mutation<UserApiDto, CreateUserApiArg>({
        query: (queryArg) => ({
          url: `/createUser`,
          method: 'POST',
          body: queryArg.body,
        }),
        invalidatesTags: ['Users'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };

export type GetUsersApiResponse = {
  users: UserApiDto[];
};
export type GetUsersApiResponseArg = {
  page_size?: number;
  order?: 'asc' | 'desc';
};

export type GetUserByIdApiResponse = /** status 200 When a valid member is found */ UserApiDto;
export type GetUserByIdArg = {
  userId: string;
};

type CreateUserApiArg = {
  body: {
    name: string;
    display_name: string;
  };
};
export type UserApiDto = { id: string; name: string };

export const { useGetUsersQuery, useLazyGetUserByIdQuery, useCreateUserMutation } = injectedRtkApi;
