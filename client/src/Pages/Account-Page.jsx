import React from 'react';
import { NavBar } from '../Components/NavBar';

function AccountForm() {
  return (
    <div>
    <NavBar/>
      <h1>Account Information</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value="ReadOnlyUsername"
          readOnly
        /><br /><br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value="readonly@example.com"
          readOnly
        /><br /><br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value="ReadOnlyPassword"
          readOnly
        /><br /><br />

        <input type="submit" value="Submit" disabled />
      </form>
    </div>
  );
}

export default AccountForm;
