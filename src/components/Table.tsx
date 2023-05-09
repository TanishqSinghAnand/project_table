import "./Table.css";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

// An interface for props
interface TableProps {
  users: User[];
}

const Table = ({ users }: TableProps) => {
  // State for sorted users
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);

  // Sorting users when ever users, the argument is updated
  useEffect(() => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setSortedUsers(sortedUsers);
  }, [users]);

  return (
    <table className="table">
      <thead className="table_head">
        <tr>
          <th>
            <center>Name</center>
          </th>
          <th>
            <center>Email</center>
          </th>
          <th>
            <center>City</center>
          </th>
          <th>
            <center>Company</center>
          </th>
        </tr>
      </thead>
      <tbody className="table_body">
        {/* Mapping through the whole array to disply each individual table row */}
        {sortedUsers.map((user, id) => {
          const truncatedEmail =
            window.innerWidth <= 768
              ? `${user.email.slice(0, 15)}...`
              : user.email;

          return (
            <tr key={id}>
              <td className="table_body_row"> {user.name}</td>
              <td className="table_body_row">
                <a href={`mailto:${user.email}`}>{truncatedEmail} </a>
              </td>
              <td className="table_body_row">{user.address.city}</td>
              <td className="table_body_row">{user.company.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
