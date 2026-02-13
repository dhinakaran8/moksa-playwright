# Moksa Fitness Admin Portal - Comprehensive Test Plan

## Application Overview

Comprehensive test plan for the Moksa Fitness Admin Portal, a fitness management system with employee management, customer management, trainer scheduling, and administrative features. This application serves fitness centers with multiple branches and supports various roles including Super Admin, Trainers, Accountants, and Front Desk staff.

## Test Scenarios

### 1. Authentication & Login Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Valid Login with Correct Credentials

**File:** `tests/auth/valid-login.spec.ts`

**Steps:**
  1. Navigate to the login page using the configured base URL
    - expect: Login page loads successfully
    - expect: Page title displays 'Admin - Moksa Fitness'
    - expect: Email and password fields are visible
    - expect: Sign In button is present
    - expect: Forgot password link is available
  2. Enter valid email address in the email field
    - expect: Email is entered correctly
    - expect: Field accepts email format
    - expect: No validation errors appear
  3. Enter valid password in the password field
    - expect: Password is entered and masked with dots
    - expect: No validation errors appear
  4. Click the Sign In button
    - expect: Login process initiates
    - expect: User is redirected to dashboard
    - expect: URL changes to '/dashboard'
    - expect: Dashboard page loads successfully
  5. Verify successful login and dashboard access
    - expect: Welcome message displays 'Welcome, Super Admin'
    - expect: Navigation menu is visible
    - expect: Key metrics are displayed (Programs, Sessions, Trainers, Customers)
    - expect: Branch selector dropdown is present

#### 1.2. Invalid Login with Incorrect Credentials

