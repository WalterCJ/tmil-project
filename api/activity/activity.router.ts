import { ModelRouter } from "../common/model_router";
import * as restify from "restify";
import { Activity } from "./activity.model";

class ActivityRouter extends ModelRouter<Activity> {
  constructor() {
    super(Activity);
  }

  applyRoutes(application: restify.Server) {
    application.get("/activity", this.findAll);
    application.get("/activity/:id", [this.validateId, this.findById]);
    application.post("/activity", this.save);
    application.put("/activity/:id", [this.validateId, this.replace]);
    application.patch("/activity/:id", [this.validateId, this.update]);
    application.del("/activity/:id", [this.validateId, this.delete]);
  }
}

export const activityRouter = new ActivityRouter();
