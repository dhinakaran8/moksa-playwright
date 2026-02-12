# Login Page - Positive Scenarios Test Plan

## Application Overview

Comprehensive test plan for Login Page positive scenarios using the existing Playwright framework structure with Page Object Model, custom actions, and logging utilities. This plan covers successful login flows, UI validations, and user interaction scenarios to ensure the login functionality works as expected for valid user credentials and normal user behavior patterns.

## Test Scenarios

### 1. Login Positive Flow Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Valid Login with Email and Password

**File:** `tests/login/valid-login.spec.ts`

**Steps:**
  1. Navigate to the login page using baseURL from config
    - expect: Login page loads successfully
    - expect: Email input field is visible
    - expect: Password input field is visible
    - expect: Login button is visible
  2. Enter valid email address in the email field
    - expect: Email is entered correctly
    - expect: No validation errors appear
    - expect: Field accepts the input
  3. Enter valid password in the password field
    - expect: Password is entered and masked
    - expect: No validation errors appear
    - expect: Login button becomes enabled
  4. Click the Login/Sign In button
    - expect: Login process initiates
    - expect: User is redirected to dashboard
    - expect: URL changes to contain '/dashboard'
    - expect: Dashboard elements are visible
    - expect: No error messages appear

#### 1.2. Login Using Keyboard Enter Key

**File:** `tests/login/keyboard-login.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads with all required elements
  2. Enter valid email address
    - expect: Email is entered successfully
  3. Enter valid password
    - expect: Password is entered and masked
  4. Press Enter key while password field is focused
    - expect: Login form submits successfully
    - expect: User is redirected to dashboard
    - expect: Login process completes without clicking login button

#### 1.3. Remember Me Functionality

**File:** `tests/login/remember-me.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads with Remember Me checkbox visible
  2. Enter valid credentials
    - expect: Email and password are entered correctly
  3. Check the Remember Me checkbox
    - expect: Remember Me checkbox is selected
    - expect: Checkbox state changes to checked
  4. Click login button
    - expect: User logs in successfully
    - expect: Dashboard is displayed
  5. Close browser and restart application
    - expect: When navigating back to the site
    - expect: User session is preserved
    - expect: User remains logged in or login fields are pre-filled

#### 1.4. Login Button State Management

**File:** `tests/login/button-state.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Verify initial state of login button
    - expect: Login button is initially disabled or in default state
  3. Enter valid email only
    - expect: Email field is filled
    - expect: Login button remains disabled (if validation requires both fields)
  4. Enter valid password
    - expect: Password field is filled
    - expect: Login button becomes enabled
    - expect: Button is clickable
  5. Clear one of the fields
    - expect: Login button becomes disabled again (if validation is real-time)

#### 1.5. Login Page Load Validation

**File:** `tests/login/page-load.spec.ts`

**Steps:**
  1. Navigate to login page URL
    - expect: Page loads without errors
    - expect: Page title is correct
    - expect: Login form is visible
  2. Verify all essential elements are present
    - expect: Email input field is visible and accessible
    - expect: Password input field is visible and accessible
    - expect: Login/Sign In button is visible
    - expect: Company logo or branding is displayed
    - expect: All elements load within acceptable timeframe
  3. Check form field properties
    - expect: Email field has proper input type
    - expect: Password field is masked
    - expect: Fields have appropriate placeholders or labels
    - expect: Tab navigation works correctly between fields

#### 1.6. Successful Login Response Handling

**File:** `tests/login/login-response.spec.ts`

**Steps:**
  1. Complete valid login process
    - expect: Login API call returns success response
    - expect: Authentication token is received
    - expect: User data is retrieved
  2. Verify post-login state
    - expect: User is redirected to correct dashboard URL
    - expect: Navigation menu appears
    - expect: User profile information is displayed
    - expect: Session is established properly
  3. Check browser storage
    - expect: Authentication token is stored (localStorage/sessionStorage)
    - expect: User preferences are loaded
    - expect: Session cookie is set if applicable
