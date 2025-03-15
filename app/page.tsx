'use client'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import DashboardLayout from "./dashboard.layout";

Amplify.configure(outputs);

export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <>
          <button onClick={signOut}>Sign out</button>
          <p>Hello, {user?.username}</p>
          <DashboardLayout> <h1>Hello World!!</h1> </DashboardLayout>
        </>
      )}
    </Authenticator>
  );
}
