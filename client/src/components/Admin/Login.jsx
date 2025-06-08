import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { axios, setToken } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        toast.success("Login successful!!!");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg ">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label>
                Email
                <br />
                <input
                  type="email"
                  value={email}
                  required
                  placeholder="Email Id -> admin@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-b-2 border-gray-300 py-2  outline-none mb-6 w-full"
                />
              </label>
            </div>

            <div className="flex flex-col">
              <label>
                Password
                <br />
                <input
                  type="password"
                  value={password}
                  required
                  placeholder="password -> password123"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-b-2 border-gray-300 py-2 outline-none mb-6 w-full"
                />
              </label>
            </div>

            <input
              type="submit"
              value="Login"
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
