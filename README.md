# 🧩 DevKit - Modular React Tab App

Hi! This is a tab-based modular React application I built to dynamically load and manage multiple apps inside a single interface. The architecture is designed to be plug-and-play, so I can easily add or remove apps without touching the core logic.

👉 **[Experience it live at devkit.surge.sh](http://devkit.surge.sh)**

## 🚀 What I Built

* 🧠 **Dynamic App Loading** using `React.lazy` and `Suspense`
* 🗂️ **Tabbed Interface** that supports multiple open apps
* 💾 **Persistent Tabs** with `localStorage` so open tabs stick around after refresh
* 🧱 **Modular Architecture** so adding a new app is just a few lines of code
* 🌐 **Tile-Based App Selector** with support for external links

## 📂 Project Structure

Here's how I organized the project:

```
src/
├── App.js               # Main application logic and routing
├── App.css              # Styles for layout and UI
├── Components/
│   ├── Header/          # Tab bar at the top
│   ├── Footer/          # Footer showing active tab title
├── Utils/
│   ├── constants.js     # App definitions and initial tab state
│   ├── utility.js       # Utility functions like app list generator
```

## 🧱 How It Works

### 🔄 Dynamic Component Loading

When I select a tile, the app component is loaded lazily using React’s `lazy()`:

```js
React.lazy(APPS[activeTab.appId].loader)
```

This means apps aren't loaded until I need them, keeping performance smooth.

### 🧭 Tab Management

I used React state and `localStorage` to manage the open tabs and which one is active:

```js
useEffect(() => {
  localStorage.setItem("tabs", JSON.stringify(tabs));
  localStorage.setItem("activeTabId", JSON.stringify(activeTabId));
}, [tabs, activeTabId]);
```

Tabs persist across browser refreshes.

### 🧩 App Selector

The tile interface lets me pick from a list of available apps or links. If the tile includes a URL, it opens in a new tab; otherwise, it loads inside the interface.

## 💻 Try It Yourself

### 1. Clone the repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

Or skip all that and visit: **[http://devkit.surge.sh](http://devkit.surge.sh)**

## ✍️ Adding a New App

To plug in a new app:

1. Register it in `Utils/constants.js`:

```js
export const APPS = {
  myApp: {
    name: "My App",
    loader: () => import("../Apps/MyApp"),
    icon: "path-to-icon",
  },
  ...
};
```

2. Add it to the app list in `getAppList()` in `utility.js`.

That’s it — it’ll show up as a tile automatically!

## 🛠️ Tech Stack

* React
* React Lazy & Suspense
* Local Storage
* Surge (for deployment)

## 📄 License

MIT — feel free to use, modify, and share.