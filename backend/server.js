import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(5001, () => {
  console.log("Server listening on port: 5001");
});
