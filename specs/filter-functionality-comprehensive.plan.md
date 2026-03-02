# Comprehensive Filter Functionality End-to-End Test Plan

## Application Overview

A comprehensive test plan covering end-to-end filter functionality across all sections of the Moksa Fitness application. This plan includes testing of basic filtering capabilities (search, sorting, pagination), advanced filtering options (date ranges, dropdowns, multi-criteria filtering), and edge cases to ensure robust filter performance across Employees, Customers, Payments, Sessions, and other data-heavy sections.

## Test Scenarios

### 1. Basic Filter Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Search Box Functionality

**File:** `tests/basic-filters/search-box-functionality.spec.ts`

**Steps:**
  1. Navigate to Employees page
    - expect: Employees page loads successfully
    - expect: Data table is visible with employee records
  2. Enter valid search term in search box (e.g., 'Abhimeena')
    - expect: Search results filter to show matching records only
    - expect: Records contain the searched term in any visible field
  3. Enter partial search term (e.g., 'Abhi')
    - expect: Search results show all records containing the partial term
    - expect: Search is case-insensitive
  4. Enter search term that matches multiple fields (phone number, email)
    - expect: Search results show records matching across different columns
    - expect: All relevant matches are displayed
  5. Enter invalid/non-existent search term
    - expect: No results message is displayed
    - expect: Empty table state is handled gracefully
  6. Clear search box
    - expect: All records are restored
    - expect: Original dataset is visible again

#### 1.2. Pagination Controls

**File:** `tests/basic-filters/pagination-controls.spec.ts`

**Steps:**
  1. Navigate to Employees page with multiple pages of data
    - expect: Pagination controls are visible
    - expect: Current page indicator shows page 1
    - expect: Total entries count is displayed
  2. Click Next button
    - expect: Page advances to page 2
    - expect: Different set of records is displayed
    - expect: Previous button becomes enabled
  3. Click on specific page number (e.g., page 3)
    - expect: Navigates directly to selected page
    - expect: Correct page number is highlighted
    - expect: Appropriate records are shown for that page
  4. Click Previous button from page 2
    - expect: Returns to page 1
    - expect: Previous button becomes disabled
    - expect: First set of records is displayed
  5. Navigate to last page
    - expect: Next button becomes disabled
    - expect: Correct remaining records count is shown
    - expect: Last page indicator is active

#### 1.3. Entries Per Page Dropdown

**File:** `tests/basic-filters/entries-per-page.spec.ts`

**Steps:**
  1. Navigate to Employees page
    - expect: Default entries per page is set to 10
    - expect: 10 records are displayed in the table
  2. Change entries per page to 25
    - expect: Table updates to show 25 records per page
    - expect: Pagination controls adjust accordingly
    - expect: Status text updates to reflect new range
  3. Change entries per page to 50
    - expect: Table shows 50 records per page
    - expect: Pagination reduces as more records fit per page
    - expect: Performance remains acceptable
  4. Change entries per page to 100
    - expect: Table shows maximum 100 records per page
    - expect: All data loads within reasonable time
    - expect: UI remains responsive
  5. Switch back to 10 entries per page
    - expect: Table reverts to showing 10 records
    - expect: Pagination controls return to original state
    - expect: Current position is maintained where possible

#### 1.4. Column Sorting

**File:** `tests/basic-filters/column-sorting.spec.ts`

**Steps:**
  1. Navigate to Employees page
    - expect: All sortable columns have sort indicators
    - expect: Default sort state is visible
  2. Click on Name column header to sort ascending
    - expect: Names are sorted alphabetically A-Z
    - expect: Sort indicator shows ascending arrow
    - expect: Data updates immediately
  3. Click Name column header again to sort descending
    - expect: Names are sorted alphabetically Z-A
    - expect: Sort indicator shows descending arrow
    - expect: Sort direction toggles correctly
  4. Sort by Email column
    - expect: Email addresses are sorted alphabetically
    - expect: Previous sort on Name column is cleared
    - expect: Only one column can be primary sort at a time
  5. Sort by Created At date column
    - expect: Records are sorted by date (newest/oldest first)
    - expect: Date sorting works correctly
    - expect: Date format remains consistent
  6. Sort by Phone Number column
    - expect: Phone numbers are sorted numerically
    - expect: Numeric sorting works correctly
    - expect: Phone format is preserved

### 2. Advanced Filter Functionality

**Seed:** `tests/seed.spec.ts`

#### 2.1. Date Range Filters

**File:** `tests/advanced-filters/date-range-filters.spec.ts`

