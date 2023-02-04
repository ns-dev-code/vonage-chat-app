import { vonageApi as api } from './vonageApi';
export const addTagTypes = ['Conversations'] as const;

const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getConversations: build.query<GetConversationsApiResponse, GetConversationsApiResponseArg>({
        query: (queryArg) => ({
          url: `/getConversations`,
          params: queryArg,
        }),
        providesTags: ['Conversations'],
      }),
      getConversationById: build.query<GetConversationByIdApiResponse, GetConversationByIdArg>({
        query: (queryArg) => ({ url: `/conversations/${queryArg.coversationId}` }),
        providesTags: ['Conversations'],
      }),
      createConversation: build.mutation<ConversationApiDto, CreateConversationApiArg>({
        query: (queryArg) => ({
          url: `/createConversation`,
          method: 'POST',
          body: queryArg,
        }),
        invalidatesTags: ['Conversations'],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as enhancedApi };

export type GetConversationsApiResponse = {
  conversations: ConversationApiDto[];
};

export type GetConversationsApiResponseArg = {
  page_size?: number;
  order?: 'asc' | 'desc';
};

export type GetConversationByIdApiResponse = /** status 200 When a valid member is found */ ConversationApiDto;
export type GetConversationByIdArg = {
  coversationId: string;
};

type CreateConversationApiArg = {
  name: string;
  display_name: string;
};
export type ConversationApiDto = { id: string; name: string };

export const { useGetConversationsQuery, useGetConversationByIdQuery, useCreateConversationMutation } = injectedRtkApi;
