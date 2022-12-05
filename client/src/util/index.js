const buildHandleEnterKeyPress = (onClick) => (e) => {
  if (e.key === 'Enter') {
    onClick(e);
  }
};

const placeholderFunc = () => {};

export { buildHandleEnterKeyPress, placeholderFunc };
