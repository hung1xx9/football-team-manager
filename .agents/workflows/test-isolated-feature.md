---
description: How to safely test application features using the isolated Firebase test database
---

When the user requests to "test" a feature (for example: attendance approval, payments, etc.), you MUST follow these isolated testing steps to ensure the real production database is not modified.

1. **Enable Test Environment:**
   Use the `replace_file_content` or `multi_replace_file_content` tool to modify the `.env` file in the project root.
   Change the line `VITE_USE_TEST_DATA="false"` to `VITE_USE_TEST_DATA="true"`. If it does not exist, append `VITE_USE_TEST_DATA="true"` to the file.
   *(This safely redirects Firebase reads/writes from the 'primary' document to the 'testing' document).*

2. **Restart Dev Server:**
   You must restart the Vite dev server for the environment changes to take effect.
   - If you can track the current background command ID for `npm run dev`, terminate it.
   - Alternatively, you can run an explicit stop command (e.g., stopping tasks on port 5173).
   - Once stopped, use `run_command` in the background with `npm run dev`. Wait for the port to become active.

3. **Execute Browser Test:**
   Use the `browser_subagent` tool to navigate to `http://localhost:5173` and perform the specific testing flow requested by the user.
   **Note:** Because the `testing` document in Firebase may be empty initially, your subagent might need to logically set up prerequisites first (e.g., creating a test member, creating a test match) before performing the main test.

4. **Report Results to User:**
   Evaluate the result of the `browser_subagent` actions. Report the test outcomes along with any screenshots or summaries to the user.

5. **Restore Production Environment (CRITICAL):**
   When the test succeeds or finishes, you MUST revert the environment back to the real data state.
   Modify the `.env` file again to change `VITE_USE_TEST_DATA="true"` back to `VITE_USE_TEST_DATA="false"`.

6. **Final Dev Server Restart:**
   Restart the Vite server one last time by ending the current process and starting `npm run dev` again, so the workspace is safely reconnected to the production database.
