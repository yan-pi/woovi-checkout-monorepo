export interface IWebSocketService {
  handleConnection(slug: string): Promise<void>;
}