**File:** `tests/auth/invalid-login.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: Login page loads successfully
  2. Enter invalid email address
    - expect: Invalid email is entered
  3. Enter invalid password
    - expect: Invalid password is entered
  4. Click the Sign In button
    - expect: Error message is displayed
    - expect: User remains on login page
    - expect: Form fields are cleared or maintain entered values

#### 1.3. Login with Remember Me Functionality

**File:** `tests/auth/remember-me-login.spec.ts`

**Steps:**
  1. Navigate to the login page
    - expect: Login page loads successfully
  2. Check the Remember Me checkbox
    - expect: Checkbox is checked
  3. Enter valid credentials and sign in
    - expect: Login is successful
    - expect: Session is maintained for longer duration
  4. Close browser and reopen application
    - expect: User remains logged in
    - expect: Dashboard is accessible without re-login

#### 1.4. Forgot Password Functionality

**File:** `tests/auth/forgot-password.spec.ts`

**Steps:**
  1. Click on 'Forgot pwd?' link
    - expect: Redirects to forgot password page
    - expect: URL contains '/forgot-password'
  2. Enter registered email address
    - expect: Email field accepts input
    - expect: Form validation works correctly
  3. Submit forgot password form
    - expect: Success message is displayed
    - expect: Email is sent to user
    - expect: User is redirected appropriately

### 2. Employee Management Tests

**Seed:** `tests/seed.spec.ts`

#### 2.1. View Employee List

**File:** `tests/employees/view-employee-list.spec.ts`

**Steps:**
  1. Navigate to Employees section from dashboard
    - expect: Employees page loads
    - expect: URL contains '/employees'
    - expect: Page title shows 'Employees'
    - expect: Breadcrumb shows 'Home • Employees List'
  2. Verify employee list table structure
    - expect: Table displays with correct headers: No, Name, Phone Number, Email, Role, Branch, Status, Created At, Created By, Action
    - expect: All columns are properly aligned
    - expect: Data is displayed for existing employees
  3. Check pagination functionality
    - expect: Pagination controls are present
    - expect: Shows 'Showing 1 to 10 of X entries'
    - expect: Previous button is disabled on first page
    - expect: Next button is enabled when there are more pages
  4. Verify search functionality
    - expect: Search box is present
    - expect: Search filters results in real-time
    - expect: Results update based on search criteria
  5. Test entries per page dropdown
    - expect: Dropdown shows options: 10, 25, 50, 100
    - expect: Table updates to show selected number of entries

#### 2.2. Create New Employee

**File:** `tests/employees/create-employee.spec.ts`

**Steps:**
  1. Click 'Create Employee' button from employee list
    - expect: Create employee form loads
    - expect: URL changes to '/employees/create'
    - expect: Form fields are visible and accessible
  2. Select branch from dropdown
    - expect: Branch dropdown opens
    - expect: Available options include: AnnaNagar Madurai, Online, SSColony Madurai
    - expect: Selection is made successfully
  3. Select role from dropdown
    - expect: Role dropdown opens
    - expect: Available options include: Trainer, Accountant, Front desk
    - expect: Selection is made successfully
  4. Fill in employee name
    - expect: Name field accepts input
    - expect: Placeholder text guides user
    - expect: Field validation works for required field
  5. Enter mobile number
    - expect: Mobile field accepts numeric input
    - expect: Field validates format (10 digits)
    - expect: Required field validation works
  6. Enter email address
    - expect: Email field accepts input
    - expect: Email format validation works
    - expect: Unique email validation functions
  7. Set password
    - expect: Password field accepts input
    - expect: Password is masked
    - expect: Meets minimum security requirements
  8. Set salary information (optional fields)
    - expect: Daily salary field accepts numeric input
    - expect: Monthly salary field accepts numeric input
    - expect: Default values are 0
  9. Submit the form by clicking 'Create Employee'
    - expect: Form is submitted successfully
    - expect: Success message is displayed
    - expect: User is redirected to employee list
    - expect: New employee appears in the list

#### 2.3. Edit Employee Information

**File:** `tests/employees/edit-employee.spec.ts`

**Steps:**
  1. From employee list, click 'Edit' button for an existing employee
    - expect: Edit form loads
    - expect: URL contains '/employees/{id}/edit'
    - expect: Form is pre-populated with existing employee data
  2. Modify employee details
    - expect: All fields are editable
    - expect: Changes are reflected in form fields
    - expect: Validation rules still apply
  3. Save the changes
    - expect: Changes are saved successfully
    - expect: Success message is displayed
    - expect: Updated information is reflected in employee list

#### 2.4. View Employee Details

**File:** `tests/employees/view-employee.spec.ts`

**Steps:**
  1. From employee list, click 'View' button for an employee
    - expect: Employee details page loads
    - expect: URL contains '/employees/{id}'
    - expect: All employee information is displayed
    - expect: Read-only view of employee data
  2. Verify all fields are displayed correctly
    - expect: Name, phone, email, role, branch, status are shown
    - expect: Creation date and creator information is visible
    - expect: Profile information is complete

#### 2.5. Delete Employee

**File:** `tests/employees/delete-employee.spec.ts`

**Steps:**
  1. From employee list, click 'Delete' button for an employee
    - expect: Confirmation dialog appears
    - expect: Warning message about deletion is shown
  2. Confirm deletion in the dialog
    - expect: Employee is deleted successfully
    - expect: Success message is displayed
    - expect: Employee no longer appears in the list
    - expect: Total count is updated

#### 2.6. Employee Status Toggle

**File:** `tests/employees/employee-status.spec.ts`

**Steps:**
  1. Locate an employee with active status (checked checkbox)
    - expect: Status checkbox is checked for active employees
  2. Click the status checkbox to deactivate
    - expect: Status changes to inactive
    - expect: Checkbox becomes unchecked
    - expect: Status is saved automatically
  3. Toggle status back to active
    - expect: Status changes back to active
    - expect: Checkbox becomes checked
    - expect: Changes are persistent

### 3. Dashboard Analytics Tests

**Seed:** `tests/seed.spec.ts`

#### 3.1. Dashboard Metrics Verification

**File:** `tests/dashboard/metrics-display.spec.ts`

**Steps:**
  1. Navigate to dashboard after login
    - expect: Dashboard loads successfully
    - expect: Welcome message is personalized
    - expect: All metric cards are visible
  2. Verify Programs metric card
    - expect: Programs count is displayed
    - expect: Card shows correct number
    - expect: Card is clickable/interactive
  3. Verify Sessions metric card
    - expect: Sessions count is displayed
    - expect: Number reflects actual data
    - expect: Visual design is consistent
  4. Verify Trainers metric card
    - expect: Trainers count is accurate
    - expect: Matches employee data filtered by trainer role
  5. Verify Customers metric card
    - expect: Customers count is displayed
    - expect: Large number formatting is correct (e.g., 815)

#### 3.2. Branch Selector Functionality

**File:** `tests/dashboard/branch-selector.spec.ts`

**Steps:**
  1. Verify branch selector dropdown is present
    - expect: Dropdown shows 'All Branches' by default
    - expect: All available branches are listed
  2. Select 'AnnaNagar Madurai' branch
    - expect: Branch selection updates
    - expect: Dashboard metrics update for selected branch
    - expect: All data filters to selected branch
  3. Test other branch options
    - expect: Each branch option works correctly
    - expect: Data filtering functions properly
    - expect: Metrics reflect branch-specific data

### 4. Navigation and UI Tests

**Seed:** `tests/seed.spec.ts`

#### 4.1. Main Navigation Menu

**File:** `tests/navigation/main-nav.spec.ts`

**Steps:**
  1. Verify all navigation menu items are present
    - expect: Dashboard, Employees, Available Trainers, Diet, Programs, Sessions, Schedules, Customers, Customer Programs, Customer Attendance, Payments, Expenses, Accounts Overview, Contact Us, Master Settings are all visible
  2. Test navigation to each section
    - expect: Each menu item is clickable
    - expect: URLs update correctly
    - expect: Pages load without errors
    - expect: Breadcrumb navigation updates appropriately
  3. Verify active state highlighting
    - expect: Current page is highlighted in navigation
    - expect: User can always identify their location in the app

#### 4.2. Responsive Design Testing

**File:** `tests/ui/responsive-design.spec.ts`

**Steps:**
  1. Test application on desktop resolution
    - expect: Layout is optimal for desktop
    - expect: All elements are properly sized and positioned
    - expect: Navigation is fully expanded
  2. Test application on tablet resolution
    - expect: Layout adapts to tablet size
    - expect: Touch-friendly interface elements
    - expect: Navigation may collapse appropriately
  3. Test application on mobile resolution
    - expect: Mobile-optimized layout
    - expect: Hamburger menu for navigation
    - expect: Touch-optimized form controls

#### 4.3. Logo and Branding

**File:** `tests/ui/branding.spec.ts`

**Steps:**
  1. Verify Moksa Fitness logo is present
    - expect: Logo loads correctly
    - expect: Logo is clickable
    - expect: Brand consistency throughout application
  2. Test logo click functionality
    - expect: Clicking logo returns to dashboard or home
    - expect: Logo serves as home button

### 5. Data Management Tests

**Seed:** `tests/seed.spec.ts`

#### 5.1. Table Sorting Functionality

**File:** `tests/data/table-sorting.spec.ts`

**Steps:**
  1. Navigate to employees list
    - expect: Table displays with sortable column headers
  2. Click on Name column header to sort
    - expect: Data sorts alphabetically by name
    - expect: Sort indicator shows direction (ascending/descending)
  3. Test sorting on other columns (Phone, Email, Role, Branch, Status, Created At, Created By)
    - expect: Each column sorts data correctly
    - expect: Sort indicators update appropriately
    - expect: Data remains consistent during sorting
  4. Test reverse sorting by clicking same column again
    - expect: Sort direction reverses
    - expect: Data re-orders correctly
    - expect: Sort indicator updates

#### 5.2. Search and Filter Functionality

**File:** `tests/data/search-filter.spec.ts`

**Steps:**
  1. Use search box to filter by employee name
    - expect: Results filter in real-time
    - expect: Only matching records are displayed
    - expect: Search is case-insensitive
  2. Search by email address
    - expect: Email search returns correct results
    - expect: Partial matches work correctly
  3. Search by phone number
    - expect: Phone number search functions properly
    - expect: Numeric search works as expected
  4. Test clear search functionality
    - expect: Clearing search restores full data
    - expect: All records are visible again

#### 5.3. Pagination Testing

**File:** `tests/data/pagination.spec.ts`

**Steps:**
  1. Navigate through pagination pages
    - expect: Next/Previous buttons work correctly
    - expect: Numbered page links function properly
    - expect: Current page is highlighted
  2. Test entries per page functionality
    - expect: Changing entries per page updates table
    - expect: Data loads correctly for different page sizes
    - expect: Pagination controls update based on page size
  3. Test edge cases (first page, last page)
    - expect: Previous button disabled on first page
    - expect: Next button disabled on last page
    - expect: Page indicators are accurate
