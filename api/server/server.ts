import * as restify from "restify";
import * as mongoose from "mongoose";

import { environment } from "../common/environment";
import { Router } from "../common/router";
import { logger } from "../common/logger";
import { mergePatchBodyParser } from "./merge-patch.parser";
import { handleError } from "./error.handler";
import { tokenParser } from "../security/token.parser";

export class Server {
  application: restify.Server;

  initializeDb() {
    (<any>mongoose).Promise = global.Promise;
    return mongoose.connect(environment.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  initRoutes(routers: Router[]): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const options: restify.ServerOptions = {
          name: "tmil-api",
          version: "1.0.0",
          log: logger,
        };

        this.application = restify.createServer(options);

        this.application.pre(
          restify.plugins.requestLogger({
            log: logger,
          })
        );

        this.application.use(restify.plugins.queryParser());
        this.application.use(restify.plugins.bodyParser());
        this.application.use(mergePatchBodyParser);
        this.application.use(tokenParser);

        //routes
        for (let router of routers) {
          router.applyRoutes(this.application);
        }

        this.application.listen(environment.server.port, () => {
          resolve(this.application);
        });

        this.application.on("restifyError", handleError);
      } catch (error) {
        reject(error);
      }
    });
  }

  bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initializeDb().then(() =>
      this.initRoutes(routers).then(() => this)
    );
  }

  shutdown() {
    return mongoose.disconnect().then(() => this.application.close());
  }
}
