import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loadingOverlay}>
      <Spin
        className={styles.loadingContainer}
        indicator={<LoadingOutlined spin />}
        size="large"
      />
    </div>
  );
}
