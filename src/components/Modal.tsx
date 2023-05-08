import "./Modal.css";
import { useEffect, useState } from "react";

// Modal Props interface
interface ModalProps {
  show: boolean;
  onClose: () => void;
  addUserFunction: (newUser: User) => void;
}

// A sample user interface for each new user
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

const Modal = ({ show, onClose, addUserFunction }: ModalProps) => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    address: {
      city: "",
    },
    company: {
      name: "",
    },
  });

//   Upadting feilds
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") {
      setUser((prevState) => ({
        ...prevState,
        name: value,
      }));
    } else if (name === "email") {
      setUser((prevState) => ({
        ...prevState,
        email: value,
      }));
    } else if (name === "city") {
      setUser((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          city: value,
        },
      }));
    } else if (name === "company") {
      setUser((prevState) => ({
        ...prevState,
        company: {
          ...prevState.company,
          name: value,
        },
      }));
    }
  };

//   Submitting the form and updating the global users Array in App.tsx
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addUserFunction(user);
    setUser({
      id: 0,
      name: "",
      email: "",
      address: {
        city: "",
      },
      company: {
        name: "",
      },
    });
    onClose();
  };

  // Using argument for conditional display
  if (!show) {
    return null;
  } else {
    return (
      <div className="modal">
        <div className="modal_content">
          <div className="modal_content_header">
            <div className="modal_content_header_title">New User</div>
          </div>
          <div className="modal_content_body">
            <form className="modal_content_body_form" onSubmit={handleSubmit}>
              <label>
                Name :
                <input type="text" name="name" onChange={handleInputChange} />
              </label>
              <label>
                Email :
                <input type="text" name="email" onChange={handleInputChange} />
              </label>
              <label>
                City :
                <input type="text" name="city" onChange={handleInputChange} />
              </label>
              <label>
                Company :
                <input
                  type="text"
                  name="company"
                  onChange={handleInputChange}
                />
              </label>

              <div className="modal_content_footer">
                <button type="submit">Submit</button>
                <button
                  onClick={onClose}
                  className="modal_content_footer_button"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};
export default Modal;
