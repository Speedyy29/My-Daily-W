# My Daily W 🏆 - Habit Tracker App

A modern habit tracking application built with React, TypeScript, and Tailwind CSS.

## Project Structure

```
/src
  /components          # Presentational components
    /common            # Shared UI components
    /habits            # Habit-specific UI components
    /ui                # shadcn/ui components
  /features            # Feature-based modules
    /habits            # Habit tracking feature
      /components       # Feature-specific components
      /hooks            # Feature-specific hooks
  /hooks               # Shared custom hooks
  /lib                 # Utilities and shared libraries
  /types               # TypeScript types/interfaces
  /services            # API and data services
  /contexts            # React contexts
  /constants           # Application constants
  /pages               # Page components
  App.tsx
  main.tsx
```

## Key Features

- Create and track daily habits
- Visualize streaks and progress
- Categorize habits
- Responsive design
- Dark mode support

## Refactoring Improvements

This version includes several improvements over the original codebase:

1. **Separation of Concerns**: Business logic moved from components to services
2. **State Management**: Implemented React Context for global state
3. **Custom Hooks**: Created reusable hooks for habit management
4. **Better Organization**: Restructured files following feature-based architecture
5. **Type Safety**: Improved TypeScript usage throughout the codebase
6. **Error Handling**: Added proper error handling for data operations

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Preview the production build locally.

## Dependencies

- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Router
- React Query
- date-fns
- Lucide React icons

## Learn More

This project was created by Utkarsh and uses modern React development practices with Vite as the build tool.