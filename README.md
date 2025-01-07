# Wookielink

## Introduction

Welcome to the **Wookielink**, a personalized landing page builder that empowers users to showcase all their important links—from social media profiles to websites—in one beautiful, easy-to-manage page. This project is not just a simple clone; it’s built with scalability, maintainability, and clean architecture at its core, utilizing cutting-edge web technologies to ensure seamless user experiences and smooth deployments.

## Tech Stack

- **Next.js**: A powerful React framework for building fast, server-rendered applications.
- **TypeScript**: Enhances code quality with static types, improving maintainability and catching errors early.
- **Redux Toolkit**: Streamlines state management for predictable and testable application behavior.
- **Prisma**: A modern ORM that simplifies database interactions and migrations.
- **NextAuth**: Provides secure authentication, including Google OAuth for effortless user sign-up and login.
- **InversifyJS**: Implements Inversion of Control (IoC) to keep components decoupled and test-friendly.
- **Tailwind CSS**: Speeds up UI development with a utility-first approach.
- **Shadcn**: A collection of Tailwind CSS UI components that deliver fast, responsive designs.
- **Jest**: Ensures reliability and confidence with comprehensive unit testing.

## Clean Architecture

The project adheres to **Clean Architecture** principles, promoting a clear separation of concerns for easy scaling and testing. The architecture is divided into four distinct layers:

1. **Presentation Layer**: Manages the UI and user interactions.
2. **Application Layer**: Contains use cases for business logic and orchestrates data flow between the presentation and domain layers.
3. **Domain Layer**: Defines core business rules and entities that shape the logic.
4. **Infrastructure Layer**: Handles data access, external services, and technical concerns.

This structured approach ensures flexibility and long-term maintainability.

## Key Features

- **User Authentication**: Secure sign-ups and logins via **NextAuth** using Google OAuth or email/password.
- **Real-Time Username Availability**: Users can instantly check if their desired username is available.
- **Link Management**: Full control to add, edit, delete, or archive links on their profile page.
- **Responsive & Mobile-Friendly**: Optimized for both desktop and mobile, ensuring a consistent user experience.
- **Dark Mode**: Users can toggle between light and dark themes, adding a personalized touch.

## Why It’s Different

This project stands out due to its implementation of **Inversion of Control (IoC)** via **InversifyJS**, which decouples components and simplifies maintenance. The integration of **NextAuth** streamlines the authentication process, allowing users to sign up with Google in just a few clicks, enhancing user experience.

## Deployment on Caprover

Deployment is seamless with **Caprover**, a personal Platform-as-a-Service that simplifies server management. Docker images are stored and managed with **GitHub Container Registry**, facilitating smooth updates and versioning.

## Environment Variables

The project includes a `.env.example` file, detailing all necessary environment variables required to get the application up and running. This ensures an easy and quick setup for developers.

## How to Get Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/2jsdev/wookielink.git
   cd wookielink
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up the Database**:

   - Add your database credentials in the `.env` file (use `.env.example` as a reference).
   - Run Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

4. **Start the Server**:

   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   - Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action!

## Wrap-Up

With this Wookielink, you gain a robust and scalable platform built with modern web technologies and designed for maintainability. Dive in, explore, and contribute—your feedback is always welcome!
