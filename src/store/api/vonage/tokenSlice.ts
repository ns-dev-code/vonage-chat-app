import { vonageApi as api } from './vonageApi';
export const addTagTypes = ['Token'] as const;

const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      generateToken: build.mutation<TokenApiDto, GetTokenByUserArg>({
        query: (queryArg) => {
          return {
            url: `/getJWT`,
            method: 'POST',
            body: { name: queryArg.name },
          };
        },
        invalidatesTags: ['Token'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };

type GetTokenByUserArg = {
  name: string;
};
export type TokenApiDto = { jwt: string };

export const { useGenerateTokenMutation } = injectedRtkApi;
