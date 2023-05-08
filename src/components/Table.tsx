import './Table.css';
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

interface TableProps {
  users:User[];
}

const Table=({users}:TableProps)=> {
  const [sortedUsers, setSortedUsers] = useState<User[]>([]);

  

  useEffect(() => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setSortedUsers(sortedUsers);
  }, [users]);

  return (
    <table className="table">
      <thead className="table_head">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody className="table_body">
        {sortedUsers.map((user, id) => {
          return (
            <tr key={id}>
              <td className="table_body_row"> {user.name}</td>
              <td className="table_body_row">{user.email}</td>
              <td className="table_body_row">{user.address.city}</td>
              <td className="table_body_row">{user.company.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;