import "jest";
import * as request from "supertest";

let address: string = (<any>global).address;

test("get /users", () => {
  return request(address)
    .get("/users")
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    })
    .catch(fail);
});
test("get /users/123 - not found", () => {
  return request(address)
    .get("/users/123")
    .then((response) => {
      expect(response.status).toBe(404);
    })
    .catch(fail);
});

test("post /users", () => {
  return request(address)
    .post("/users")
    .send({
      name: "user1",
      email: "user1@email.com",
      password: "secret-pass-123",
    })
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body._id).toBeDefined();
      expect(response.body.name).toBe("user1");
      expect(response.body.email).toBe("user1@email.com");
      expect(response.body.password).toBeUndefined();
    })
    .catch(fail);
});
test("post /users - name is required", () => {
  return request(address)
    .post("/users")
    .send({
      email: "user_test@gmail.com",
      password: "123456",
    })
    .then((response) => {
      expect(response.status).toBe(400);
      expect(response.body._message).toBe("User validation failed");
    })
    .catch(fail);
});

test("post /users - email duplicado", () => {
  return request(address)
    .post("/users")
    .send({
      name: "dupe",
      email: "dupe@gmail.com",
      password: "123pass",
    })
    .then((response) =>
      request(address).post("/users").send({
        name: "dupe",
        email: "dupe@gmail.com",
        password: "123pass",
      })
    )
    .then((response) => {
      console.log(response.body);
      expect(response.status).toBe(400);
      expect(response.body.message).toContain("E11000 duplicate key");
    })
    .catch(fail);
});
test("delete /users/:id", () => {
  return request(address)
    .post("/users")
    .send({
      name: "usuario 3",
      email: "user3@gmail.com",
      password: "secret123",
    })
    .then((response) => request(address).delete(`/users/${response.body._id}`))
    .then((response) => {
      expect(response.status).toBe(204);
    })
    .catch(fail);
});
test("delete /users/123 - not found", () => {
  return request(address)
    .delete(`/users/123`)
    .then((response) => {
      expect(response.status).toBe(404);
    })
    .catch(fail);
});

test("put /users/aaaaa - not found", () => {
  return request(address)
    .put(`/users/123`)
    .then((response) => {
      expect(response.status).toBe(404);
    })
    .catch(fail);
});
test("put /users:/id", () => {
  return request(address)
    .post("/users")
    .send({
      name: "usuario 4",
      email: "user4@gmail.com",
      password: "123456",
    })
    .then((response) =>
      request(address).put(`/users/${response.body._id}`).send({
        name: "usuario 5",
        email: "user5@gmail.com",
        password: "1234567890",
      })
    )
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.name).toBe("usuario 5");
      expect(response.body.email).toBe("user5@gmail.com");
      expect(response.body.gender).toBeUndefined();
      expect(response.body.password).toBeUndefined();
    })
    .catch(fail);
});
