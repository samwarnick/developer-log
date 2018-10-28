import { db } from "./utils/db";
import jwt from "jsonwebtoken";

// Context passed to all resolvers (third argument)
// req => Query
// connection => Subscription
// eslint-disable-next-line no-unused-vars
export default async ({ req, connection }) => {
  let token;
  // HTTP
  if (req) token = req.get("Authorization");
  // WS
  if (connection) token = connection.authorization;

  let user = {};
  if (token) {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const result = await db.query("SELECT * FROM users WHERE id = $1;", [
      data.id
    ]);
    user = result.rows[0];
  }

  return {
    db,
    user
  };
};
