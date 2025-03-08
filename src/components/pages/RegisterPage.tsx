import AuthForm from "@/components/layout/AuthForm";

const RegisterPage = () => {
  return (
    <>
      <AuthForm formAuthType="REGISTER" />
    </>
  );
};
export default RegisterPage;
// return (
//   <div className="flex flex-col items-center justify-center min-h-screen">
//     <h2 className="text-2xl font-bold mb-4">Register</h2>
//     <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80">
//       <input
//         type="text"
//         placeholder="Nama"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="border p-2 rounded"
//         required
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-2 rounded"
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 rounded"
//         required
//       />
//       <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//         Register
//       </button>
//     </form>
//   </div>
// );
