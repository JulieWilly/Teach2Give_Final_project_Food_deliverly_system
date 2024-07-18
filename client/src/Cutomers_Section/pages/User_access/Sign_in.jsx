import React from 'react';
import {Link} from 'react-router-dom'
import "./user_access.css";

const Sign_in = () => {
    return (
      <form>
        <input type="text" placeholder="Email address" />
        <input type="text" placeholder="password" />
        <button>Log in</button>
        <p>
          Create accout with us. <Link to={"/sign_up"}> Sign up</Link>
        </p>
      </form>
    );
}


export default Sign_in;