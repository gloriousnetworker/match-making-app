// // src/components/AdminRoleManagement.js

// import React, { useState } from "react";
// import { setAdminRole } from '../firebaseServices'; // Import the new function

// const AdminRoleManagement = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleAssignAdmin = async () => {
//     try {
//       const responseMessage = await setAdminRole(email);
//       setMessage(responseMessage);
//       setError('');
//     } catch (err) {
//       setError(err.message);
//       setMessage('');
//     }
//   };

//   return (
//     <div>
//       <h2>Assign Admin Role</h2>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter email"
//       />
//       <button onClick={handleAssignAdmin}>Assign Admin Role</button>
//       {message && <p>{message}</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default AdminRoleManagement;
