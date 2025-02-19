# 🚴 Bikeshop Project

# ALERT!!
The seeder script populates the database during application initialization but does not account for prohibited combinations, as this improvement was not within the original scope.
So original bicycles may load with a prohibited combination

## 📌 Project Overview
Bikeshop is a full-stack web application designed for managing bike sales and inventory. It consists of a **frontend** (React using Vite) and a **backend** (Python with Flask), both containerized with Docker and managed using Docker Compose. The database used is **SQLite** for simplicity and ease of setup.

## 🏗️ Project Structure
```
bikeshop/  
├── backend/  
│   ├── Dockerfile  
│   ├── app/  
│   ├── models/  
│   ├── routes/  
│   ├── service/  
│   ├── formatter/  
│   ├── seeder/  
│   ├── requirements.txt  
│   └── run.py  
├── frontend/  
│   ├── Dockerfile  
│   ├── src/  
│   ├── package.json  
│   └── vite.config.js  
├── docker-compose.yml  
└── README.md  
```

## 🚀 Getting Started

### 1️⃣ Prerequisites
Ensure you have the following installed:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/jlucena97/bicycleshop
cd bicycleshop
```

### 3️⃣ Running the Application
To start both backend and frontend, run:
```sh
docker-compose up --build
```
This will:
- Start the **backend** API server.
- Start the **frontend** application.

Once running, access:
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000`

### 4️⃣ Stopping the Application
```sh
docker-compose down
```

## 🛠️ Development & Customization

### Running Backend Locally
```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```
Backend should be available at `http://localhost:5000`

### Running Frontend Locally
```sh
cd frontend
npm install
npm run dev
```
Frontend should be available at `http://localhost:5173`
```

## 🔍 Decisions & Trade-offs
During development, we had to make several decisions and trade-offs:
- **Backend Folder Structure:** The backend is structured into 4 main folders: `models`, `routes`, `service`, and `formatter`. Additionally, a `seeder` folder was created to hold scripts for populating the database.
- **Backend Model Structure:** The project includes 5 model files: `bicycle.py`, `custom_bicycle.py`, `product.py`, `user.py`, and `purchase.py`. Each file, except `purchase.py`, contains two related classes.
  - **Example:** The `user.py` file contains both the `User` class and the `UserCart` class, allowing for better data organization and relationship management.
- **Frontend Folder Structure:** The frontend is composed of 6 component folders: `admin`, `bicycle`, `login`, `menu`, and `user`.
- **Frontend Types:** Four type files were created to store all necessary interfaces, primarily related to bicycles and products, but also including an error and login interface.
- **Framework Choice:** React was chosen for the frontend due to its larger ecosystem and better community support.
- **Backend Framework:** Flask was chosen for its simplicity and ease of integration with SQLite.
- **Database Selection:** SQLite was chosen due to its lightweight nature, making it ideal for small-scale applications and local development.
- **Dockerization:** Dockerization was implemented at the end to allow the easy local installation of the project

## 🏆 Challenges Solved

Another significant challenge was designing a **scalable application** that could easily adapt to future sports in the shop. To address this, we created the **Purchase** class, which links the `UserCart` class to a purchase without restricting it strictly to bicycles.

A challenge was coming up with the idea of implementing **two bicycle models**: `bicycle.py` and `custom_bicycle.py`. This was done to ensure that any modifications a user makes to a bicycle would not impact other users' experiences. By creating a specific **Custom Bicycle** for each user, we maintained the integrity of the main bicycle data used by the admin manager.

Another challenge was implementing **isolation between the main models**. We have:
- **Bicycle** (with bicycle parts)
- **Custom Bicycle** (with custom bicycle parts)
- **Product** (with product parts)
- **User** (with User Cart)
- **Purchase**

Each of these models is related in some way but remains independently manageable, ensuring modularity and maintainability in the system.

## 🔄 Backend Logic
- The logic is divided mainly between **bicycles** and **products**.
- **Bicycles** are split into:
  - **Bicycles (shop-owned)** and **Custom Bicycles (user-owned)**, both manage all the bicycles logic [create, delete, update, get]
  - **Custom Bicycle** is a clone of **Bicycle**, allowing tracking of changes between the main bicycle and the customized version.
  - **Bicycle Parts** and **Custom Bicycle Parts** contain relationships with different products in stock.
- **Product** manages independent stock logic, serving as an inventory for bicycles and other items. Product logic manage the create, update, delete and get of each product and their products options
- **User logic** is minimal (simple login and user cart management), allowing users to save custom bicycles.

## 💻 Frontend Logic
- The main logic is within the `bicycle` and `admin` component folders.
- **Bicycle Folder:**
  - `BicyclePage`, `BicycleList`, and `BicycleDetail` components handle customer-facing interactions.
  - `BicycleDetail` manages **prohibited combinations** to prevent invalid customizations.
- **Admin Folder:**
  - Divided into **Bicycle** and **Product** sections.
  - **Bicycle Admin:**
    - `CreateBicycle` for creating and updating bicycles.
    - `ListBicyclePage` for listing and modifying existing bicycles.
  - **Product Admin:**
    - `CreateProduct` for managing products and options.
    - `ListProductPage` for listing all products and their configurations.
- **App.tsx** contains the Router and the main menu.

