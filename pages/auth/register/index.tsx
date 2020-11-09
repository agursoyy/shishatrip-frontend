import React, { FC, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import { RootState, Store, wrapper } from '../../../stores';
import Link from 'next/link';
import './index.scss';
import '../auth.scss';
import AuthLeftSide from '../../../components/authLeftSide/authLeftside';

import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password1: Yup.string()
    .required('Password is required')
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/, 'weak password'),
  password2: Yup.string()
    .required('Password is required')
    .oneOf([Yup.ref('password1')], 'Passwords not matching'),
});

type IProps = {};

const Register: NextPage<IProps> = () => {
  return (
    <div className="register-page">
      <div className="row mr-0 ml-0">
        <div className="col-md-6 p-0">
          <div className="register-page-left-wrapper">
            <AuthLeftSide />
          </div>
        </div>
        <div className="col-md-6">
          <div className="register-page-content">
            <div className="logo-wrapper">
              <img src="/icons/logo-dark.svg" alt="" />
            </div>
            <div className="register-form">
              <div className="row justify-content-center">
                <div className="col-11 col-lg-10 col-xl-6">
                  <Formik
                    initialValues={{ email: '', password1: '', password2: '' }}
                    validationSchema={RegisterSchema}
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
                              <input
                                {...field}
                                disabled={isSubmitting}
                                type="text"
                                className="form-control"
                              />
                            )}
                          />
                          <ErrorMessage name="email">
                            {(msg) => <div className="form-error">{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <Field
                            type="password"
                            id="password1"
                            name="password1"
                            render={({ field, form: { isSubmitting } }: any) => (
                              <input {...field} type="password" className="form-control" />
                            )}
                          />
                          <ErrorMessage name="password1">
                            {(msg) => <div className="form-error">{msg}</div>}
                          </ErrorMessage>
                        </div>
                        <div className="form-group">
                          <label>Re-Password</label>
                          <Field
                            id="password2"
                            name="password2"
                            render={({ field, form: { isSubmitting } }: any) => (
                              <input {...field} type="password" className="form-control" />
                            )}
                          />
                          <ErrorMessage name="password2">
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
export default Register;
