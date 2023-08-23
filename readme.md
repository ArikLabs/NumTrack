# Number Tracker

Application uses a Redis cache to store information about a counter and its change history. This data is retained for one minute. When a user requests the counter's state, the application first checks the Redis cache for up-to-date information. If the data is present and not expired, it's returned to the user.

The counter is reset to zero every minute. After the reset, the current counter state is stored in a PostgreSQL database, alongside relevant details like the timestamp of the change. If the counter is zero, no data is recorded in the database.

This approach ensures quick access to current data through Redis caching while also maintaining a record of changes for analysis and future use. The Docker Compose setup facilitates the deployment and management of the entire application, allowing seamless interaction between different components.



## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. **Clone the Repository:** Clone this repository to a directory on your machine.

2. **Navigate to the Project Directory:** Open a terminal and navigate to the root directory of the project.

3. **Configure Environment Variables:**

    - Open the `backend/.env` file and set the necessary environment variables for your backend configuration. Modify them as needed.
    - Make sure your frontend and backend applications are set to use the provided environment variables for communication.

4. **Run the Project:**

   Run the following command to start the project:

   ```sh
   docker-compose up

5. **Access to the project:**

    - Frontend: http://localhost:5173/
    - Backend: http://localhost:8302
    - redis: redis://redis:6379
    - postgres:
      - credentials: in `backend/.env` file
   
6. **Credentials to access for using app**
     - `backend/src/constants/users.ts` file

