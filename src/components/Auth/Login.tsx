import React from 'react';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setRole } from '../../store/userSlice.ts';
import { useNavigate } from 'react-router-dom';
import { useAdminloginMutation } from '../../api/authApi.ts';

interface FormValues {
  userName: string;
  pass: string;
}

const validationSchema = Yup.object({
  userName: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  pass: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const [Adminlogin] = useAdminloginMutation();


  const initialValues: FormValues = { userName: '', pass: '' };

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: any) => {   
    try {

        const response = await Adminlogin(values).unwrap();
        localStorage.setItem('TestInterView',response?.data?.token)
        dispatch(setRole(response?.data?.role));
        navigate('home');
    } catch (error) {
        console.error('Login failed:', error);
    } finally {
        setSubmitting(false);
        resetForm();
    }
};

  return (
    <div className="flex justify-start items-center h-[95vh]">
      <div className="w-full max-w-md mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik: FormikProps<FormValues>) => (
            <form 
              onSubmit={formik.handleSubmit} 
              className="bg-white px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="userName"
                  type="text"
                  placeholder="Enter your username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
         
                />
                {formik.touched.userName && formik.errors.userName && (
                  <div className="text-red-500 text-xs italic mt-2">
                    {formik.errors.userName}
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="pass"
                  type="password"
                  placeholder="Enter your password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formik.values.pass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.pass && formik.errors.pass && (
                  <div className="text-red-500 text-xs italic mt-2">
                    {formik.errors.pass}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${formik.isSubmitting && 'opacity-50 cursor-not-allowed'}`}
                  aria-disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
