import { useFormik } from "formik";
import { signupValidation } from "../validation/authValidation";
import { CssBaseline } from "@mui/material";
import AppTheme from "../components/AppTheme";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { signup } from "../store/features/auth/auth";
import { toast } from "react-toastify";

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: signupValidation,

      onSubmit: async (values) => {
        const response = await dispatch(signup(values)).unwrap();
        if (response?.statusCode === 200) {
          toast.success(response.message);
          navigate("/signin");
        } else {
          toast.success(response.message);
        }
      },
    });

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">Sign up</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                placeholder="Jon Snow"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                  errors.name && touched.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.name && touched.name && (
                <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                  errors.email && touched.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                placeholder="••••••"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
                  errors.password && touched.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.password && touched.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none"
            >
              Sign up
            </button>
          </form>

          <div className="mt-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <Link className="text-blue-600 hover:underline" to={`/signin`}>
              {` `}
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AppTheme>
  );
}
