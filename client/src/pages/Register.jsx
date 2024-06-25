import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../store/auth';

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value.trim();

    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user.username || !user.email || !user.phone || !user.password) {
        setError("Please fill in all fields");
        return;
      }

      const response = await fetch('http://localhost:5000/api/auth/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      } else {
        const res_data = await response.json();
        console.log("res from server", res_data);
        storeTokenInLS(res_data.token);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className='section-registration'>
            <div className="contact-content container">
              <h1 className="main-heading">Registration Form</h1>
            </div>
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img src='/images/register.png' alt="register" width="500" height="500" />
              </div>
              <div className="registration-form">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      autoComplete='off'
                      required
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>
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
                  <div>
                    <label htmlFor="phone">phone:</label>
                    <input
                      type="number"
                      id="phone"
                      name="phone"
                      autoComplete='off'
                      required
                      value={user.phone}
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
                    {loading ? (
                      <button type="submit" disabled>Loading...</button>
                    ) : (
                      <button type="submit">submit</button>
                    )}
                  </div>
                  {error && (
                    <div style={{ color: 'red' }}>{error}</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register;