**Steps:**
  1. Navigate to Payments page
    - expect: Payments page loads with default date range
    - expect: Advanced Filters section is visible
    - expect: Current month date range is pre-selected
  2. Click Toggle Filters to expand advanced filter panel
    - expect: Date range filter panel becomes visible
    - expect: From Date and To Date fields are displayed
    - expect: Default values are populated
  3. Set custom date range (e.g., last week)
    - expect: Date fields accept custom dates
    - expect: From date is before To date validation
    - expect: Calendar picker works correctly if available
  4. Click Apply Filters with custom date range
    - expect: Results filter to show payments within selected date range only
    - expect: Date range display updates in header
    - expect: Total amount recalculates for filtered range
  5. Select future date range with no data
    - expect: No results are displayed
    - expect: Empty state message is shown
    - expect: Total amount shows ₹0.00
  6. Reset date filters
    - expect: Date range returns to default
    - expect: All payment records are displayed
    - expect: Total amount reflects all payments

#### 2.2. Multi-Criteria Advanced Filters

**File:** `tests/advanced-filters/multi-criteria-filters.spec.ts`

**Steps:**
  1. Navigate to Payments page and open advanced filters
    - expect: All filter dropdowns are visible
    - expect: Default 'All' options are selected
    - expect: Filter panel is fully expanded
  2. Select specific Program Type (e.g., 'Regular Program')
    - expect: Program Type dropdown updates with selection
    - expect: Other filter options remain available
    - expect: Filter is ready to apply
  3. Select specific Program Mode (e.g., 'Group Online')
    - expect: Program Mode dropdown shows selection
    - expect: Combined filters are staged
    - expect: Apply button remains available
  4. Select specific Payment Type (e.g., 'Cash')
    - expect: Payment Type filter is applied
    - expect: Multiple criteria are combined
    - expect: Filter combination is valid
  5. Apply combined filters
    - expect: Results show only payments matching ALL selected criteria
    - expect: Result count decreases appropriately
    - expect: Each record matches all filter conditions
  6. Add Branch filter to existing filters
    - expect: Branch filter combines with existing filters
    - expect: Results further narrow down
    - expect: No conflicts between filter criteria
  7. Reset all filters
    - expect: All dropdown selections return to 'All'
    - expect: Complete dataset is restored
    - expect: Total amount reflects all payments again

#### 2.3. Session Filters

**File:** `tests/advanced-filters/session-filters.spec.ts`

**Steps:**
  1. Navigate to Sessions page
    - expect: Sessions page loads successfully
    - expect: Group tab is selected by default
    - expect: Session data is visible
  2. Switch to Personal tab
    - expect: Personal sessions are displayed
    - expect: Tab selection updates
    - expect: Data changes to personal session format
  3. Open advanced filters on Group tab
    - expect: Program Type, Program, Time Slot, and Trainer filters are visible
    - expect: All dropdowns show 'All' as default
    - expect: Trainer dropdown includes searchable option
  4. Filter by Program Type 'Group Online'
    - expect: Only online group sessions are displayed
    - expect: Session data matches selected program type
    - expect: Other tabs remain available
  5. Add specific Program filter (e.g., 'Beginner Session')
    - expect: Results show only Beginner Sessions that are Group Online
    - expect: Combined filters work correctly
    - expect: Session details match both criteria
  6. Add Trainer filter
    - expect: Results further filter by selected trainer
    - expect: Trainer dropdown search functionality works
    - expect: All filter combinations apply correctly
  7. Test Time Slot filter
    - expect: Time-based filtering works correctly
    - expect: Sessions display appropriate time slots
    - expect: Time format is consistent

### 3. Filter Performance and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 3.1. Large Dataset Performance

**File:** `tests/performance/large-dataset-filters.spec.ts`

**Steps:**
  1. Navigate to section with large dataset (100+ records)
    - expect: Page loads within acceptable time
    - expect: Initial data display is responsive
    - expect: Filter controls are immediately available
  2. Apply search filter on large dataset
    - expect: Search results return within 2-3 seconds
    - expect: UI remains responsive during search
    - expect: Results are accurate
  3. Change to show 100 entries per page
    - expect: Large page size loads within reasonable time
    - expect: Scrolling remains smooth
    - expect: Browser performance is acceptable
  4. Apply multiple advanced filters on large dataset
    - expect: Multiple filters process efficiently
    - expect: No browser freezing or crashes
    - expect: Results are accurate and complete
  5. Rapidly switch between different filter combinations
    - expect: Filter changes are processed smoothly
    - expect: No race conditions or errors
    - expect: Each filter update is complete before applying next

