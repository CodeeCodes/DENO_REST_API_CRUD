//Import application and router
import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
const port = 5000;

//Create new app object
const app = new Application();

//Allow app to use imported methods or not allow them
//As well as routes
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server is running on ${port}`);
//Await used in Global context, listening on port variable
await app.listen({ port });
