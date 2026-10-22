# OpsOS

Single-file cafe operations app (`index.html`). Open it in a browser; data is kept in `localStorage`.

## Google Sheets sync

1. Create a Google Sheet, then **Extensions → Apps Script**. Paste `apps-script/Code.gs`.
2. **Project Settings → Script properties → Add**: key `OPSOS_TOKEN`, value a long random string.
3. **Deploy → New deployment → Web app**. Execute as: *Me*. Who has access: *Anyone*. Copy the `/exec` URL.
4. In OpsOS open the gear icon, paste the URL and the same token, then use **Hantar** / **Tarik**.

Sync is snapshot-based: each action replaces everything on the other side. Pull before you work, push when done, one person at a time.
The token is stored in the browser and is the only protection on the URL, so use a long one and do not share the page URL with it filled in.

Payroll figures are estimates (EPF 11% / 13% up to RM5,000 then 12%; SOCSO/EIS up to a RM6,000 ceiling; SOCSO percentages are approximate). Check the official schedules before paying salaries.
