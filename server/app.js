const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes = require("./routes");
const errorHandler = require("./helpers/errorHandler")

if (process.env.NODE_ENV === "development") require("dotenv").config();
const port = process.env.PORT;
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(err => {
    console.log(`
        ---------- error begin ---------
    
        ${err}
        
        ----------- error end ----------
      `);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use("/", routes);

app.use(errorHandler);
app.listen(port, () => {
  console.log("listening on port", port);
});
