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
    application.get("/users", this.findAll);
    application.get("/users/:id", [
      authorize("admin"),
      this.validateId,
      this.findById,
    ]);
    application.post("/users", this.save);
    application.put("/users/:id", [this.validateId, this.replace]);
    application.patch("/users/:id", [this.validateId, this.update]);
    application.del("/users/:id", [this.validateId, this.delete]);

    application.post(`/users/authenticate`, authenticate);
  }
}

export const usersRouter = new UsersRouter();
