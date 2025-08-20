Here’s the updated README.md to reflect that:

# Pokémon API

A Node.js + Express API for managing Pokémon records with MongoDB as the database.  
Supports **CRUD operations**, image uploads, and **idempotent POST requests** using the `Idempotency-Key` header.  

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd <your-repo-folder>

2. Install dependencies
npm install

3. Setup environment variables

Create a .env file in the project root with the following:

MONGODB_URI=your-mongodb-connection-string

4. Run the project
npm run dev


The server will start (default: http://localhost:3000).

🔑 Idempotent POST Requests

All POST /api/pokemons requests must include an Idempotency-Key header.
This ensures duplicate requests with the same key are processed only once.

📡 API Endpoints

Base prefix: /api/pokemons

Method	Endpoint	Description	Middleware
GET	/by-name/:name	Get a Pokémon by name	validator.validateGetByName
POST	/	Create a new Pokémon	upload.single('image'), validator.validateCreate
PUT	/:id	Update a Pokémon	upload.single('image'), validator.validateUpdate
DELETE	/:id	Delete a Pokémon	validator.validateGetById
📦 Request Payloads
➕ Create Pokémon

POST /api/pokemons
Headers:

Content-Type: multipart/form-data

Idempotency-Key: <unique-key>

Body (form-data):

Field	Type	Example
name	string	Squirtle Q
status	string	active
abilities	JSON string	[{"ability":"Razor Leaf","type":"grass","damage":85,"status":"active"}]
image	file	WIN_20230716_10_15_54_Pro.jpg

Example curl request:

curl -X POST http://localhost:3000/api/pokemons \
  -H "Idempotency-Key: unique-key-123" \
  -F "name=Squirtle Q" \
  -F "status=active" \
  -F 'abilities=[{"ability":"Razor Leaf","type":"grass","damage":85,"status":"active"}]' \
  -F "image=@WIN_20230716_10_15_54_Pro.jpg"

✏️ Update Pokémon

PUT /api/pokemons/:id
(Same body fields as Create, except Idempotency-Key not required.)

🛠 Tech Stack

Node.js + Express

MongoDB (Mongoose)

Multer for file uploads

Idempotency Middleware for safe POST requests

📜 License

MIT License


Would you like me to also add **example responses (JSON)** for each endpoint (GET, POST, PUT, DELETE) so devs can see exactly what comes back?

You said:
please provide a single file which i can copy
ChatGPT said:

Here’s the complete README.md content in one block so you can copy it directly into your project:

# Pokémon API

A Node.js + Express API for managing Pokémon records with MongoDB as the database.  
Supports **CRUD operations**, image uploads, and **idempotent POST requests** using the `Idempotency-Key` header.  

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd <your-repo-folder>

2. Install dependencies
npm install

3. Setup environment variables

Create a .env file in the project root with the following:

MONGODB_URI=your-mongodb-connection-string

4. Run the project
npm run dev


The server will start (default: http://localhost:3000).

🔑 Idempotent POST Requests

All POST /api/pokemons requests must include an Idempotency-Key header.
This ensures duplicate requests with the same key are processed only once.