/** Remaining frontend contract drafts. The application workflow lives in src/api/applications.ts. */
export interface PlannedFeedApi {
  list(page: number, pageSize: number): Promise<unknown>;
  create(content: string, title?: string): Promise<unknown>;
  comment(postId: number, content: string): Promise<unknown>;
}

export interface PlannedMessagingApi {
  listConversations(): Promise<unknown>;
  listMessages(conversationId: number): Promise<unknown>;
  sendMessage(conversationId: number, content: string, attachmentUrl?: string): Promise<unknown>;
}
