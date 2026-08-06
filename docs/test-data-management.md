# Test data management

Factories generate `Automated Ticket <timestamp>-<sequence>` titles so each test can find its own record without depending on seed IDs. The application uses a shared in-memory H2 database and exposes no test cleanup API. The suite therefore uses one worker, avoids fixed record counts, and conditionally skips pagination checks until enough records exist. Local restarts reset H2 data; CI starts a fresh application each run.
