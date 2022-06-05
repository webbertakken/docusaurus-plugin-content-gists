// @ts-ignore
import React from 'react'
import type { Gist } from '../../types'
// Todo - Use custom CodeBlock from theme using another plugin
// @ts-ignore
import styles from './styles.module.css'
// @ts-ignore
import CodeBlock from '@theme/CodeBlock'
// @ts-ignore
import GistLayout from '@theme/GistLayout'
import { mapGitHubLanguageToPrismLanguage } from '../../core/utils/mapGitHubLanguageToPrismLanguage'

interface Props {
  gist: Gist
}

const GistPage = ({ gist }: Props) => {
  const { created_at, updated_at, files } = gist
  const createdDate = new Date(created_at!).toDateString()
  const updatedDate = new Date(updated_at!).toDateString()

  // Todo - remove exclamation marks
  return (
    <GistLayout>
      {Object.values(files!).map((file, index) => {
        const language = mapGitHubLanguageToPrismLanguage(file!.language!)

        return (
          <div key={file!.filename} className={styles.file}>
            {index === 0 ? (
              <h1 className={styles.title}>{file!.filename}</h1>
            ) : (
              <h2 className={styles.title}>{file!.filename}</h2>
            )}

            <div className={styles.dates}>
              <sup>Created on {createdDate}</sup>
              <sup>Last updated on {updatedDate}</sup>
            </div>

            {/*<CodeEditor code={file!.content} language={language} />*/}
            <CodeBlock language={language}>{file!.content}</CodeBlock>
          </div>
        )
      })}
    </GistLayout>
  )
}

export default GistPage
