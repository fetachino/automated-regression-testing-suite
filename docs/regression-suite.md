# Regression suite

All tests use Chromium and run sequentially. “Conditional” means the test skips with an explicit runtime reason when its data/UI precondition is absent.

| ID | Test name | Priority | Automated file | Tag | Requirement | Expected result | Status |
|---|---|---:|---|---|---|---|---|
| AT-001 | Dashboard loads | P0 | smoke.spec.ts | smoke | Availability | Dashboard visible | Automated |
| AT-002 | Metric cards visible | P0 | smoke.spec.ts | smoke | Monitoring | Four metrics visible | Automated |
| AT-003 | Ticket queue visible | P0 | smoke.spec.ts | smoke | Queue | Queue visible | Automated |
| AT-004 | Exact-title search | P1 | dashboard.spec.ts | regression | Search | Exact ticket returned | Automated |
| AT-005 | Case-insensitive search | P1 | dashboard.spec.ts | regression | Search | Case ignored | Conditional |
| AT-006 | Priority filter | P1 | dashboard.spec.ts | regression | Filter | Only selected priority | Automated |
| AT-007 | Status filter | P1 | dashboard.spec.ts | regression | Filter | Only selected status | Automated |
| AT-008 | Combined filters | P1 | dashboard.spec.ts | regression | Filter | Matching ticket returned | Automated |
| AT-009 | Clear filters | P1 | dashboard.spec.ts | regression | Filter reset | Default queue restored | Automated |
| AT-010 | Empty state | P2 | dashboard.spec.ts | regression | Search | Empty message shown | Automated |
| AT-011 | Create LOW ticket | P0 | ticket-creation.spec.ts | regression | Creation | Ticket created | Automated |
| AT-012 | Create HIGH ticket | P0 | ticket-creation.spec.ts | regression | Creation | Ticket created | Automated |
| AT-013 | Created ticket in queue | P0 | ticket-creation.spec.ts | regression | Persistence | Ticket searchable | Automated |
| AT-014 | Open created ticket | P0 | ticket-creation.spec.ts | regression | Navigation | Details open | Automated |
| AT-015 | Creation notification | P1 | ticket-creation.spec.ts | regression | Feedback | Success visible | Automated |
| AT-016 | Missing title | P0 | ticket-validation.spec.ts | validation | Validation | Submission rejected | Automated |
| AT-017 | Missing description | P0 | ticket-validation.spec.ts | validation | Validation | Submission rejected | Automated |
| AT-018 | Missing priority | P0 | ticket-validation.spec.ts | validation | Validation | Submission rejected | Automated |
| AT-019 | Overlong title | P1 | ticket-validation.spec.ts | validation | Boundaries | Submission rejected | Skipped: UI maxlength |
| AT-020 | Overlong description | P1 | ticket-validation.spec.ts | validation | Boundaries | Submission rejected | Skipped: UI maxlength |
| AT-021 | Multiple errors | P1 | ticket-validation.spec.ts | validation | Validation | All invalid fields exposed | Automated |
| AT-022 | Newest sorting | P1 | ticket-sorting-pagination.spec.ts | regression | Sorting | Created ticket first | Automated |
| AT-023 | Oldest sorting | P2 | ticket-sorting-pagination.spec.ts | regression | Sorting | Order changes | Conditional |
| AT-024 | Priority sorting | P1 | ticket-sorting-pagination.spec.ts | regression | Sorting | Severity order | Automated |
| AT-025 | Status sorting | P1 | ticket-sorting-pagination.spec.ts | regression | Sorting | Workflow order | Automated |
| AT-026 | Pagination controls | P2 | ticket-sorting-pagination.spec.ts | regression | Pagination | Controls visible | Conditional |
| AT-027 | Next page | P2 | ticket-sorting-pagination.spec.ts | regression | Pagination | Next page opens | Conditional |
| AT-028 | Previous page | P2 | ticket-sorting-pagination.spec.ts | regression | Pagination | Previous page opens | Conditional |
| AT-029 | Negative page input | P3 | ticket-sorting-pagination.spec.ts | regression | Pagination | Safely handled | Skipped: no input |
| AT-030 | Detail title | P0 | ticket-details-status.spec.ts | workflow | Details | Title matches | Automated |
| AT-031 | Detail priority/status | P0 | ticket-details-status.spec.ts | workflow | Details | Values match | Automated |
| AT-032 | OPEN to IN_PROGRESS | P0 | ticket-details-status.spec.ts | workflow | Workflow | Status changes | Automated |
| AT-033 | IN_PROGRESS to RESOLVED | P0 | ticket-details-status.spec.ts | workflow | Workflow | Status changes | Automated |
| AT-034 | Status persistence | P0 | ticket-details-status.spec.ts | workflow | Persistence | Status retained | Automated |
| AT-035 | Updated date changes | P1 | ticket-details-status.spec.ts | workflow | Audit | Date non-decreasing | Automated |
| AT-036 | Status notification | P1 | ticket-details-status.spec.ts | workflow | Feedback | Success visible | Automated |
| AT-037 | Missing ticket | P1 | error-handling.spec.ts | regression | Errors | Friendly 404 | Automated |
| AT-038 | Invalid priority | P1 | error-handling.spec.ts | regression | Errors | Safe 400 | Automated |
| AT-039 | Invalid status | P1 | error-handling.spec.ts | regression | Errors | Safe 400 | Automated |
| AT-040 | App unavailable | P0 | error-handling.spec.ts | regression | Diagnostics | Clear navigation failure | Automated |
| AT-041 | Desktop viewport | P2 | responsive.spec.ts | regression | Responsive | Core UI visible | Automated |
| AT-042 | Mobile viewport | P2 | responsive.spec.ts | regression | Responsive | Core UI usable | Automated |
