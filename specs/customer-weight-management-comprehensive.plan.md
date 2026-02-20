# Customer Weight Management - Comprehensive Test Plan

## Application Overview

This test plan covers comprehensive testing of the Moksa Fitness customer weight management system. The application allows fitness consultants to track customer weight progress over time with photo attachments and notes. The testing covers login workflows, customer search functionality, weight history management, and bulk data entry scenarios for historical weight tracking from past years to current date.

## Test Scenarios

### 1. Authentication and Navigation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful Login and Dashboard Access

**File:** `tests/weight-management/auth.spec.ts`

**Steps:**

1. Navigate to https://dev-portal.moksafitness.com/


    - expect: Login page loads successfully
    - expect: Email and Password fields are visible
    - expect: Sign In button is enabled

2. Enter email 'suregshi.cr@gmail.com' and password '123456'


    - expect: Credentials are entered correctly without errors
    - expect: Fields accept the input

3. Click Sign In button


    - expect: Successful authentication
    - expect: Dashboard page loads (URL: /dashboard)
    - expect: Navigation sidebar is visible with Customers option

4. Verify dashboard elements and statistics


    - expect: Dashboard shows customer count
    - expect: All navigation options are visible
    - expect: User profile icon is displayed

#### 1.2. Invalid Login Credentials

**File:** `tests/weight-management/auth-negative.spec.ts`

**Steps:**

1. Navigate to login page and enter invalid credentials


    - expect: Error message displayed
    - expect: User remains on login page
    - expect: No access to dashboard

2. Attempt login with empty fields


    - expect: Validation messages appear
    - expect: Login button disabled or validation prevents submission

### 2. Customer Search and Profile Access

**Seed:** `tests/seed.spec.ts`

#### 2.1. Customer Search by Phone Number

**File:** `tests/weight-management/customer-search.spec.ts`

**Steps:**

1. Login and navigate to Customers section


    - expect: Customers page loads successfully
    - expect: Search functionality is visible
    - expect: Customer table displays

2. Enter phone number '7708911056' in search field


    - expect: Search filters results
    - expect: Customer 'varsha' appears in results
    - expect: Edit and View buttons are available

3. Click Edit button for the customer


    - expect: Customer edit page loads (/customer/1068/edit)
    - expect: Customer profile tabs are visible
    - expect: Weight History tab is present

#### 2.2. Customer Search with Invalid Phone Number

**File:** `tests/weight-management/customer-search-negative.spec.ts`

**Steps:**

1. Search for non-existent phone number '9999999999'


    - expect: No results found message
    - expect: Table shows empty state
    - expect: Search functionality remains active

2. Search with invalid phone format


    - expect: Graceful handling of invalid input
    - expect: No system errors
    - expect: Clear feedback to user

### 3. Weight History Management - Core Functions

**Seed:** `tests/seed.spec.ts`

#### 3.1. Access Weight History Tab

**File:** `tests/weight-management/weight-history-access.spec.ts`

**Steps:**

1. Navigate to customer profile and click Weight History tab


    - expect: Weight History tab activates
    - expect: Table displays with columns: Date, Weight (kg), Attachment, Notes, Created By, Action
    - expect: Add Weight Record button is visible

2. Verify initial state when no weight records exist


    - expect: Table shows 'No data available' message
    - expect: Pagination shows '0 to 0 of 0 entries'
    - expect: Add button remains functional

#### 3.2. Add Single Weight Record - Happy Path

**File:** `tests/weight-management/weight-record-single.spec.ts`

**Steps:**

1. Click 'Add Weight Record' button


    - expect: Modal dialog opens
    - expect: Form displays with fields: Date*, Weight(kg)*, Attachment*, Notes
    - expect: All mandatory fields marked with asterisk

2. Enter today's date in DD-MM-YYYY format


    - expect: Date field accepts the format
    - expect: No validation errors
    - expect: Date is correctly formatted

3. Enter weight value '75.5' kg


    - expect: Weight field accepts decimal values
    - expect: Spin button controls work
    - expect: Valid range accepted

4. Upload a valid JPG image under 2MB


    - expect: File upload succeeds
    - expect: File name displays
    - expect: No file size or format errors

5. Enter notes 'Regular weight check - feeling healthy'


    - expect: Notes field accepts text input
    - expect: Character limit respected if any
    - expect: Text saves properly

6. Click Save button


    - expect: Record saves successfully
    - expect: Modal closes
    - expect: New record appears in weight history table
    - expect: Success message/feedback displayed

### 4. Weight History - Data Entry Variations

**Seed:** `tests/seed.spec.ts`

#### 4.1. Weight Record with Minimum and Maximum Values

**File:** `tests/weight-management/weight-boundaries.spec.ts`

**Steps:**

1. Create weight record with 30kg (minimum test value)


    - expect: Minimum weight accepted
    - expect: Record saves without issues
    - expect: Value displays correctly in table

2. Create weight record with 90kg (maximum test value)


    - expect: Maximum weight accepted
    - expect: Record saves without issues
    - expect: Value displays correctly in table

3. Test decimal weight values (e.g., 45.7kg)


    - expect: Decimal precision maintained
    - expect: Display shows correct format
    - expect: Calculations remain accurate

#### 4.2. File Upload Variations

**File:** `tests/weight-management/file-upload.spec.ts`

**Steps:**

1. Upload PNG file under 2MB


    - expect: PNG format accepted
    - expect: File uploads successfully
    - expect: File reference stored correctly

