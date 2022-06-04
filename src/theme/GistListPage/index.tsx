// @ts-ignore
import React from "react";
import type { Gists } from "../../types";
// @ts-ignore
import Layout from "@theme/Layout";
// @ts-ignore
import styles from "./styles.module.css";

interface Props {
  gists: Gists;
}

const GistListPage = ({ gists }: Props) => (
  <Layout wrapperClassName={styles.layout}>
    {(gists.length >= 1 && (
      <ul className={styles.list}>
        {gists.map(({ id, created_at, updated_at, description, files }) => {
          const title = Object.values(files)[0]!.filename;
          const createdDate = new Date(created_at).toDateString();
          const updatedDate = new Date(updated_at).toDateString();

          return (
            <a key={id} href={`/gists/${id}`}>
              <li className={styles.item}>
                {/* Todo convert to classes after introducing tailwind */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: ".75em 0",
                    opacity: 0.75,
                  }}
                >
                  <sup>Created on {createdDate}</sup>
                  <sup>Last updated on {updatedDate}</sup>
                </div>
                <h1>{title}</h1>
                <summary>{description}</summary>
              </li>
            </a>
          );
        })}
      </ul>
    )) || <div className={styles.empty}>No gists exist yet</div>}
  </Layout>
);

export default GistListPage;
