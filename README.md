# Developer Log

[![CircleCI](https://circleci.com/gh/samwarnick/developer-log/tree/master.svg?style=svg)](https://circleci.com/gh/samwarnick/developer-log/tree/master)

This is a site for me to play around more with Vue, Tailwind CSS, GraphQL, and other technologies I will find along the way.

---

## `// TODO: Add stuff and make it work`

- [x] Create new long entries
- [x] Delete log entries
- [x] Use markdown in log entries
- [x] Group log entries by day
- [x] User authentication and whatnot
- [ ] Edit log entries
- [x] Deploy somewhere so I don't have to run it locally
- [ ] Export log as a markdown file
- [ ] Think of more ideas

---

## Project setup

```
yarn install
```

### Database Tables

May need to run

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

to add `uuid_generate_v4()`.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  github_id TEXT NOT NULL,
  display_name TEXT NOT NULL,
  profile_image TEXT NOT NULL
);

CREATE TABLE log_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT log_entries_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES users (id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE CASCADE
);
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Run your end-to-end tests

```
yarn run test:e2e
```

### Run your unit tests

```
yarn run test:unit
```
