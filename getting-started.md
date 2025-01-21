# GETTING STARTED

**Steps to start the Project:**

**Download or clone the repository from the github.**

---
### Environment Variables

You need to configure the following environment variables in a `.env` or `.env.local` file refer to the [`.env.example`](.env.example) file for all the environment variables.

---
### PREREQUISITES

Before you start,you need to have Docker and Docker Compose installed in your local machine:

- **Docker**: [Download Docker](https://docs.docker.com/get-started/)
- **Docker Compose**: [Docker Compose Documentation](https://docs.docker.com/compose/gettingstarted/)

Make sure Docker is running before proceeding.

1. Building the docker image
To build the Docker image, run the following command from the root of the project:
```bash
docker-compose build
```
2. Running the project
To start the application and all its services:
```bash
docker-compose up
```
**OR**
```bash
docker-compose up -d
```
**OR**
```bash
docker compose watch #recommended
```
3. To stop the containers:
```bash
docker-compose down
```
4. Accessing logs
```bash
docker-compose logs
## for real-time logs
docker-compose logs -f
```
5. To stop or restarting the containers:
```bash
docker-compose down
```
```bash
docker-compose restart
```
