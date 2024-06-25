import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
     ...user,
      [name]: value
    });
  };

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        console.error("Failed to login");
      } else {
        const res_data = await response.json();
        console.log("res from server", res_data);
        if (res_data && res_data.token) {
          storeTokenInLS(res_data.token);
          navigate('/', { replace: true });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section>
        <main>
          <div className='section-login'>
            <div className="contact-content container">
              <h1 className="main-heading">Login Form</h1>
            </div>
            <div className="container grid grid-two-cols">
              <div className="login-image">
                <img src='/images/login.png' alt="login" width="500" height="500" />
              </div>
              <div className="login-form">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email:</label>
                    <input type="text"
                      id="email"
                      name="email"
                      autoComplete='off'
                      required
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <label htmlFor="password">password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete='off'
                    required
                    value={user.password}
                    onChange={handleInput}
                  />
                  <div>
                    <button type="submit">submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Login;