#### 3.2. Filter State Management

**File:** `tests/edge-cases/filter-state-management.spec.ts`

**Steps:**
  1. Apply multiple filters on Payments page
    - expect: All selected filters are active
    - expect: Filter state is clearly indicated
    - expect: Results reflect all active filters
  2. Navigate away from page and return
    - expect: Filter state is preserved
    - expect: Same filtered results are displayed
    - expect: No data loss after navigation
  3. Refresh page after applying filters
    - expect: Page returns to default filter state
    - expect: All data is displayed
    - expect: No errors occur during refresh
  4. Apply filters and use browser back button
    - expect: Browser navigation works correctly
    - expect: Filter state behaves predictably
    - expect: No JavaScript errors occur
  5. Open multiple tabs with different filter states
    - expect: Each tab maintains independent filter state
    - expect: No cross-tab interference
    - expect: Filter states don't conflict

#### 3.3. Filter Validation and Error Handling

**File:** `tests/edge-cases/filter-validation.spec.ts`

**Steps:**
  1. Enter invalid date format in date range filter
    - expect: Appropriate error message is displayed
    - expect: Invalid date is not accepted
    - expect: Form validation prevents submission
  2. Set From Date after To Date
    - expect: Date range validation error is shown
    - expect: User is prompted to correct date range
    - expect: Apply button is disabled until fixed
  3. Apply filters when network is slow/unavailable
    - expect: Loading states are displayed appropriately
    - expect: Error messages appear for failed requests
    - expect: Graceful degradation occurs
  4. Try to apply conflicting filter combinations
    - expect: System handles conflicts appropriately
    - expect: Clear messaging about filter incompatibilities
    - expect: No system errors or crashes
  5. Test filter behavior with special characters in search
    - expect: Special characters are handled safely
    - expect: No SQL injection or XSS vulnerabilities
    - expect: Search results are accurate

#### 3.4. Export Functionality with Filters

**File:** `tests/integration/export-with-filters.spec.ts`

**Steps:**
  1. Apply specific filters on Payments page
    - expect: Filtered results are displayed correctly
    - expect: Export Data button is available
    - expect: Filter criteria are clearly shown
  2. Click Export Data button
    - expect: Export process initiates
    - expect: Loading/processing indicator appears
    - expect: Download begins automatically
  3. Verify exported data matches filtered results
    - expect: Downloaded file contains only filtered data
    - expect: All filtered records are included
    - expect: Data integrity is maintained
  4. Export with no filters applied
    - expect: Complete dataset is exported
    - expect: Export size reflects full dataset
    - expect: No data is missing from export
  5. Try to export empty filter results
    - expect: Empty file or appropriate message is provided
    - expect: Export process doesn't fail
    - expect: User is informed of empty results

### 4. Cross-Section Filter Consistency

**Seed:** `tests/seed.spec.ts`

#### 4.1. Filter UI Consistency

**File:** `tests/consistency/filter-ui-consistency.spec.ts`

**Steps:**
  1. Navigate through all main sections (Employees, Customers, Payments, Sessions)
    - expect: Basic filter UI is consistent across sections
    - expect: Search box placement and behavior is uniform
    - expect: Pagination controls work the same way
  2. Test entries per page dropdown across different sections
    - expect: Same options (10, 25, 50, 100) available everywhere
    - expect: Dropdown behavior is consistent
    - expect: Selection persistence works uniformly
  3. Compare column sorting across sections
    - expect: Sort indicators are consistent
    - expect: Sort behavior works the same way
    - expect: Toggle between ascending/descending is uniform
  4. Check advanced filter toggles and panels
    - expect: Toggle Filters button works consistently
    - expect: Filter panel layout follows same pattern
    - expect: Reset and Apply buttons behave uniformly

#### 4.2. Filter Integration Tests

**File:** `tests/integration/filter-integration.spec.ts`

**Steps:**
  1. Apply Employee filters and then navigate to related Customer data
    - expect: Navigation works smoothly
    - expect: Independent filter states are maintained
    - expect: No data corruption between sections
  2. Filter Sessions by trainer and then check Employee details
    - expect: Cross-references work correctly
    - expect: Related data links function properly
    - expect: Filter contexts don't interfere
  3. Use Payment filters and then access related Customer Programs
    - expect: Data relationships are maintained
    - expect: Filtering doesn't break navigation paths
    - expect: Context switching works smoothly
  4. Apply multiple filters across different sections in one session
    - expect: Each section maintains its own filter state
    - expect: No memory leaks or performance degradation
    - expect: Filter combinations don't conflict globally
