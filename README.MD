# 🧪 Playwright Demo Project

End-to-end test automation project built with Playwright code based approach.

---

## 📦 Setup

### 🔧 1. Install dependencies

```bash
npm install
```

> Includes:
> - @playwright/test
> - dotenv
---

## ▶️ Running Tests

### 🧪 Run all tests

```bash
npm test
```

👉 Runs all tests in **headless mode**

---

### 🎯 Run specific tests (by tags or test IDs)

All test scenarios tags are defined in `.spec.ts` files.

---

### 🔹 Run by tags

Example tags:
- `@apiTests` (all API tests - BE)
- `@frontEndTests` (all FE tests)
- `@locked_out_user` (run test suite for specified user)

Tags can be used also directly in GitHub pipeline. Go to "Actions" (upper menu bar) -> "Playwright Tests" (left menu) -> "Run Workflow" (workflow list right upper corner). 
To run all tests, keep the "Tag to run" field empty. Write a tag to run specific test "addToCart" or use combinations "addToCart|checkout"

```bash
npx playwright test --grep "frontEndTests"
```

👉 Headless mode

```bash
npx playwright test --grep "frontEndTests" --headed
```

👉 Headed mode

---

### 🔹 Combine tags

Combination of different tests (for BE and FE tests):

```bash
npx playwright test --grep "addToCart|checkout" 
```

Combination for a specific test with a specific user (only for FE tests):
```bash
npx playwright test --grep "(?=.*@problem_user)(?=.*@listing)"  
```

---

## 🧰 Debugging & Tools

### 🐞 Debug mode

```bash
npx playwright test --grep "checkout" --debug
```

---

### 🖥️ Playwright UI runner

```bash
npx playwright test --ui
```

---

## 🚀 Tech Stack

- Playwright
- TypeScript

---

## 📌 Project Purpose

This project demonstrates:
- simple FE and API demo test suites
- clean Page Object Model design
- using reusable methods for FE and BE tests (api clients)
- flexible test data handling