import * as PostalMime from 'postal-mime';

export default {
  async email(message, env, ctx) {
    const parser = new PostalMime.default();
    const rawEmail = new Response(message.raw);
    const email = await parser.parse(await rawEmail.arrayBuffer());
    console.log(email);

    let data = {
      from: email.from,
      to: email.to,
      subject: email.subject,
      html: email.html,
      text: email.text
    }

    await fetch('https://http-client.cowface.dev/testroute/inbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
};
