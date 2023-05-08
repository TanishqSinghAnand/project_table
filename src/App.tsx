import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "./components/Table";
import Modal from "./components/Modal";

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

function App() {
  const [show, setShow] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const addUser = (newUser: User) => {
    let newArr = [...users, newUser];
    setUsers(newArr);
  };

  return (
    <Router>
      <div className="home">
        <Table users={users} />
        <button onClick={() => setShow(true)} className="add_btn">
          Add User
        </button>
        <Modal
          show={show}
          onClose={() => setShow(false)}
          addUserFunction={addUser}
        />
      </div>
    </Router>
  );
}

export default App;
