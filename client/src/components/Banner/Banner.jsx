import React, { useState } from 'react';
import { buildHandleEnterKeyPress } from '../../util';
import global from '../../styles/global.css';
import local from '../../styles/Banner/Banner.css';

const Banner = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleClick(e) {
    const App = document.getElementById('root');

    e.preventDefault();
    if (!isDarkMode) {
      App.style.background = 'linear-gradient(black, #053f3f 70px, #0a5d74)';
      App.style.color = '#52d1bc';
    } else {
      App.style.background = 'revert';
      App.style.color = 'revert';
    }
    setIsDarkMode(!isDarkMode);
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
