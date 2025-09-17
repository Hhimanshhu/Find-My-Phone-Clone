"use client";
import { useEffect, useState } from "react";
import styles from "./Toast.module.css"; // ✅ correct import

export default function Toast({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for fade out
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return <div className={styles.toast}>{message}</div>;
}
