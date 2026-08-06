# Selector strategy

Selectors follow `data-testid`, role, label, text, then minimal CSS. The current application exposes no `data-testid` attributes, but its headings, links, buttons, and form controls have useful accessible names. Tests therefore prefer `getByRole` and `getByLabel`.

Minimal class selectors are limited to semantic display values such as `.ticket-title`, `.priority-badge`, `.status-badge`, and `.date-cell`, because table cells do not expose unique accessible names. These are a documented coupling point. No positional, deeply nested, or coordinate selectors are used.
