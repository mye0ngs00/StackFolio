-- \c velog

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE TABLE verification (
--     id uuid primary key uuid_generate_v4(),
--     created_at timestamp with time zone default now() not null,
--     code varchar(255) not null,
--     user_id uuid references user(id)
-- );

-- CREATE TYPE provider AS ENUM ('local', 'google', 'github', 'facebook');

-- CREATE TABLE "user" (
--     id uuid DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
--     created_at timestamp with time zone DEFAULT now() NOT NULL,
--     updated_at timestamp with time zone DEFAULT now() NOT NULL,
--     "provider" provider DEFAULT 'local' NOT NULL,
--     social_id varchar(255),
--     email varchar(255) UNIQUE NOT NULL,
--     is_verified boolean DEFAULT false NOT NULL,
--     CHECK(COALESCE((provider = 'local')::integer, 0) + COALESCE(LENGTH(social_id::text)::boolean::integer, 0) = 1)
-- );

-- CREATE TABLE profile (
--     id uuid DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
--     created_at timestamp with time zone DEFAULT now() NOT NULL,
--     updated_at timestamp with time zone DEFAULT now() NOT NULL,
--     username varchar(255) UNIQUE NOT NULL,
--     bio varchar(255),
--     avatar varchar(255),
--     social_links jsonb DEFAULT '{}'::jsonb NOT NULL,
--     user_id uuid NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
-- );

-- CREATE TABLE post (
--     id uuid DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
--     created_at timestamp with time zone DEFAULT now() NOT NULL,
--     updated_at timestamp with time zone DEFAULT now() NOT NULL,
--     released_at timestamp with time zone DEFAULT now() NOT NULL,
--     published boolean DEFAULT false NOT NULL,
--     is_private boolean DEFAULT false NOT NULL,
--     title varchar(255) NOT NULL,
--     body text NOT NULL,
--     description varchar(255),
--     thumbnail varchar(255),
--     slug varchar(255),
--     user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- @TODO: how should we design comments?

-- CREATE TABLE comment (
--     id uuid DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
--     created_at timestamp with time zone DEFAULT now() NOT NULL,
--     updated_at timestamp with time zone DEFAULT now() NOT NULL,
--     contents text NOT NULL,
--     user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE
-- );

-- CREATE TABLE "like" (
--     id uuid DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
--     created_at timestamp with time zone DEFAULT now() NOT NULL,
--     user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
--     comment_id uuid REFERENCES comments(id) ON DELETE CASCADE,
--     CHECK(
-- 		COALESCE(LENGTH(post_id::text)::boolean::integer, 0)
-- 		+
-- 		COALESCE(LENGTH(comment_id::text)::boolean::integer, 0)
-- 		= 1
-- 	),
-- 	UNIQUE(user_id, post_id),
--     UNIQUE(user_id, comment_id)
-- );

-- CREATE TABLE follow (
--     id uuid DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
-- 	created_at timestamp with time zone DEFAULT now() NOT NULL,
-- 	user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
-- 	follower_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
-- 	UNIQUE(user_id, follower_id)
-- );
