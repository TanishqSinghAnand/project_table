import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "./components/Table";
import Modal from "./components/Modal";

//Creating interface for each User
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
  const [show, setShow] = useState<boolean>(false); //Modal visibility status
  const [users, setUsers] = useState<User[]>([]); // All users

  useEffect(() => {
    //Fetching Data via axios 
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
    //Adding new element to existing user elements
    let newArr = [...users, newUser];
    setUsers(newArr);
  };

  return (
    <Router>
      <div className="home">
        {/* Displaying seprate components */}
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
