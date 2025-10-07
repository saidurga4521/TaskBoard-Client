# TaskBoard –Project & Task Management App     [![Live Demo](https://img.shields.io/badge/View_App-000?style=for-the-badge&logo=vercel&logoColor=white)](https://edviron-frontend-7rel.vercel.app/)




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
### CreatePayment
```
- The Create Payment page allows admins to initiate fee payment requests for students.

- Admin selects the student info, enters payment details, and sends a request.

- The system generates a payment link and records the transaction.
- This makes it easy for schools to collect fees digitally instead of handling manual payments.
```
### CheckStatus.jsx
```
- The Check Status page lets users track the status of payment requests.

- Shows whether a payment is Pending, Successful, or Failed.

- Provides transaction details for transparency.
- Parents and admins can quickly verify payment progress without confusion or delays.
```
### Dashboard.jsx

- The Dashboard acts as the control center for trustees

``` 
   Total transactions

   Successful, pending, failed payments

   Total collected amount 
```
- Provides a quick overview of financial performance.
- This helps schools monitor revenue and payment health at a glance.

### SchoolTransactions.jsx
```
- The School Transactions page lists all transactions for a specific school.

- Supports search and filtering by student, date, or payment status.

- Allows admins/trustees to drill down into transaction history for each school.
- Ensures clear tracking of fees collected per institution, making audits and reports easy.
```

## Scope and Extension

- While Paysphere already covers core payment and school management features, there is plenty of room to scale and enhance the platform in the future:

### Multi-Currency & International Payments
```
- Expand beyond INR and enable payments in multiple currencies - - - (USD, EUR, etc.), along with real-time conversion. 
This would make the platform usable for international schools.
```
### Notifications & Reminders
```
- Integrate email, SMS, or push notifications to remind parents about pending payments and confirm successful transactions, improving communication and reducing defaults.
```
### Advanced Analytics Dashboard
```
-Introduce a visual analytics dashboard with charts and graphs that highlight fee collection trends, payment delays, and school-wise performance insights.
```
### Role-based Dashboards

```
- Enhance role management with separate dashboards for trustees, school admins, and parents/students, ensuring tailored access to only relevant data and actions.
```
