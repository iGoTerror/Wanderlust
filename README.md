#  Wanderlust
Airbnb clone



An **Airbnb‑style lodging marketplace** built with the MERN‑style stack (Node.js, Express, MongoDB, EJS) and deployed on Render.

 <a href = "https://wanderlust-u41t.onrender.com/listings ">Wanderlust</a>

---

##  Features
- **Listings CRUD** – create, view, edit, delete stays
- **Image uploads** with Cloudinary
- **User authentication** – register / login / sessions
- **Reviews & ratings** – leave feedback for any listing
- **Responsive UI** – Bootstrap 5 + custom CSS
- **Server‑side validation** – Joi schemas
- **GeoJSON & Mapbox** integration for locations
- **Flash messages** for UX feedback
- **Production ready** – uses `process.env.PORT`, helmet, mongo‑sanitizer, etc.

---

## 🖥️ Tech Stack
| Layer            | Tech                               |
|------------------|------------------------------------|
| **Backend**      | Node.js · Express.js               |
| **Templating**   | EJS + EJS‑Mate                     |
| **Database**     | MongoDB · Mongoose                 |
| **Auth**         | Passport.js (LocalStrategy)        |
| **File Storage** | Cloudinary                         |
| **Styling**      | Bootstrap 5 · Custom SCSS/CSS      |
| **Maps**         | Mapbox GL JS                       |
| **Deploy**       | Render (Web Service)               |

---

## 🚀 Quick Start

### 1. Clone & install
```bash
git clone https://github.com/iGoTerror/Wanderlust.git
cd Wanderlust
npm install
