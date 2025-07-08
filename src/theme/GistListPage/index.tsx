// @ts-ignore
import React from 'react'
import type { Gists } from '../../types'
// @ts-ignore
import GistLayout from '@theme/GistLayout'
// @ts-ignore
import styles from './styles.module.css'

interface Props {
  gists: Gists
}

// Sanitize user-generated content to prevent XSS
const sanitizeText = (text: string | null | undefined): string => {
  if (!text) return ''
  // Basic HTML entity encoding for safety
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const GistListPage = ({ gists }: Props) => (
  <GistLayout>
    {(gists.length >= 1 && (
      <ul className={styles.list}>
        <h1>Gists</h1>
        {gists.map(({ id, created_at, updated_at, description, files }) => {
          const file = Object.values(files)[0]
          const title = file ? sanitizeText(file.filename) : 'Untitled'
          const createdDate = new Date(created_at).toDateString()
          const updatedDate = new Date(updated_at).toDateString()

          return (
            <div key={id}>
              <li className={styles.item}>
                <div className={styles.dates}>
                  <sup>Created on {createdDate}</sup>
                  <sup>Last updated on {updatedDate}</sup>
                </div>
                <a className={styles.title} href={`/gists/${id}`}>
                  <h1>{title}</h1>
                </a>
                <summary className={styles.description}>{sanitizeText(description)}</summary>
              </li>
            </div>
          )
        })}
      </ul>
    )) || <div className={styles.empty}>No gists exist yet</div>}
  </GistLayout>
)

export default GistListPage
