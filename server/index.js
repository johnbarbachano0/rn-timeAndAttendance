require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const middlewares = require("./middlewares/errorHandlers");
const db = require("./models");
const passport = require("passport");
const http = require("http");

//Initialize server
const server = http.createServer(app);

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Morgan Helmet Cors
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Initialize session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 12, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

require("./middlewares/strategy");

app.use(passport.initialize());
app.use(passport.session());

// Routers;
const UsersRouter = require("./routes/Users");
app.use("/auth", UsersRouter);
const TimeLogsRouter = require("./routes/TimeLogs");
app.use("/timelog", TimeLogsRouter);
const ChangeRequestRouter = require("./routes/ChangeRequests");
app.use("/changereq", ChangeRequestRouter);
const MaintenanceRouter = require("./routes/Maintenance");
app.use("/maintenance", MaintenanceRouter);
const GeocoderRouter = require("./routes/Geocoder");
app.use("/geocoder", GeocoderRouter);
const HistoryRouter = require("./routes/AuditTrail");
app.use("/history", HistoryRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

//mySQL connection
db.sequelize.sync().then(() => {
  const port = process.env.PORT || 5007;
  server.listen(port, () => {
    console.log(`Listening at port http://localhost:${port}`);
  });
});
