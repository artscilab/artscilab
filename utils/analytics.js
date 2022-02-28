import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-4VZS72ZLJT');
};

export const logPageView = () => {
  const { pathname } = window.location;
  ReactGA.set({
    page: pathname,
  });
  ReactGA.pageview(pathname);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
