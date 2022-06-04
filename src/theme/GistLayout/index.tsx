import React, { ReactNode } from 'react'
// @ts-ignore
import Layout from '@theme/Layout'
// @ts-ignore
import styles from './styles.module.css'

interface Props {
  children: ReactNode
}

function Index({ children }: Props): JSX.Element {
  return (
    <Layout wrapperClassName={styles.layout}>
      <div className={styles.container}>{children}</div>
    </Layout>
  )
}

export default Index
