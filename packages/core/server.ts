import express, { Request, Express, Response } from "express";
import { readdirSync } from "fs";
import path from "path";

const PORT = process.env.PORT ?? 3000;

type HttpMethods = "get" | "post" | "delete" | "put" | "patch" | "all";

const isHttpMethod = (value: string): value is HttpMethods => {
  return ["get", "post", "delete", "put", "patch", "all"].includes(value);
};

interface RegisterRouteParams {
  route: string;
  method: HttpMethods;
  handler: Handler;
}

export const registerRoute = (app: Express, options: RegisterRouteParams) => {
  // TODO add slash if there is none
  app[options.method](`/${options.route}`, options.handler);

  console.log(
    `Registered ${options.method.toUpperCase()} for ${options.route}`
  );
};

export const server = () => {
  const app = express();

  console.log(process.cwd());

  const routesFolderPath = path.join(process.cwd(), "/src/routes");

  const routesFiles = readdirSync(routesFolderPath);

  Promise.all(
    routesFiles.map(async (rf) => {
      const routeHandlerPath = path.join(routesFolderPath, rf);
      const endpoint = await import(routeHandlerPath);

      // try get, post, put, delete, patch or all

      return {
        route: path.parse(rf).name,
        method: "get",
        handler: endpoint.get,
      };
    })
  ).then((results) => {
    console.log(results);
    results.forEach((r) => {
      const { route, method, handler } = r;

      if (isHttpMethod(method)) {
        registerRoute(app, {
          route,
          method,
          handler,
        });
      } else {
        throw Error("Nasty error you got here");
      }
    });

    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
  });
};

export type Handler = (request: Request, response: Response) => void;
