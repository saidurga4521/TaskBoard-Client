# TaskBoard –Project & Task Management App     [![Live Demo](https://img.shields.io/badge/View_App-000?style=for-the-badge&logo=vercel&logoColor=white)](https://task-board-server-l6b1.vercel.app/)




TaskBoard is a modern and responsive web application that helps users efficiently manage their projects and tasks in an organized way. Built using React, Tailwind CSS, and Framer Motion, it provides a clean and interactive UI for creating projects, adding tasks, and tracking progress across different stages — Todo, In Progress, and Done.

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express,MongoDB
## Installation

### 🚀 Project Setup

### Prerequisites
- Node.js
- npm 
- MongoDB
- React

### Install my-project with npm
#### Frontend
  - cd edupay
  - npm i
  - npm run dev

#### Backend
  - npm run dev
  - 
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
```
VITE_BASE_URL
```

## Screeshorts

### SignUp
<img width="1320" height="667" alt="Screenshot 2025-10-07 194410" src="https://github.com/user-attachments/assets/31d1d4ce-e82c-4b82-bb67-d1a283008028" />


### Login
<img width="788" height="707" alt="Screenshot 2025-10-07 194419" src="https://github.com/user-attachments/assets/47bde2f7-32b6-471f-84d7-a411cf62c06b" />


### Projects DashBoard
<img width="1916" height="829" alt="Screenshot 2025-10-07 194450" src="https://github.com/user-attachments/assets/4961bfb8-dd7c-4615-9877-ff6a1cb26d0c" />


### Task
<img width="1897" height="864" alt="Screenshot 2025-10-07 194507" src="https://github.com/user-attachments/assets/ee92d63e-08fa-4f7f-ac0d-ba0744f17bf6" />


### Add Task
<img width="626" height="491" alt="Screenshot 2025-10-07 194528" src="https://github.com/user-attachments/assets/a0898a4c-5217-462a-a7a5-3cc9d5787055" />


### Add project
<img width="1682" height="779" alt="Screenshot 2025-10-07 194543" src="https://github.com/user-attachments/assets/47a5d038-4ee7-4f21-8d27-a214f7fd5b39" />




## Functionalties

### Login
```
- The Login page provides secure authentication for users

- Uses JWT tokens for authentication and session management.

- Validates credentials and redirects users to the correct dashboard based on their role.
-  This ensures only authorized users can access the platform and gives each role a personalized experience.
```
### Projects DashBoard
```
- Displays all created projects in a clean and organized layout.

- Allows users to quickly view, open, or manage their projects.

- Shows an “Add Project” button when no projects are available.

- Provides easy navigation to view tasks within each project.
```
### Task Board
```
- Displays all tasks of a project categorized as Todo, In Progress, and Done.

- Allows users to add new tasks or delete the entire project easily.

- Helps in tracking the progress of each task visually.

- Provides a clean and responsive layout for better task management.
```
### Add Project
```
- Allows users to create a new project by entering a project name.

- Opens as a modal for a smooth and focused user experience.

- Includes a Create Project button to confirm and add the project.

- Designed with a clean, modern, and responsive UI using Tailwind CSS and Framer Motion.
```
### Add Task
```
- Opens as a modal where users can add a new task to a project.

- Contains input fields for Title, Description, and Status selection.

- Provides a Create Task button to confirm and add the task.

- Built with a responsive and modern UI using Tailwind CSS and Framer Motion for smooth animations.
```

## Scope and Extension

- TaskBoard covers core project and task management features, but there’s significant potential to scale and enhance the platform for Better results:

### Multi-User & Authentication
```
 - Implement user authentication and roles so multiple users can collaborate on projects, with permissions for project owners, team members, and viewers.

```
### Drag-and-Drop Task Management
```
- Enable drag-and-drop functionality to move tasks between Todo, In Progress, and Done columns for more interactive task management.

```
### Notifications & Reminders
```
- Integrate notifications to alert users about upcoming deadlines, task updates, or project changes to improve productivity and coordination.

```
### Advanced Analytics & Reporting

```
- Introduce dashboards and charts that visualize project progress, task completion rates, and workload distribution to help users track performance and plan better.

```
