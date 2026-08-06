# Automation strategy

## Scope and objectives

This suite validates the ticket dashboard, search/filter/sort behavior, ticket creation and validation, workflow status changes, errors, and responsive usability. It provides fast confidence for application-support releases; it is not a replacement for unit, security, performance, accessibility, or API contract testing.

## Risks and assumptions

The Spring Boot application is already running locally, seeded H2 data may differ, and test-created records cannot currently be deleted. Shared mutable data makes parallel execution unsafe. UI wording and CSS classes used for display values are maintenance risks.

## Test levels and suites

`@smoke` is a three-test availability and rendering gate. `@regression` covers business behavior. Chromium is the initial supported browser; Firefox/WebKit are roadmap items.

## Policies

Selectors prefer test IDs, accessible roles, labels, and visible text. Created data receives collision-resistant titles. Tests run sequentially and locate their own records. Failure evidence consists of an HTML report, screenshot on failure, retained failure video, and trace on the first CI retry.

## Entry and exit criteria

Entry: Java 17 application responds at `/tickets`, supported Node.js is installed, dependencies and Chromium are installed. Exit: typecheck and applicable smoke/regression tests pass, with intentional skips reviewed and artifacts published.

## Maintenance

Review selectors with every UI change, keep page objects focused, remove obsolete skips when application contracts improve, and periodically test newer Playwright/Node versions on a branch.
