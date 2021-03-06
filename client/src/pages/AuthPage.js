import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        login: '', password: ''
    })

    useEffect(() => {
         message(error);
         clearError();
    }, [error, message, clearError]);

    useEffect(() => {
      window.M.updateTextFields();
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (e) {

        }
    }

    return (
    <div className="row">
        <div className=".col.s6.offset-s3">
            <h1>Auth page</h1>
            <div className="card grey darken-2">
                <div className="card-content white-text">
                    <span className="card-title">Authorisation</span>
                    <div>

                        <div className="input-field">
                            <input
                                required="true"
                                placeholder="login"
                                id="login"
                                type="text"
                                name="login"
                                className="green-input"
                                value={form.login}
                                onChange={changeHandler}
                            />
                            <label htmlFor="login">Login</label>
                        </div>

                        <div className="input-field">
                            <input
                                required="true"
                                placeholder="password"
                                id="password"
                                type="password"
                                name="password"
                                className="green-input"
                                value={form.password}
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                    </div>
                </div>
                <div className="card-action">
                    <button
                        className="btn green darken-3"
                        style={{marginRight: 50}}
                        onClick={loginHandler}
                        disabled={loading}
                    >
                        Log in
                    </button>
                    <button
                        className="btn grey lighten-1"
                        onClick={registerHandler}
                        disabled={loading}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}