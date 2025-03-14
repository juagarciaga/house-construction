'use client'
import DashboardLayout from "./dashboard.layout";
import LoginPage from "./login/page";


export default function Home() {
  const isLooged = false;
  return (
    <>

      {isLooged ? <DashboardLayout> <h1>Hello World!!</h1> </DashboardLayout> : <LoginPage />}
    </>
  );
}
