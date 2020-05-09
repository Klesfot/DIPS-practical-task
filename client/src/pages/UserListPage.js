import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {UserList} from "../components/UserList";

export const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const {loading, request} = useHttp();

    const fetchUsers = useCallback(async () => {
        try {
            const fetchedUsers = await request('/api/users', 'GET', null);
            setUsers(fetchedUsers);
        } catch (e) {}
    }, [request]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <>
            {!loading && <UserList users={users} />}
        </>
    )
}