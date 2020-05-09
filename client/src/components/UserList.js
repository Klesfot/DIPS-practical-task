import React from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {useHistory} from 'react-router-dom';

export const UserList = ({ users }) => {
    const message = useMessage();
    const {request} = useHttp();
    const history = useHistory();

    if (!users.length) {
        return <p className="center">No users</p>
    }

    const editHandler = async () => {
        history.push(`/create`);
    }

    const deleteHandler = async user => {
        try{
            const email = user.email;
            console.log(email)
            const data = await request('/api/users/delete', 'DELETE', {email: email});
            message(data.message);
        } catch (e) {}
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Email</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            { users.map(user => {
                return (
                    <tr>
                        <td>{user.email}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>
                            <div className="input-field">

                                <button
                                    className="btn grey lighten-1"
                                    style={{marginRight: 50}}
                                    onClick={() => editHandler(user)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn grey lighten-1"
                                    onClick={() => deleteHandler(user)}
                                >
                                    Delete
                                </button>

                            </div>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}