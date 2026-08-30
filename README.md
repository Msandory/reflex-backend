# 🚚 Reflex Delivery System

Hey there! Welcome to the Reflex Delivery System. 

Reflex is a complete, real-time logistics platform designed to connect people who need things delivered with the people who deliver them. Think of it like a simplified version of Uber Eats or Amazon Logistics, but built entirely from scratch.

## 🌟 How it works

The system is broken down into three main dashboards, each designed for a specific person in the delivery pipeline:

### 1. The Retailer 
This is where it all starts. A retailer can open their dashboard, enter a customer's details (like name and location), and request an item to be delivered. Once they click "Dispatch", the package officially enters the system.

### 2. The Dispatcher 
The dispatcher is the mastermind overseeing the entire operation. They have a bird's-eye view of every single package in the system through a visual Kanban board. When a new request comes in, the dispatcher reviews it and assigns it to an available rider. 

### 3. The Rider 
The rider is out on the field. When the dispatcher assigns them a package, it instantly pops up on their screen. They can mark the package as "Picked Up" when they grab it, and once they reach the destination, they collect a digital signature and mark it as "Delivered". 

### 🎮 Rewards & Gamification
To keep riders motivated, we've built a rewards system directly into the app! Every time a rider successfully completes a delivery, they are rewarded with +50 points. They can see their total score growing on their dashboard in real-time, making the delivery process feel like a game.

---

## 🛠️ For Developers (How to run it locally)

If you're a developer or a grader looking to run this project on your own machine, everything is structured in a clean **Monorepo**. 

The project is neatly split into two halves:
* `/frontend` (The visual user interface)
* `/backend` (The server and database logic)

### Step 1: Start the Backend
1. Open your terminal and navigate into the backend folder:
   `cd backend`
2. Install all the necessary dependencies:
   `npm install`
3. Create a `.env` file inside the `backend` folder and add your PostgreSQL Database URL:
   `DATABASE_URL="postgres://your-database-url-here"`
4. Sync the database and start the server:
   `npx prisma db push`
   `npm run start:dev`

### Step 2: Start the Frontend
1. Open a *new* terminal window and navigate into the frontend folder:
   `cd frontend`
2. Install the frontend dependencies:
   `npm install`
3. Start the application:
   `npm run dev`

That's it! Open the local link provided by Vite, and you'll see the full system running in perfect harmony.
