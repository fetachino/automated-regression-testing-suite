# CI/CD strategy

GitHub Actions checks out this automation repository and `fetachino/java-application-support-lab` into a sibling folder. Temurin 17 and Node 22 are configured with Maven and npm caching. Maven builds the application, the JAR starts in the background, and a bounded `curl --fail` loop verifies `/tickets` rather than relying on a fixed delay. The workflow fails immediately if the process exits or readiness times out.

After Chromium and its Linux dependencies are installed, TypeScript is checked and the sequential regression suite runs. HTML, Playwright failure evidence, Allure results, and the application log are uploaded even on failure. An always-run cleanup step terminates the Java process.
