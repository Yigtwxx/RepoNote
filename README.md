# RepoNote

RepoNote is a modern, microservices-based document management and version control system designed for seamless collaboration and efficient file handling. Built with a robust tech stack, it offers real-time editing, secure storage, and comprehensive version tracking.

## 🚀 Features

-   **Microservices Architecture**: scalable and modular design with separate services for Authentication, Documents, Comments, Versioning, and Storage.
-   **Secure Authentication**: JWT-based user authentication and management.
-   **Document Management**: Create, read, update, and delete documents with ease.
-   **Versioning System**: Track document history and revert to previous versions.
-   **Real-time Collaboration**: Commenting system for effective team communication.
-   **File Storage**: Integrated MinIO object storage for secure and scalable file management.
-   **Modern UI**: A sleek, responsive frontend built with React 19 and TailwindCSS.

## 🛠 Tech Stack

### Frontend
-   **Framework**: React 19
-   **Build Tool**: Vite
-   **Styling**: TailwindCSS v4, Framer Motion
-   **Icons**: Lucide React

### Backend
-   **Language**: Python
-   **Framework**: FastAPI (Microservices)
-   **Database**: PostgreSQL
-   **Object Storage**: MinIO

### DevOps & Infrastructure
-   **Containerization**: Docker
-   **Orchestration**: Docker Compose

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Yigtwxx/RepoNote.git
    cd RepoNote
    ```

2.  **Start the application**
    Make sure you have Docker and Docker Compose installed.
    ```bash
    docker-compose up --build
    ```

3.  **Access the application**
    -   Frontend: `http://localhost:3000`
    -   API Gateway/Services will be available on their respective ports defined in `docker-compose.yml`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.
