export const navItems = {
  homePage: {
    links: [
      { name: 'About', path: '#about-sec' },
      { name: 'Pricing', path: '#pricing-sec' },
      { name: 'NewsLetter', path: '#subscribe' }
    ],
    buttons: [
      { name: 'Login', path: '/auth/login' },
      { name: 'Signup', path: '/auth/signup' }
    ]
  },
  loginPage: {
    links: [],
    buttons: [
      { name: 'Signup', path: '/auth/signup' },
      { name: 'HomePage', path: '/' }
    ]
  },
  signupPage: {
    links: [],
    buttons: [
      { name: 'Login', path: '/auth/login' },
      { name: 'HomePage', path: '/' }
    ]
  }
};
