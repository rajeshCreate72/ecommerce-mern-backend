# Backend for ecommerce application

## Getting Started

### Prerequisites

-   Node.js (>=16.x)
-   MongoDB (Atlas)
-   npm or yarn
-   Environment variables configured

### Installation

```bash
git clone https://github.com/rajeshCreate72/ecommerce-mern-backend.git
cd ecommerce-mern-backend
npm install
```

### Configuration

Create a `.env` file in the root directory:

```makefile
PORT=8000
DB_URI=mongodb+srv://<organisation>:<password>@cluster0.rykoz.mongodb.net/<database>?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=<Secrect_key>
```

### Run the application

```bash
npm run dev
```
