# Tweetclip
Take screenshots of tweets for easy pasting them somewhere else. 
Chrome extension is included for easy use, just load the extension, right click on any twitter link "summon twittclip" and after a few second the image will show up on the extension popup. Make sure to point the extension to whetever you deploy the endpoint.

When using the extension make sure to set the proper permissions on "hosts_permissions" or it will give you cors errors.


#NOTE
If you have a free vercel account the endpoint wont run there.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
`
Once running, load the extension on Chome, by going to "manage extension" -> "Load Unpacked".
`
On the extension folder the background.js is pointing to localhost:3000 to get the sreenshots if you launch the next app on a different port make sure yo change that in the background.js.

Enjoy.
