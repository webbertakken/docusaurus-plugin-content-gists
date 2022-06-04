// @ts-ignore
import React from "react";
import type { Language } from "prism-react-renderer";
import { slugify } from "../../core/utils/slugify";
import { isLanguageSupported } from "../../core/utils/supportedLanguages";
import type { Gist } from "../../types";
// Todo - Use custom CodeBlock from theme using another plugin
// @ts-ignore
import styles from "./styles.module.css";
// @ts-ignore
import CodeBlock from "@theme/CodeBlock";
// @ts-ignore
import Layout from "@theme/Layout";

interface Props {
  gist: Gist;
}

const mapGitHubLanguageToSupportedLanguage = (
  rawLanguage: string
): Language => {
  const language = slugify(rawLanguage);

  if (isLanguageSupported(language)) return language as Language;
  if (language.startsWith("git")) return "git";
  if (language.startsWith("shell")) return "bash";
  if (language.startsWith("powershell")) return "bash";

  return "bash";
};

const GistPage = ({ gist }: Props) => {
  const { created_at, updated_at, files } = gist;
  const createdDate = new Date(created_at!).toDateString();
  const updatedDate = new Date(updated_at!).toDateString();

  // Todo - remove exclamation marks
  return (
    <Layout wrapperClassName={styles.layout}>
      {Object.values(files!).map((file, index) => {
        const { language } = file!;

        return (
          <div key={file!.filename}>
            {index === 0 ? (
              <h1>{file!.filename}</h1>
            ) : (
              <h2>{file!.filename}</h2>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: "1em",
              }}
            >
              <sup>Created on {createdDate}</sup>
              <sup>Last updated on {updatedDate}</sup>
            </div>

            {/*<CodeEditor*/}
            {/*  code={file!.content}*/}
            {/*  language={mapGitHubLanguageToSupportedLanguage(language!)}*/}
            {/*/>*/}
            <CodeBlock
              language={mapGitHubLanguageToSupportedLanguage(language!)}
            >
              {file!.content}
            </CodeBlock>
            <div style={{ paddingBottom: "1em" }} />
          </div>
        );
      })}
    </Layout>
  );
};

export default GistPage;
