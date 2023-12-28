const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./users/user.route");

app.use(express.json());
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
