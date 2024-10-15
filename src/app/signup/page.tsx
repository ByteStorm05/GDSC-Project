export default async function Signup() {
  async function submitdata(formData: FormData) {
    console.log(Object.fromEntries(formData));
  }
  return (
    <div className="flex h-screen justify-center items-center">
      <form
        action={async (formData) => {
          "use server";
          const data = Object.fromEntries(formData.entries());
          console.log(data);
        }}
        className="bg-black p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
