TRIX PORTFOLIO - HOW TO PUT IT ONLINE

IMPORTANT: unzip first. Upload the CONTENTS of this folder, not the zip.
index.html must sit at the very top (root) of what you upload, with the "assets" folder, style.css and app.js right beside it.

Option A (easiest) - Netlify Drop
1. Unzip this file.
2. Go to app.netlify.com/drop
3. Drag the unzipped folder onto the page. You get a link in seconds.

Option B - GitHub then Vercel
1. Create a new GitHub repository.
2. Upload ALL files and the assets folder (Add file > Upload files). Use the folder, not the zip.
3. In Vercel choose Add New > Project, import that repository.
4. Framework Preset: Other. Leave build command and output directory empty. Deploy.

Option C - Vercel from your computer
Install Node, open this folder in a terminal, run: npx vercel --prod

If videos or images do not show, the assets folder was not uploaded or index.html is inside an extra folder.
