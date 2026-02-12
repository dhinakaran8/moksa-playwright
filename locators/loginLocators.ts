export const LoginLocators = {
  // Input fields
  usernameInput: "#email",
  passwordInput: "#password",
  
  // Buttons
  loginButton: "//button[@type='submit']",
  forgotPasswordLink: "a[href*='forgot'], a:has-text('Forgot Password')",
  
  // Checkboxes
  rememberMeCheckbox: "input[type='checkbox']",
  rememberMeLabel: "label:has-text('Remember')",
  
  // Form elements
  loginForm: "form, [role='form'], .login-form, #login-form",
  
  // Branding
  logo: "img[alt='logo']",
  companyName: ".company-name, .brand, [class*='brand']",
  
  // Error messages
  errorMessage: ".error, [class*='error'], [class*='Error'], .alert-error",
  fieldErrors: ".field-error, .input-error, [class*='field-error']",
  
  // Success indicators
  successMessage: ".success, [class*='success'], .alert-success",
  
  // Loading states
  spinner: ".spinner, .loading, [class*='loading'], [class*='spinner']",
  loadingButton: "button:has-text('Loading'), button[disabled]",
  
  // Page elements
  pageTitle: "h1, .title, [class*='title']",
  welcomeMessage: ".welcome, .greeting, [class*='welcome']",
  
  // Navigation after login
  dashboard: ".dashboard, [class*='dashboard'], main, .content",
  navMenu: "nav, .navigation, .nav-menu, [role='navigation']",
  userProfile: ".user-profile, .profile, [class*='user'], .user-menu",
  
  // Additional form elements
  showPasswordButton: "button[aria-label*='show'], .show-password, [class*='show-password']",
  signUpLink: "a[href*='signup'], a[href*='register'], a:has-text('Sign up')",
  termsLink: "a[href*='terms'], a:has-text('Terms')",
  privacyLink: "a[href*='privacy'], a:has-text('Privacy')",
  
  // Social login (if applicable)
  googleLoginButton: "button:has-text('Google'), [class*='google']",
  facebookLoginButton: "button:has-text('Facebook'), [class*='facebook']",
  
  // Language/region selectors (if applicable)
  languageSelector: ".language-selector, select[name*='language']",
  regionSelector: ".region-selector, select[name*='region']",
  
  // Accessibility elements
  loginFormLabel: "label[for='email'], label:has-text('email')",
  passwordFormLabel: "label[for='password'], label:has-text('password')"
};