# Local environment setup (Windows PowerShell)

```powershell
cd C:\projects\java-application-support-lab
mvn spring-boot:run
```

In a second PowerShell window:

```powershell
cd C:\projects\automated-regression-testing-suite
Copy-Item .env.example .env
npm install
npx playwright install chromium
npm run typecheck
npm run test:smoke
npm run test:regression
npm run test:report
```

If your application repository lives elsewhere, change only the first `cd`. Confirm readiness with `Invoke-WebRequest http://localhost:8080/tickets -UseBasicParsing`.
