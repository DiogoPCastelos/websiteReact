# **Diogo Piteira Castelos - Portfolio Website** 🚀

This is my **personal portfolio website** built with **React, Vite, and TailwindCSS**. It showcases my **projects, experience, and contact information** in a **modern, Apple-inspired UI** with smooth animations, a clean design, and an interactive experience.

---

## **🌟 Features**

- 🖥 **Sleek, Apple-like UI** with **glassmorphism, soft transitions, and refined typography**
- 🔥 **Optimized performance** with **Vite** for fast builds and smooth navigation
- 🎭 **Framer Motion animations** for a polished feel and dynamic interactions
- 🛠 **Expandable, animated project cards** with a **delay-based reveal system**
- 📨 **Collapsible contact form** with **email integration via EmailJS**
- 🏗 **Fully responsive layout** for a seamless experience on all devices
- 🎨 **Minimalist yet functional design**, focusing on **clarity and usability**

---

## **📂 Tech Stack**

| Technology        | Purpose                                    |
| ----------------- | ------------------------------------------ |
| **React.js**      | Core framework for building the UI         |
| **Vite**          | Fast build tool for optimized performance  |
| **TailwindCSS**   | Utility-first CSS framework for styling    |
| **Framer Motion** | Smooth animations and transitions          |
| **EmailJS**       | Handles form submissions without a backend |

---

## **🚀 Setup & Installation**

1️⃣ **Clone the repository**

```bash
git clone https://github.com/DiogoPCastelos/websiteReact.git
cd websiteReact
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Set up environment variables**  
Create a `.env` file in the root directory and configure your EmailJS credentials:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id
```

4️⃣ **Run the development server**

```bash
npm run dev
```

Visit `http://localhost:5173/` to view the website.

---

## **📜 File Structure**

```
/websiteReact
│── /public             # Static assets (images, favicons, etc.)
│── /src
│   ├── /components     # Reusable components
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Projects.jsx
│   │   ├── TechStack.jsx
│   ├── /constants      # Constants & project data
│   │   ├── constants.js
│   ├── /styles         # CSS and Tailwind configuration
│   ├── App.jsx         # Root component
│   ├── index.jsx       # Entry point
│── .gitignore
│── package.json
│── vite.config.js
│── README.md
```

---

## **🛠 Deployment**

This project is deployed using **GitHub Pages**.  
For **GH Pages**:

```
/websiteReact
│── package.json
```

```
  "homepage": "[websiteWhereItRuns]",
```

```
/websiteReact
│── package.json
```

```
    base: "/websiteReact/",
```

```bash
npm run deploy
```

---

## **👤 Author**

👨‍💻 **Diogo Piteira Castelos**  
📍 **Lisbon, Portugal 🇵🇹** | **Computer Engineering Student** | **Full-Stack Developer**
🔗 [LinkedIn](https://www.linkedin.com/in/diogopcastelos/) | [GitHub](https://github.com/DiogoPCastelos) | [Website](https://diogopcastelos.pt)

---

## **📜 [License](./LICENSE)**

This project is licensed under the **Creative Commons BY-NC-SA 4.0**.  
You may remix, adapt, and build upon this work **non-commercially**, as long as you **credit the author** and **license your new creations under the identical terms**.

🔗 **[CC BY-NC-SA 4.0 License](https://creativecommons.org/licenses/by-nc-sa/4.0/)**

---

## **⭐ Support the Project**

If you like this project, consider **starring** ⭐ it on GitHub or **sharing it**!  
Happy coding! 🚀
