## PMS

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

### 1. Clone the Repository

Clone this repository to your local machine:

git clone https://github.com/sahilumraniya/PMS.git
cd PMS

### 2. Install Dependencies

Run one of the following commands to install the necessary dependencies:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 3. Set Up Environment Variables

Create a .env file in the root directory of your project and add the following environment variables:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
JWT_SECRET=your-jwt-secret-key
```

Replace `<username>`, `<password>`, and myDatabase with your actual MongoDB credentials and database name.

### 4. Run the Development Server

You can now run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Folder Structure

```plaintext
.env
.gitignore
public/
src/
  app/
    api/
      auth/
        login/
        signup/
        verify-token/
        protected/
    components/
      Card.tsx
      Column.tsx
      KanbanBoard.tsx
      Sidebar.tsx
      ViewTaskModal.tsx
      ...
    db/
      connect.ts
    models/
      Task.ts
      User.ts
    redux/
      authSlice.ts
      store.ts
      taskSlice.ts
    utils/
      DateHelper.tsx
      auth.ts
  pages/
    _app.tsx
    index.tsx
  styles/
    globals.css
    Home.module.css
tailwind.config.js
tsconfig.json
```

## Deployed on Vercel

[checkout on vercel](https://pms-jade.vercel.app/login)

[checkout video](https://drive.google.com/file/d/1v0ClN1KeBEIHOyaPNzxYEEocwwK7DnaJ/view)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
