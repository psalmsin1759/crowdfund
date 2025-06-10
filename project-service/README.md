#  Project Service

The **Project Service** is a core part of the Crowdfunding Microservice Architecture. It manages all project-related data including creation, updates, funding progress, and deletion. It also listens to RabbitMQ events to update funding information in real-time.

---

##  Features

- Create, retrieve, update, and delete projects
- Real-time `fundedAmount` updates via RabbitMQ
- Swagger (OpenAPI) documentation
- MongoDB integration via Mongoose
- Extensible architecture for multiple listeners

---

##  Technologies

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- RabbitMQ
- Swagger (OpenAPI)

---

##  Environment Variables

Create a `.env` file in the root of the service with the following:

```bash
PORT=3002
MONGODB_URI=mongodb://localhost:27017/crowdfunding
RABBITMQ_URL=amqp://localhost

```

### API Endpoints

All endpoints are prefixed with /api/projects.


| Method | Endpoint | Description          |
| ------ | -------- | -------------------- |
| POST   | `/`      | Create a new project |
| GET    | `/`      | Get all projects     |
| GET    | `/:id`   | Get project by ID    |
| PUT    | `/:id`   | Update a project     |
| DELETE | `/:id`   | Delete a project     |


## RabbitMQ Listeners

project.funding - Listens for funding events to update fundedAmount and backersCount

Message format:

```bash
{
  "projectId": "string",
  "amount": 100
}

```

### Running Locally

```bash
npm install

npm run dev

```

### Swagger UI
Swagger docs available at:
```bash
http://localhost:<PORT>/api-docs

```

![System Design](/screenshoots/projectdoc.png)


### Project Object
```bash
{
  "title": "Abuja building Project",
  "description": "Premium estate",
  "category": "Semi detached",
  "targetAmount": 50000,
  "deadline": "2025-12-31T00:00:00Z",
  "creatorId": "user_123",
  "images": ["url1", "url2"],
  "video": "video_url",
  "featured": true,
  "tags": ["water", "clean energy"]
}

```