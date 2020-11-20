import React, { FC, useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import { RootState, Store, wrapper } from '../../../stores';
import Link from 'next/link';
import './index.scss';
import '../auth.scss';
import AuthLeftSide from '../../../components/authLeftSide/authLeftside';

import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import { ToggleButton } from 'react-bootstrap';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, 'weak password'),
});

type IProps = {};

const Login: NextPage<IProps> = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      <div className="row mr-0 ml-0">
        <div className="col-md-6 p-0">
          <div className="login-page-left-wrapper">
            <AuthLeftSide />
          </div>
        </div>
        <div className="col-md-6">
          <div className="login-page-content">
            <div className="logo-wrapper">
              <img src="/icons/logo-dark.svg" alt="" />
            </div>
            <div className="login-form">
              <div className="row justify-content-center">
                <div className="col-11 col-lg-10 col-xl-6">
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                      // 1. formun datalarını set ederim.

                      // error yoksa
                      console.log(values);
                    }}
                  >
                    {(params) => (
                      <Form className="auth-form-container">
                        <div className="form-group">
                          <label>Email</label>
                          <Field
                            id="email"
                            name="email"
                            render={({ field, form: { isSubmitting } }: any) => (
                              <input {...field} type="text" className="form-control" />
                            )}
                          />
                          <ErrorMessage name="email">
                            {(msg) => <div className="form-error">{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <Field
                            id="password"
                            name="password"
                            render={({ field, form: { isSubmitting } }: any) => (
                              <div style={{ position: 'relative' }}>
                                <input
                                  {...field}
                                  type={showPassword ? 'text' : 'password'}
                                  className="form-control"
                                />
                                <button
                                  type="button"
                                  className="btn btn-link hide-password"
                                  onClick={() => {
                                    setShowPassword(!showPassword);
                                  }}
                                >
                                  {showPassword ? (
                                    <img src="/icons/visible-password.svg" className="" />
                                  ) : (
                                    <img src="/icons/hidden-password.svg" className="" />
                                  )}
                                </button>
                              </div>
                            )}
                          />

                          <ErrorMessage name="password">
                            {(msg) => <div className="form-error">{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className="btn-wrapper">
                          <button type="submit" className="btn btn-block submit-btn">
                            Register
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
export const getServerSideProps = wrapper.getServerSideProps(({ store, req, res }) => {
  console.log('MYPAGEMYPAGEMYPAGE');
  //store.dispatch(login({ email: 'email', password: 'password' }) as any);
});
*/
export default Login;
