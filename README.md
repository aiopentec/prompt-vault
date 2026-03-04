# ◈ PromptVault

> Battle-tested AI prompts for legal, finance, marketing, engineering and more.

**Live site:** `https://YOUR-USERNAME.github.io/prompt-vault/`

---

## 🚀 Deploy in 5 Minutes

### Step 1 — Create the GitHub repo

1. Go to [github.com/new](https://github.com/new)
2. Name it exactly: `prompt-vault`
3. Set to **Public**
4. Do NOT add README, .gitignore, or license (we have them)
5. Click **Create repository**

### Step 2 — Push this code

Open your terminal and run:

```bash
cd prompt-vault          # this folder
git init
git add .
git commit -m "feat: initial launch"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/prompt-vault.git
git push -u origin main
```

> Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Click Save

### Step 4 — Update the base URL

Open `vite.config.js` and confirm the base matches your repo name:

```js
base: '/prompt-vault/',
```

If you named your repo something different, update this value and push again.

### Step 5 — Watch it deploy

1. Click the **Actions** tab in your repo
2. You'll see a workflow running called "Deploy to GitHub Pages"
3. Wait ~60 seconds for it to complete
4. Your site is live at: `https://YOUR-USERNAME.github.io/prompt-vault/`

---

## 🛠 Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## 📁 Project Structure

```
prompt-vault/
├── src/
│   ├── App.jsx        ← Main site (edit prompts here)
│   └── main.jsx       ← React entry point
├── .github/
│   └── workflows/
│       └── deploy.yml ← Auto-deploy on push
├── index.html
├── vite.config.js     ← Update base path if needed
└── package.json
```

## ✏️ Adding Prompts

Edit the `prompts` array in `src/App.jsx`. Each prompt follows this shape:

```js
{
  id: 7,
  title: "Your Prompt Title",
  category: "Marketing",        // Legal | Research | Finance | Sales | Engineering | Marketing
  tier: "pro",                  // free | pro | enterprise
  description: "Short description shown on card.",
  tags: ["tag1", "tag2"],
  uses: 0,
  rating: 4.9,
  prompt: `Your full prompt text here.\n\nInput: [PLACEHOLDER]`
}
```

Save → push to main → auto-deploys in ~60 seconds.

---

## 💰 Connecting Payments (Gumroad)

1. Create a [Gumroad](https://gumroad.com) account (free)
2. Create a product for each tier ($29/mo Pro, $199/mo Enterprise)
3. Copy the product URLs
4. Replace the `#` in the pricing buttons in `App.jsx` with your Gumroad links

---

*Built with React + Vite. Zero ongoing costs.*
