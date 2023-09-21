import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { publicProcedure, router } from './trpc';

 
const appRouter = router({
    coolRoute: publicProcedure.query(() => 'this query is cool!')
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter
})

server.listen(8080)