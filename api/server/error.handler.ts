import * as restify from "restify";
var errors = require("restify-errors");

export const handleError = (
  req: restify.Request,
  resp: restify.Response,
  err,
  done
) => {
  // console.log(err);
  if (!err.errors) {
    err.toJSON = function toJSON() {
      return {
        message: err.message,
      };
    };
  }

  switch (err.name) {
    case "ValidationError":
      err.statusCode = 400;
      break;
    case "MongoError":
      if (err.code === 11000) {
        err.statusCode = 400;
      }
      break;
  }

  done();
};
