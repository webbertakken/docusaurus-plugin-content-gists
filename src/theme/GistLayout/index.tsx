import React, { ReactNode } from 'react'
import '../../types'
import Layout from '@theme/Layout'
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
