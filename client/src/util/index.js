const buildHandleEnterKeyPress = (onClick) => (e) => {
  if (e.key === 'Enter') {
    onClick(e);
  }
};

// Arrow key presses cannot be detected by onKeyPress.
// Instead, they are detected by onKeyDown.
const buildHandleKeyDown = (onClick, keys = []) => (e) => {
  keys.forEach((key) => {
    if (e.key === key) {
      onClick(e);
    }
  });
};

export { buildHandleEnterKeyPress, buildHandleKeyDown };
