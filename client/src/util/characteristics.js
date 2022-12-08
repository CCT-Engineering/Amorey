let string = '';

const characteristics = {
  Size: (rating) => {
    if (rating === 1) {
      string = 'A size too small';
    } else if (rating === 2) {
      string = '1/2 a size too small';
    } else if (rating === 3) {
      string = 'Perfect';
    } else if (rating === 4) {
      string = '1/2 a size too big';
    } else {
      string = 'A size too wide';
    }
    return string;
  },

  Width: (number) => {
    if (number === 1) {
      string = 'Too narrow';
    } else if (number === 2) {
      string = 'Slightly narrow';
    } else if (number === 3) {
      string = 'Perfect';
    } else if (number === 4) {
      string = 'Slightly wide';
    } else {
      string = 'Too wide';
    }
    return string;
  },

  Comfort: (number) => {
    if (number === 1) {
      string = 'Uncomfortable';
    } else if (number === 2) {
      string = 'Slightly uncomfortable';
    } else if (number === 3) {
      string = 'Ok';
    } else if (number === 4) {
      string = 'Comforatble';
    } else {
      string = 'Perfect';
    }
    return string;
  },

  Quality: (number) => {
    if (number === 1) {
      string = 'Poor';
    } else if (number === 2) {
      string = 'Below average';
    } else if (number === 3) {
      string = 'What I expected';
    } else if (number === 4) {
      string = 'Pretty great';
    } else {
      string = 'Perfect';
    }
    return string;
  },

  Length: (number) => {
    if (number === 1) {
      string = 'Runs Short';
    } else if (number === 2) {
      string = 'Runs slightly short';
    } else if (number === 3) {
      string = 'Perfect';
    } else if (number === 4) {
      string = 'Runs slightly long';
    } else {
      string = 'Runs long';
    }
    return string;
  },

  Fit: (number) => {
    if (number === 1) {
      string = 'Runs tight';
    } else if (number === 2) {
      string = 'Runs slightly short';
    } else if (number === 3) {
      string = 'Perfect';
    } else if (number === 4) {
      string = 'Runs slightly long';
    } else {
      string = 'Runs long';
    }
    return string;
  },
};

export default characteristics;
