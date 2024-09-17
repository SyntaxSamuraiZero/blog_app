import React from 'react'
import { Alert } from 'antd'

import styles from './Error.module.scss'

export default function Error({ error }) {
  return (
    <div className={styles.loadingContainer}>
      <Alert message='Error' description={error} type='error' showIcon />
    </div>
  )
}
