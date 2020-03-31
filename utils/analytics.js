import ReactGA from 'react-ga';

export const initGA = () => {
  console.log("GA Init")
  ReactGA.initialize("UA-162354631-1");
}

export const logPageView = () => {
  const { pathname } = window.location;
  console.log(`logging pageview for ${pathname}`);
  ReactGA.set({
    page: pathname
  })
  ReactGA.pageview(pathname);
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}