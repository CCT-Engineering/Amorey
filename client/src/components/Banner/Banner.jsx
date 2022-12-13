import React from 'react';
import { buildHandleEnterKeyPress } from '../../util';
import global from '../../styles/global.css';
import local from '../../styles/Banner/Banner.css';

const Banner = ({ darkMode, setDarkMode }) => {
  function handleClick(e) {
    e.preventDefault();
    setDarkMode(!darkMode);
  }

  return (
    <div className={global.banner}>
      <div
        className={global.logo}
        onClick={handleClick}
        onKeyPress={buildHandleEnterKeyPress(handleClick)}
        role="img"
        alt="AMOREY"
        name="logo"
      />
      <div className={local.searchBar}>
        <label htmlFor="searchBar">
          <input className={local.searchInput} name="searchBar" aria-label="Search Bar" />
        </label>
        🔍
      </div>
    </div>
  );
};

export default Banner;
