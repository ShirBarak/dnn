import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { createServerSideHelpers } from '@trpc/react-query/server';

import { AppRouter } from '../../../../trpc-sever/index'

const getBaseUrl = (): string => {
    if (typeof window !== 'undefined') return ''

    return process.env.CLIENT_URL as string
}
type a = AppRouter['coolRoute']
console.log(a.toString())


export const trpc = createTRPCNext<AppRouter>({
    config(opts) {
      const { ctx } = opts;
      if (typeof window !== 'undefined') {
        // during client requests
        return {
          links: [
            httpBatchLink({
              url: 'api/trpc',
            }),
          ],
        };
      }
      return {
        links: [
          httpBatchLink({
            // The server needs to know your app's full url
            url: `${getBaseUrl()}/api/trpc`,
            /**
             * Set custom request headers on every request from tRPC
             * @link https://trpc.io/docs/v10/header
             */
            headers() {
              if (!ctx?.req?.headers) {
                return {};
              }
              // To use SSR properly, you need to forward client headers to the server
              // This is so you can pass through things like cookies when we're server-side rendering
              return {
                cookie: ctx.req.headers.cookie,
              };
            },
          }),
        ],
      };
    },
    ssr: true,
  });