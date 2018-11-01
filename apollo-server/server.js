import path from "path";
import passport from "passport";
import GitHubStrategy from "passport-github";
import { db } from "./utils/db";
import jwt from "jsonwebtoken";
import history from "connect-history-api-fallback";
import serveStatic from "serve-static";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const result = await db.query("SELECT * FROM users WHERE id = $1;", [id]);
  if (result.rows.length === 1) {
    done(null, result.rows[0]);
  } else {
    done("Couldn't find user");
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/return"
    },
    async (accessToken, refreshToken, profile, done) => {
      const result = await db.query(
        "SELECT * FROM users WHERE github_id = $1;",
        [profile.id]
      );
      let user;
      if (result.rows.length === 1) {
        user = result.rows[0];
      } else {
        const result = await db.query(
          "INSERT INTO users(github_id, display_name, profile_image) VALUES($1, $2, $3) RETURNING *;",
          [profile.id, profile.displayName, profile._json.avatar_url]
        );
        user = result.rows[0];
      }
      done(null, user);
    }
  )
);

export default app => {
  app.use(passport.initialize());

  app.get("/auth/github", passport.authenticate("github"));

  app.get(
    "/auth/github/return",
    passport.authenticate("github", {
      failureRedirect:
        process.env.NODE_ENV === "production"
          ? "/login?failed"
          : "http://localhost:8080/login?failed"
    }),
    (req, res) => {
      const token = jwt.sign({ ...req.user }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      res.cookie("apollo-token", token);
      res.redirect(
        process.env.NODE_ENV === "production"
          ? "/login"
          : "http://localhost:8080/login"
      );
    }
  );

  app.use(history());

  app.use(serveStatic(path.resolve(__dirname, "../dist")));
};