2. Upload JPEG file under 2MB


    - expect: JPEG format accepted
    - expect: Upload completes
    - expect: Image attachment saved

3. Upload maximum size file (near 2MB limit)


    - expect: Large valid file accepted
    - expect: Upload progress handled
    - expect: No timeout errors

#### 4.3. Date Range Testing

**File:** `tests/weight-management/date-range.spec.ts`

**Steps:**

1. Create record with past date (1 year ago)


    - expect: Historical date accepted
    - expect: Chronological ordering maintained
    - expect: No date validation blocking

2. Create record with current date


    - expect: Today's date works
    - expect: Timestamp accuracy
    - expect: Immediate availability in list

3. Verify date formatting consistency


    - expect: All dates display in same DD-MM-YYYY format
    - expect: Sorting works correctly
    - expect: No formatting discrepancies

### 5. Bulk Weight Records - Multi-Year Historical Data

**Seed:** `tests/seed.spec.ts`

#### 5.1. Progressive Weight Tracking - 3 Years Historical

**File:** `tests/weight-management/bulk-weight-tracking.spec.ts`

**Steps:**

1. Create daily weight records starting 3 years back from current date


    - expect: System handles date calculations correctly
    - expect: Historical dates are accepted
    - expect: No errors on old dates

2. Implement progressive weight increase from 30kg to 90kg over the time period


    - expect: Weight values increment logically
    - expect: Mathematical progression maintained
    - expect: No sudden unrealistic jumps

3. For each day: Set date, calculate progressive weight, upload sample image, add notes 'Auto weight entry for testing'


    - expect: Bulk entry process completes
    - expect: All mandatory fields filled
    - expect: Consistent data pattern
    - expect: File uploads don't fail

4. Continue daily entries until current date or 90kg reached


    - expect: Process completes at defined end condition
    - expect: Final weight of 90kg or current date achieved
    - expect: All records persist correctly

5. Validate complete weight history after bulk entry


    - expect: All records visible in table
    - expect: Chronological order maintained
    - expect: Search and pagination work
    - expect: Data integrity preserved

#### 5.2. Performance Testing with Large Dataset

**File:** `tests/weight-management/performance-bulk.spec.ts`

**Steps:**

1. Monitor page performance during bulk data entry


    - expect: Page remains responsive
    - expect: No memory leaks
    - expect: Table pagination handles large dataset

2. Test search functionality with large number of records


    - expect: Search performance remains acceptable
    - expect: Results filter correctly
    - expect: No significant delays

### 6. Error Handling and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 6.1. Form Validation Errors

**File:** `tests/weight-management/form-validation.spec.ts`

**Steps:**

1. Attempt to save weight record without entering date


    - expect: Validation error displayed
    - expect: Form submission blocked
    - expect: Date field highlighted as required

2. Attempt to save without weight value


    - expect: Weight required validation triggered
    - expect: Save button disabled or error shown
    - expect: Field marked as mandatory

3. Attempt to save without attachment


    - expect: File upload validation error
    - expect: Clear message about attachment requirement
    - expect: Form remains open for correction

#### 6.2. File Upload Error Cases

**File:** `tests/weight-management/file-upload-errors.spec.ts`

**Steps:**

1. Upload file larger than 2MB


    - expect: File size error displayed
    - expect: Upload rejected
    - expect: Clear guidance on size limits

2. Upload unsupported file format (e.g., PDF, DOC)


    - expect: Format validation error
    - expect: Only JPG/JPEG/PNG message shown
    - expect: File rejected appropriately

3. Upload corrupted or invalid image file


    - expect: File corruption detected
    - expect: Error handling graceful
    - expect: No system crash

#### 6.3. Duplicate Entry Prevention

**File:** `tests/weight-management/duplicate-prevention.spec.ts`

**Steps:**

1. Attempt to create weight record for same date when one already exists


    - expect: Duplicate detection if implemented
    - expect: Clear user feedback
    - expect: Options to update or create new

2. Test concurrent entry scenarios


    - expect: Data consistency maintained
    - expect: No conflicting records
    - expect: Proper locking mechanisms

### 7. Weight History Management Operations

**Seed:** `tests/seed.spec.ts`

#### 7.1. View and Edit Existing Records

**File:** `tests/weight-management/record-operations.spec.ts`

**Steps:**

1. View existing weight record details


    - expect: Record data displays completely
    - expect: All fields populated correctly
    - expect: Attachment viewable

2. Edit weight value in existing record


    - expect: Edit functionality works
    - expect: Updated values save
    - expect: History maintains audit trail

3. Update attachment in existing record


    - expect: File replacement works
    - expect: Old file handled appropriately
    - expect: New attachment links correctly

#### 7.2. Weight History Table Features

**File:** `tests/weight-management/table-features.spec.ts`

**Steps:**

1. Test table sorting by date


    - expect: Chronological sorting works
    - expect: Ascending/descending options
    - expect: Data order maintained

2. Test table sorting by weight


    - expect: Numerical sorting accurate
    - expect: Handles decimal values
    - expect: Sort indicators clear

3. Filter records using search functionality


    - expect: Search works across all fields
    - expect: Results update dynamically
    - expect: Clear search resets filter

4. Test pagination with different page sizes


    - expect: 10, 25, 50, 100 entries options work
    - expect: Navigation between pages smooth
    - expect: Total count accurate
