import type { GetStaticPaths, GetStaticProps, NextPage, NextPageContext } from "next";
import { APIResponseError, Client, LogLevel } from "@notionhq/client";
import Head from "next/head";
import assert from "assert";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";
import { renderRichPlainText } from "../lib/notion";
import GithubSlugger from "github-slugger";
import Layout from "../components/Layout";

const slugger = new GithubSlugger();
const makeSlug = (s: string) => {
  return slugger.slug(s);
};

export const getStaticProps = (context: NextPageContext) => {
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  assert(NOTION_TOKEN, "Must provide notion access token");
  const client = new Client({
    auth: NOTION_TOKEN,
    logLevel: process.env.NODE_ENV === "development" ? LogLevel.DEBUG : LogLevel.INFO,
  });
  const dbParams: QueryDatabaseParameters = {
    database_id: "31bc07fbe2704be095c3c34755011b5e",
    filter: {
      or: [
        {
          property: "status",
          select: {
            equals: "staged",
          },
        },
        {
          property: "status",
          select: {
            equals: "published",
          },
        },
      ],
    },
    sorts: [
      {
        property: "db_created",
        direction: "descending",
      },
    ],
  };

  return client.databases.query(dbParams).then((res) => {
    return {
      props: {
        posts: res.results.map((x) => {
          // @ts-ignore
          const title = renderRichPlainText(x.properties.title.title);
          const slug = makeSlug(title);
          return {
            id: x.id,
            title,
            slug,
            created_time: x.created_time,
            cover: x.cover,
            icon: x.icon,
            properties: x.properties,
          };
        }),
      },
    };
  });
};

type Await<T> = T extends PromiseLike<infer U> ? U : T;

const NotionPostListItem = ({ post }) => {
  return (
    <div>
      <a href={`/${post.slug}`}>{post.title}</a>
    </div>
  );
};

const Home: NextPage<Await<ReturnType<typeof getStaticProps>>["props"]> = (props) => {
  console.log(props);
  return (
    <Layout>
      <div className="list">
        {props.posts.map((x) => (
          <NotionPostListItem key={x.id} post={x} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
