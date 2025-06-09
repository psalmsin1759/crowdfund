export default abstract class EmailProviderInterface {
  abstract send(to: string, subject: string, body: string): Promise<void>;
}
