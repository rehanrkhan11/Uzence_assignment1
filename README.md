

# 📘 React Component Assignment

This project is a **React-based frontend assignment** built with a focus on reusability, clean folder structure, theming (light/dark mode), and component-driven development.

It demonstrates:

* 🔐 **Login Page** with password toggle
* 🎨 **Dark/Light Theme Toggle**
* 👤 **User Management UI** (add/search users)
* 📑 **Storybook Integration** for isolated component previews
* ✅ **Unit Tests** for components

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/uzence_assignment.git
cd uzence_assignment-master
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm start
```

App will run on: **[http://localhost:3000](http://localhost:3000)**

---

## 🧩 Folder Structure

```
src/
├── components/
│   ├── DataTable/        # User table with search & selection
│   ├── InputField/       # Reusable input component
│   ├── ThemeToggle/      # Light/Dark mode toggle
│   └── UserTable.js
│
├── pages/
│   ├── AssignmentPage.js # Main assignment page
│   └── LoginPage.js      # Login UI
│
├── App.tsx               # Root component
├── index.tsx             # Entry point
└── styles (App.css, index.css)
```

---

## 📖 Storybook

This project uses **Storybook** to develop and showcase components in isolation.

### Run Storybook locally:

```bash
npm run storybook
```

### Deployed Preview:

👉 [Storybook Preview Link](https://your-chromatic-or-vercel-link.com)
*(Deployed with Chromatic/Vercel)*

---

## 🎥 Screenshots

### 🔑 Login Page (Dark Mode with Toggle)

![Login Page](./docs/screenshots/login-dark.png)

### 🌗 Login Page (Light Mode)

![Login Page Light](./docs/screenshots/login-light.png)

### 👤 Assignment Page – User Table & Password Toggle (Visible)

![User Table Password Visible](./docs/screenshots/user-table-visible.png)

### 👤 Assignment Page – User Table & Password Toggle (Hidden)

![User Table Password Hidden](./docs/screenshots/user-table-hidden.png)

---

## 🛠️ Approach

1. **Component-driven development**

   * Each feature (Input, DataTable, ThemeToggle) is modular & reusable.

2. **Dark/Light Theme**

   * Global theme state toggled via ThemeToggle component.

3. **Password Toggle**

   * Eye icon to switch between masked/unmasked password.

4. **User Table**

   * Mock data with Alice/Bob.
   * Search by name/email.

5. **Storybook + Tests**

   * `.stories.tsx` for each component.
   * Basic unit tests with React Testing Library.

---

## ✅ Features

* 👤 Add/search users
* 🔍 User filtering
* 🔐 Password input with toggle
* 🌗 Dark/Light mode
* 📚 Storybook integration
* 🧪 Component tests

---
## Screen shots
<img width="1606" height="858" alt="Screenshot 2025-08-18 194106" src="https://github.com/user-attachments/assets/61ceb20a-4b76-4e17-84dd-06b28a54a7e8" />
<img width="1229" height="789" alt="Screenshot 2025-08-19 125501" src="https://github.com/user-attachments/assets/f0b5822f-1ca8-46f0-a132-d894d4cd948c" />


## 📦 Tech Stack

* **React + TypeScript** ⚛️
* **Tailwind CSS** 🎨
* **Storybook** 📖
* **React Testing Library + Jest** 🧪

---

## 👨‍💻 Author

**Rehan Raza Khan**
📍 B.Tech CSE, Galgotias University
📧 [rehan@example.com](mailto:rehan@example.com)

---

3. Commit + push them along with this README.

---

Do you also want me to **write the GitHub commit commands step-by-step** so you can upload README + screenshots in one go?
