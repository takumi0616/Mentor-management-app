import React from 'react';
import styles from 'components/header/Header.module.css'; // CSSモジュールをインポートする場合

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>
            Mentor-management-app
        </h1>
      </div>
    </header>
  );
};

export default Header;
