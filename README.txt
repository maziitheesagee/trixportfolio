TRIX PORTFOLIO - HOW TO PUT IT ONLINE

Every file sits side by side. There are NO sub-folders.
Upload ALL the files below to the SAME place, at the top level of your site.

Pages: index.html, work.html, beat-lab.html, services.html, about.html, contact.html
Code: style.css, app.js
Images: pic.jpg, p1.jpg, p2.jpg, p3.jpg, p4.jpg, p5.jpg, og.jpg, favicon.png
Videos: v1.mp4, v2.mp4, v3.mp4, v4.mp4, v5.mp4

GitHub + Vercel
1. Unzip this file.
2. In your GitHub repository click Add file > Upload files.
3. Open the unzipped folder, select ALL files (Ctrl+A) and drag them in together.
4. Click Commit changes. Vercel redeploys by itself.

REVIEWS: the four reviews on the home page are SAMPLES. Open index.html, find
class="rcard", and replace the text and "Client name" with real client words.
Delete each <span class="smp">SAMPLE REVIEW</span> when the review is real.

LINK PREVIEW: og.jpg is the picture shown when the link is shared. Some apps need the full
web address. Open each .html file and change content="og.jpg" to
content="https://YOUR-SITE-ADDRESS/og.jpg" (use your real Vercel address).
WhatsApp may keep an old preview for a while. Share the link in a new chat to refresh it.
