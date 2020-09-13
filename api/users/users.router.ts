import { ModelRouter } from "../common/model_router";
import * as restify from "restify";
import { User } from "./users.model";
import { authenticate } from "../security/auth.handler";
import { authorize } from "../security/authz.handler";

class UsersRouter extends ModelRouter<User> {
  constructor() {
    super(User);
    this.on("beforeRender", (document) => {
      document.password = undefined;
      //delete document.password
    });
  }

  applyRoutes(application: restify.Server) {
    application.get(this.basePath, [authorize("admin"), this.findAll]);
    application.get(`${this.basePath}/:id`, [
      authorize("admin", "user"),
      this.validateId,
      this.findById,
    ]);
    application.post(this.basePath, this.save);
    application.put(`${this.basePath}/:id`, [
      authorize("admin", "user"),
      this.validateId,
      this.replace,
    ]);
    application.patch(`${this.basePath}/:id`, [
      authorize("admin", "user"),
      this.validateId,
      this.update,
    ]);
    application.del(`${this.basePath}/:id`, [
      authorize("admin", "user"),
      this.validateId,
      this.delete,
    ]);

    application.post(`${this.basePath}/authenticate`, authenticate);
  }
}

export const usersRouter = new UsersRouter();
