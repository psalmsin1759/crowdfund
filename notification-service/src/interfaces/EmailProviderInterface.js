class EmailProviderInterface {
  async send(to, subject, body) {
    throw new Error('send() must be implemented by the provider');
  }
}

module.exports = EmailProviderInterface;
