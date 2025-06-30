# ConnectME: WhatsApp Clone with Voice & Video Calls 📞💬

---

**ConnectME** is a full-featured WhatsApp clone that goes beyond basic messaging, incorporating robust real-time voice and video call functionality. It's built with a modern, scalable tech stack, providing a rich communication experience.

## ✨ Features

* **Real-time Chat:** Instant messaging with individual and group chats.
* **Voice Call Functionality:** Seamless voice conversations.
* **Video Call Functionality:** High-quality video calls between users.
* **User Authentication:** Secure login and registration.
* **Contact Management:** (If applicable) Add and manage contacts.
* **Message Status:** (Read, Delivered, Sent indicators)
* **Responsive UI:** Designed for a consistent experience across devices.

## 🚀 Tech Stack

* **Frontend:** Next.js, React
* **Real-time Communication:** Socket.io
* **Backend:** Node.js (with Express)
* **Database:** PostgreSQL (managed with Prisma)
* **Storage:** Firebase (for media/files)
* **Styling:** Tailwind CSS

## ⚙️ Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/RaviRafaliya11/connectme.git](https://github.com/RaviRafaliya11/connectme.git)
    cd connectme
    ```
2.  **Install dependencies (client & server):**
    ```bash
    npm install # in the root directory
    cd server # assuming a separate server folder
    npm install
    cd ../
    ```
3.  **Database Setup:**
    * Set up a PostgreSQL database.
    * Configure your database URL in a `.env.local` file (for Next.js) and a `.env` file (for Node.js server).
    * Run Prisma migrations: `npx prisma migrate dev`
4.  **Firebase Setup:**
    * Configure Firebase credentials in your `.env.local` for client-side interactions.
5.  **Run the application:**
    ```bash
    # Start the server (in a separate terminal)
    cd server
    npm start # or node index.js
    
    # Start the Next.js client
    cd ../
    npm run dev
    ```
    Access the application at `http://localhost:3000`.

---
