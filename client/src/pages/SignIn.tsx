import { useState } from "react";
import { useFormik } from "formik";
import AppTheme from "../components/AppTheme";
import ForgotPassword from "../components/ForgotPassword";
import { signinValidation } from "../validation/authValidation";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/features/auth/auth";
import { AppDispatch } from "../store/store";
import { toast } from "react-toastify";

export default function SignIn({
  disableCustomTheme,
}: {
  disableCustomTheme?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch<AppDispatch>();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      enableReinitialize: true,
      validationSchema: signinValidation,
      onSubmit: async (values: { email: string; password: string }) => {
        const response = await dispatch(login(values)).unwrap();

        if (response?.statusCode === 200) {
          toast.success(response.message);
        } else {
          toast.success(response.message);
        }
      },
    });

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 relative">
        <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">Sign in</h1>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
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
                placeholder="••••••"
                autoComplete="current-password"
                required
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

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleClickOpen}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold focus:outline-none"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <Link className="text-blue-600 hover:underline" to={`/signup`}>
              {` `}
              Sign up
            </Link>
          </p>
        </div>
        {open && <ForgotPassword open={open} handleClose={handleClose} />}
      </div>
    </AppTheme>
  );
}
