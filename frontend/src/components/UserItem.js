import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../store/slices/thunks/users/updateUserThunk";

export const UserItem = ({ user, navigate }) => {
  const [userBlocked, setUserBlocked] = useState(user.blocked);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();  

  async function handleUserBlocked() {
    const updatedUserBlocked = userBlocked === 0 ? 1 : 0;

    const newUser = {
      ...user,
      blocked: updatedUserBlocked,
    };

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const resultAction = await dispatch(
        updateUserThunk({ user: newUser, navigate })
      ).unwrap();
      if (!resultAction.error) {
        setUserBlocked(updatedUserBlocked);
        setSuccess(true);
      } 
    } catch (err) {
      setError("Failed to complete: " + err);
    } finally {
      setLoading(false);
    }
  }

  const handleUserEdit = () => {
    const url = "/user/" + user.id;
    navigate(url);
  };

  return (
    <div key={user.id} className="task-item">
      <div>
        <p>{user.username}</p>
        <p>{user.role}</p>
        <div className="task-completed">
          <label>Blocked</label>
          <input
            type="checkbox"
            className="task-completed-checkbox"
            checked={userBlocked}
            onChange={handleUserBlocked}
            disabled={user.username === 'admin' && user.role === 'admin' ? true : false}
          />
        </div>
        <div className="task-buttons">
          <button
            className="task-button-edit"
            data-id={user.id}
            onClick={handleUserEdit}
          >
            Edit
          </button>          
        </div>
      </div>
      {loading && <p className="server-loading">Loading...</p>}
      {error && <p className="server-error">{error}</p>}
      {success && <p className="server-success">User updated successfully</p>}
    </div>
  );
};
