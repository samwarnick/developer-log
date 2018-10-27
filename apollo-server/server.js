import path from "path";
import express from "express";
import passport from "passport";
import GitHubStrategy from "passport-github";
import { db } from "./utils/db";
import shortid from "shortid";
import jwt from "jsonwebtoken";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log({ id });
  const user = db
    .get("users")
    .find({ id })
    .last()
    .write();
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/return"
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await db
        .get("users")
        .find({ github_id: profile.id })
        .value();
      if (user) {
        done(null, user);
      } else {
        const user = {
          id: shortid.generate(),
          github_id: profile.id,
          display_name: profile.displayName,
          profile_image: profile._json.avatar_url
        };
        db.get("users")
          .push(user)
          .last()
          .write();
        done(null, user);
      }
    }
  )
);

export default app => {
  app.use("/files", express.static(path.resolve(__dirname, "../live/uploads")));
  app.use(passport.initialize());

  app.get("/auth/github", passport.authenticate("github"));

  app.get(
    "/auth/github/return",
    passport.authenticate("github", {
      failureRedirect: "http://localhost:8080/fail"
    }),
    (req, res) => {
      const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      res.cookie("apollo-token", token);
      res.redirect("http://localhost:8080");
    }
  );
};
