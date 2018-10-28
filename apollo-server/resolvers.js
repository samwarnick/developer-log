import GraphQLJSON from "graphql-type-json";
import { ForbiddenError } from "apollo-server";
import moment from "moment";
import _ from "lodash";

export default {
  JSON: GraphQLJSON,

  Query: {
    logEntries: async (root, args, { user, db }) => {
      if (!user) {
        throw new ForbiddenError("You must be logged in.");
      }
      const result = await db.query(
        "SELECT * FROM log_entries WHERE user_id = $1",
        [user.id]
      );

      const groupedEntries = _(result.rows)
        .sortBy(entry => new moment(entry.created))
        .reverse()
        .groupBy(entry => new moment(entry.created).format("D MMM YYYY"))
        .value();

      const dates = _.keys(groupedEntries);

      const groups = dates.map(date => {
        return {
          day: date,
          logEntries: groupedEntries[date]
        };
      });

      return _(groups)
        .sortBy(group => new moment(group.day))
        .reverse()
        .value();
    }
  },

  Mutation: {
    addLogEntry: async (root, { input }, { user, db }) => {
      if (!user) {
        throw new ForbiddenError("You must be logged in.");
      }

      const result = await db.query(
        "INSERT INTO log_entries(user_id, content) VALUES($1, $2) RETURNING *",
        [user.id, input.content]
      );

      return result.rows[0];
    },
    deleteLogEntry: async (root, { input }, { user, db }) => {
      if (!user) {
        throw new ForbiddenError("You must be logged in.");
      }
      await db.query("DELETE FROM log_entries WHERE id = $1 AND user_id = $2", [
        input.id,
        user.id
      ]);

      return true;
    }
  }
};
