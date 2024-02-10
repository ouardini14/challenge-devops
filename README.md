# E-Books Platform

Welcome to the E-Books Platform README! This platform provides users with a user-friendly interface to access, download, read, and share their favorite e-books. It utilizes a combination of technologies including React, Redux, Tailwind CSS for the frontend, Express.js for the backend, and MongoDB for database storage. Additionally, the application is deployed on Vercel at [https://react-ebooks-app.vercel.app/](https://react-ebooks-app.vercel.app/).

## Features

- Access a vast collection of e-books
- Easy navigation and search functionality
- Download e-books for offline reading
- Share e-books with friends
- User authentication and authorization

## Technologies Used

- **Frontend**:
  - React.js: A JavaScript library for building user interfaces.
  - Redux: A predictable state container for managing application state.
  - Tailwind CSS: A utility-first CSS framework for rapid UI development.
- **Backend**:
  - Express.js: A web application framework for Node.js.
  - Firebase Cloud Storage: For hosting media.
  - MongoDB: A NoSQL database for storing e-book data.
- **Deployment**:
  - Vercel: Platform for hosting the frontend application.
  - Docker: Containerization for both frontend and backend applications.
  - Kubernetes: Orchestration tool for deploying and managing containerized applications.
- **CI/CD**:
  - GitHub Actions: Automate CI/CD pipelines triggered by code changes.

## Deployment

### Local Deployment

To deploy the application locally, you can use Docker and Docker Compose.

#### Steps:

1. Clone the repository:
```
git clone https://github.com/ouardini14/challenge-devops.git
```


2. Navigate to the project directory:
```
cd project-directory
```

3. Build and run Docker containers:
```
docker-compose up --build
```


4. Access the application in your browser at [http://localhost:3000](http://localhost:3000).

### Kubernetes Deployment

To deploy the application to a Kubernetes cluster, ensure you have `kubectl` installed and configured to access your cluster.


#### Steps:

1. Clone the repository:
```
git clone https://github.com/ouardini14/challenge-devops.git
```


2. Navigate to the project directory:

```
cd project-directory
```

3. Build and run Docker containers:

```
docker-compose up --build
```

4. Access the application in your browser at [http://localhost:3000](http://localhost:300).

### Kubernetes Deployment

To deploy the application to a Kubernetes cluster, ensure you have `kubectl` installed and configured to access your cluster.

#### Steps:

1. Apply Kubernetes manifests:

```
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
```

2. Verify the deployment:

```
kubectl get pods
kubectl get services
```

3. Access the application using the provided service URL.

## CI/CD Pipeline

The CI/CD pipeline is set up using GitHub Actions. Upon code changes, the pipeline is automatically triggered to build, test.


---

Thank you for using the E-Books Platform! If you have any questions or feedback, please don't hesitate to reach out.