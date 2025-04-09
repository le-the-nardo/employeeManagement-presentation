# 🖥️ Employee Management – Frontend

## 📖 Introduction

This is the **frontend** of the Employee Management System, built with **React + Vite** and styled using **CSS Modules**. It allows users to list, filter, create, delete, and view detailed information about employees.

> 👉 Full-stack version: [Backend Repository](https://github.com/le-the-nardo/employeeManagement)

## 🎥 Demo

<p align="center">
  <img src = "https://github.com/le-the-nardo/employeeManagement-presentation/src/assets/gif-presentation.gif" height="700">
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## 🚀 Features

- 🔍 **Live filtering** by employee name and department  
- ➕ **Modal form** to create new employees  
- 🗑️ Deletion with optimistic update  
- 📄 View details with route navigation  
- ✅ Protected requests using API Key  
- 🧹 Clean UI & reusable components  

## 🛠️ Tech Stack

- React (via Vite)  
- TypeScript  
- CSS Modules  
- React Router DOM  
- Fetch API  
- Vite Proxy (optional for backend integration)

## 🚀 Getting Started

### 🔧 Prerequisites

Ensure you have the following installed:

- NodeJs  → [Download](https://nodejs.org)
- Visual Studio Code (optional)

### 📦 Installation

Clone the repository:

```sh
git clone https://github.com/le-the-nardo/employeeManagement-presentation
cd employeeManagement-presentation
```

### ▶️ Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 📂 Project Structure

```
📦 EmployeeManagement-Presentation/
📂 public/
📂 src/
┣ 📂 components/
┃ ┣ EmployeeCard/
┃ ┣  NewEmployeeForm/
┃ ┗  Header.tsx
┣ 📂 data/
┣ 📂 pages/
┃ ┣ Home.tsx
┃ ┗ EmployeeDetails.tsx
┣ 📂 routes/
┃ ┗ AppRoutes.tsx
┣ App.tsx
┣ main.tsx
┗ index.tsx
```

## 🔐 API Authentication

- All HTTP requests include an **API Key** in the headers

## 💡 What Sets This Apart

- Built from scratch with scalability in mind
- Modular architecture and reusable components
- Proactively added filtering and search functionality
- Easy-to-read and maintain codebase

## 🧑‍💻 Author

- Developed with ❤️ and ☕ by **Leonardo Gomes**
- 💼 Senior Software Engineer from Brazil 🇧🇷

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

