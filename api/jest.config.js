module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  globals: {
    address: "http://localhost:3001",
    auth:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.nhaKGwT5uBF1h4u60lDq9rSYiY25ie3xrftWlwnoWis",
  },
};
