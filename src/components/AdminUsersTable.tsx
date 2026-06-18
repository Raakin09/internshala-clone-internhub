import {
    useEffect,
    useState,
  } from "react";
  
  import styles from "./ApplicationTable.module.css";
  
  export default function AdminUsersTable() {
    const [users, setUsers] =
      useState<any[]>([]);
  
    const [loading, setLoading] =
      useState(true);
  
    useEffect(() => {
      const fetchUsers =
        async () => {
          try {
            const res =
              await fetch(
                "/api/users"
              );
  
            const data =
              await res.json();
  
            if (
              data.success
            ) {
              setUsers(
                data.users
              );
            }
          } catch (error) {
            console.error(
              error
            );
          } finally {
            setLoading(false);
          }
        };
  
      fetchUsers();
    }, []);
  
    if (loading) {
      return (
        <div
          className={
            styles.wrapper
          }
        >
          Loading Users...
        </div>
      );
    }
  
    return (
      <div
        className={styles.wrapper}
      >
        <div
          className={styles.card}
        >
          <h1>
            Manage Users
          </h1>
  
          <p>
            Registered users
          </p>
  
          <table
            className={
              styles.table
            }
          >
            <thead>
              <tr>
                <th>Name</th>
  
                <th>Email</th>
  
                <th>Role</th>
  
                <th>
                  Joined
                </th>
              </tr>
            </thead>
  
            <tbody>
              {users.map(
                (user) => (
                  <tr
                    key={
                      user._id
                    }
                  >
                    <td>
                      {
                        user.name
                      }
                    </td>
  
                    <td>
                      {
                        user.email
                      }
                    </td>
  
                    <td>
                      {
                        user.role
                      }
                    </td>
  
                    <td>
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }