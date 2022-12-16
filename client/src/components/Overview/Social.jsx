import React from 'react';
import local from '../../styles/Overview/Social.css';
import { buildHandleEnterKeyPress } from '../../util';
import imgfdsfs from '../../assets/f-logo-RGB-Blue-58.png';

function Social({ darkMode }) {
  const socialBackground = darkMode
    ? { background: '#1E556C' }
    : { background: 'rgb(172, 233, 222)' };

  function handleBtnClick(e) {
    e.preventDefault();
  }

  function buildBtn(className, btnName) {
    return (
      <button
        type="button"
        tabIndex={0}
        className={className}
        aria-label={btnName}
        name={btnName}
        onClick={handleBtnClick}
        onKeyPress={buildHandleEnterKeyPress(handleBtnClick)}
      />
    );
  }

  return (
    <div
      className={local.social}
      style={socialBackground}
    >
      {buildBtn(local.fbLogo, 'facebook')}
      {buildBtn(local.twitLogo, 'twitter')}
      {buildBtn(local.pintLogo, 'pinterest')}
    </div>
  );
}

export default Social;
