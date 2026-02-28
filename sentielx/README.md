 # **HackDeScience · Ojass '26 — Problem 2: Code Quality Review**
## Team  Daydreams

<img width="1905" height="982" alt="image" src="https://github.com/user-attachments/assets/a148a9d1-bc61-4f84-8301-655a8b5d4bd4" /># 🌐 Frontend Demo UI

<img width="1914" height="981" alt="image" src="https://github.com/user-attachments/assets/20d7e11b-3b26-4f00-8493-0cf368231831" />
<img width="1918" height="977" alt="image" src="https://github.com/user-attachments/assets/44157261-1548-472a-987b-670368f91d9d" />
<img width="1176" height="874" alt="image" src="https://github.com/user-attachments/assets/9171381f-c3cf-4938-bf55-7b209eb8fc95" />




[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![npm package](https://img.shields.io/badge/npm-cigarette--daydreams--hackdescience--npm--package-red?logo=npm)](https://www.npmjs.com/package/cigarette-daydreams-hackdescience-npm-package)

A polished Next.js web interface for the `cigarette-daydreams-hackdescience-npm-package` code quality analyser. Paste or upload code, get an instant structured report with score badge, inline issue markers, and quality history graph — all in the browser.

---

## 🚀 Quick Start

```bash
# Clone and install
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
/
├── app/
│   ├── page.tsx          # Landing page (/)
│   ├── demo/
│   │   └── page.tsx      # Code analyser demo (/demo)
│   └── layout.tsx        # Root layout with Geist font
├── components/           # Reusable UI components
├── public/               # Static assets
└── package.json
```

---

## 🖥️ Pages

### `/` — Landing Page
Introduction to the package, feature overview, and a call-to-action to try the demo.

### `/demo` — Code Analyser
The main interactive interface:

- **Syntax-highlighted editor** — paste or upload any source file
- **Language auto-detection** — detected language shown with confidence %
- **One-click analysis** — powered by `cigarette-daydreams-hackdescience-npm-package`
- **Score badge** — 0–100 score with letter grade (A → F)
- **Inline issue markers** — bugs, security flags, lint warnings annotated on the code
- **Quality history graph** — score trend across multiple submissions in the session
- **Configurable weights** — adjust scoring formula weights via the UI
- **Downloadable JSON report** — export the full structured analysis

---

## 📦 npm Package Integration

This demo is a frontend for:

```
cigarette-daydreams-hackdescience-npm-package
```

> 📦 [npmjs.com/package/cigarette-daydreams-hackdescience-npm-package](https://www.npmjs.com/package/cigarette-daydreams-hackdescience-npm-package)
> 🐙 [github.com/ayushv-nitj/Cigarette-Daydreams-HackDeScience-npm-package](https://github.com/ayushv-nitj/Cigarette-Daydreams-HackDeScience-npm-package)

The analyser supports **6+ languages**: JavaScript, TypeScript, Python, Java, C, C++.

---

## 🛠️ Tech Stack

- **[Next.js 15](https://nextjs.org)** — React framework (App Router)
- **[TypeScript](https://www.typescriptlang.org)** — type-safe throughout
- **[Geist Font](https://vercel.com/font)** — via `next/font` auto-optimisation
- **[ace.js](https://ace.c9.io)** — syntax-highlighted code editor

---

## 🥚 Easter Eggs

Six hidden easter eggs are scattered across the app — all include a shout-out to **OJASS '26 · Hack de Science, NIT Jamshedpur**.

| # | Name | Trigger | Page |
|---|------|---------|------|
| 1 | **Konami Code** | `↑ ↑ ↓ ↓ ← → ← → B A` on keyboard | Both |
| 2 | **Logo Click × 5** | Click the navbar logo 5 times fast | `/` |
| 3 | **Console ASCII Art** | Open browser DevTools console | Both |
| 4 | **Golden Mode** | Type `ojass26` anywhere (not in an input field) | `/` |
| 5 | **Hidden Pixel** | Click the invisible 4×4 px area, bottom-right corner | `/` |
| 6 | **Perfect Score** | Type `ojass26` in the code editor → click Analyse | `/demo` |

### ✨ What Each Egg Does

| # | Trigger | Effect |
|---|---------|--------|
| 1 | Konami Code | 80-particle explosion + full-screen OJASS '26 rainbow modal |
| 2 | Logo × 5 | Progress dots appear → gold toast slides in |
| 3 | Console Art | OJASS ASCII banner + hints for all other eggs printed to console |
| 4 | Golden Mode | Entire site turns gold — stars, grid, and all accents |
| 5 | Hidden Pixel | Secret modal with quote & OJASS dedication message |
| 6 | Perfect Score | Language becomes **OjassScript**, score locks to **100/100 A+** |

---


## ✨ Features Implemented

### 1. **Language Detection & Routing** ✅
- Auto-detects language from file extension and syntax
- Supports **6+ languages**: JavaScript, TypeScript, Python, Java, C, C++
- Routes to appropriate parser and analyzer for each language
- Confidence scoring for detected language

### 2. **Bug & Lint Detection** ✅
- Null/undefined dereference detection
- Unused variables and shadowed declarations
- Off-by-one errors in loops and array access
- Type coercion issues and implicit conversions
- Unreachable code detection
- Missing break statements in switch cases
- Each issue includes: file, line, column, severity, and fix suggestion

### 3. **Security Analysis** ✅
- **SQL Injection** detection (parameterized query enforcement)
- **XSS (Cross-Site Scripting)** vulnerabilities
- **Hardcoded secrets/API keys** detection
- **Command injection** patterns (eval, exec, shell commands)
- **Path traversal** vulnerabilities
- **Unsafe dependency versions** (OSV/CVE cross-reference)
- Offline vulnerability database with fallback to live CVE/OSV feed
- Severity levels: low, medium, high, critical

### 4. **Complexity & Redundancy Analysis** ✅
- **Cyclomatic complexity** per-function calculation
- Detects functions exceeding configurable threshold (default: 50 lines)
- Identifies deeply nested code (>3 levels)
- **Code duplication detection** (AST fingerprinting)
- **Dead code** and unreachable block identification
- Suggests refactoring opportunities

### 5. **Auto-Formatting & Diff** ✅
- Non-destructive code formatting (does not modify original)
- Consistent indentation, bracket placement, line breaks
- Format-specific handlers for JavaScript, Python, Java, C/C++
- **Unified diff** showing original vs. formatted version
- Preserves program logic and semantics

### 6. **Configurable Scoring Formula** ✅
```
Score = 100 - (wbug·Pbug + wsec·Psec + wcpx·Pcpx + wred·Pred + wfmt·Pfmt)
```
- Weights customizable via `config()` method
- Weights must sum to 1
- Per-category penalty scores
- Letter grade assignment (A, B, C, D, F)

### 7. **Plugin/Extension API** ✅
- `reviewer.use(plugin)` system for registering custom rules
- Built-in rules implemented as plugins internally
- Plugins can define detection logic, severity, remediation
- Documented plugin interface in README

### 8. **Quality History & Diff Tracking** ✅
- `reviewer.diff()` returns delta report
- Shows issues introduced, resolved, unchanged across versions
- Score delta tracking
- Quality trend analysis via multiple submissions

### 9. **Cross-File & Project-Level Analysis** ✅
- Detects circular dependencies between modules
- Flags unused exports across files
- Project-wide redundancy detection
- Structural issue reporting (high-severity)
- Only flags unused exports if unused across entire codebase

### 10. **Package API Quality** ✅
- Clean, intuitive API (analyze, analyzeFile, diff, config)
- Type definitions included (TypeScript support)
- Promises/async-await fully supported
- Error handling with descriptive messages

---

## ❌ Features NOT Implemented

### 1. **Watch Mode** ❌
- CLI flag `--watch` is NOT implemented
- Re-analysis on file save not supported
- Real-time monitoring of source directory not available
- **Workaround:** Run analysis manually as part of CI/CD pipeline

### 2. **Live Feedback** ❌
- WebSocket-based real-time result updates NOT implemented
- Live dashboard refresh NOT available
- **Workaround:** Web demo accepts paste-or-upload input; refresh manually

### 3. **AI-Assisted Fix Suggestions** ⚠️ **Custom Implementation**
- Fix suggestions are generated using **custom code-based logic**, not LLM API
- Heuristic pattern matching for common issues (SQL injection, XSS, null checks, etc.)
- Rule-based fix templates rather than ML-generated suggestions
- No dependency on external LLM APIs (OpenAI, Gemini, etc.)
- Suggestions are deterministic and offline

---
## 🏗️ Build & Deploy

**Production build:**

```bash
npm run build
npm start
```

**Deploy on Vercel** (recommended — zero config):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app)

See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for other platforms.

---

## 📄 License

ISC

---

Built with 💙 by **Team Cigarette Daydreams** · OJASS '26 · Hack de Science · NIT Jamshedpur
