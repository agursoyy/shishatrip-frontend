import Link from 'next/link';
import React, { FC, useState } from 'react';
import './createLocation.scss';
import '../../../styles/globals.scss';

import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import { Container, ToggleButton } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import SectionHeaderWithPinkLogo from '../../../components/sectionHeaderWithPinkLogo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { Col, Image, Nav, Row } from 'react-bootstrap';
import { fillHeaderInput } from '../../../stores/create-location-form/actions';
import CreateLocationStep1 from '../../../components/dashboard/createLocationStep1';
import CreateLocationStep2 from '../../../components/dashboard/createLocationStep2';
import CreateLocationStep3 from '../../../components/dashboard/createLocationStep3';

const SectionHeaderSchema = Yup.object().shape({
  logo_img: Yup.string().required('cafe name is required'),
  name: Yup.string().required('cafe name is required'),
  category_id: Yup.number().min(1, 'cafe category is required'),
});

const CreateLocation: FC = () => {
  const [profileSection, setProfileSection] = useState<'info' | 'photo' | 'stories'>('info');
  const dispatch = useDispatch();
  const {
    locations: { categories },
    locationForm: { header, step2 },
  } = useSelector((state: RootState) => state);

  return (
    <div className="create-new-location-comp">
      <main className="local-container-fluid-cafe local-container-fluid-section1-wrapper-cafe container-fluid">
        <div className="local-container-fluid-section1-cafe">
          <div>
            <Formik
              initialValues={{
                logo_img: header.logo_img,
                name: header.name,
                category_id: header.category_id,
              }}
              validationSchema={SectionHeaderSchema}
              onSubmit={(values) => {
                // 1. formun datalarını set ederim.
                // error yoksa
                console.log(values);
                //dispatch(goToStep2({ step1: values }));
              }}
            >
              {(params) => (
                <>
                  <Form className="header-form">
                    <Row className="local-row-cafe justify-content-center">
                      <Col lg={4} className="local-col-cafe head-section">
                        <div className="local-section1-button-wrapper-cafe">
                          <label htmlFor="upload-cafe-photo-button">
                            <Image
                              className={`local-section1-button-cafe local-section1-button-cafe-for-1440 logo profile-logo ${
                                params.errors.logo_img && params.touched.logo_img
                                  ? 'input--error'
                                  : params.values.name && 'input--valid'
                              }`}
                              src={header.logo_img ? header.logo_img : '/icons/camera.svg'}
                              alt={'upload_image'}
                            />
                          </label>
                          <input
                            type="file"
                            id="upload-cafe-photo-button"
                            style={{ display: 'none' }}
                            onChange={(e: any) => {
                              e.preventDefault();
                              let reader = new FileReader();
                              const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

                              if (e.target.files) {
                                let file = e.target.files[0];
                                if (file && acceptedImageTypes.includes(file['type'])) {
                                  reader.readAsDataURL(file);
                                  reader.onload = function () {
                                    dispatch(fillHeaderInput({ logo_img: reader.result }));
                                    params.setFieldValue('logo_img', reader.result);
                                  };
                                }
                              }
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="local-row-cafe justify-content-center">
                      <Col md={5} className="local-col-cafe head-section-metadata">
                        <p className="local-section1-brand-text1-cafe"></p>
                        <div className="form-group">
                          <input
                            id="name"
                            name="name"
                            value={params.values.name}
                            placeholder="Enter a Cafe Name"
                            style={{ fontSize: '22px' }}
                            onChange={(e: any) => {
                              params.handleChange(e);
                              dispatch(fillHeaderInput({ name: e.target.value }));
                            }}
                            onBlur={params.handleBlur}
                            className={`${
                              params.errors.name && params.touched.name
                                ? 'input--error'
                                : params.values.name && 'input--valid'
                            }`}
                          />
                        </div>
                        <div className="form-group">
                          <select
                            id="category_id"
                            name="category_id"
                            onBlur={params.handleBlur}
                            value={header.category_id}
                            onChange={(e: any) => {
                              params.handleChange(e);
                              dispatch(fillHeaderInput({ category_id: e.target.value }));
                            }}
                            className={`${
                              params.errors.category_id && params.touched.category_id
                                ? 'input--error'
                                : params.values.name && 'input--valid'
                            }`}
                          >
                            <option disabled value={-1}>
                              Select a Category
                            </option>
                            {categories &&
                              categories.categories.map((cat: any, index: number) => (
                                <option key={index} value={cat.id}>
                                  {cat.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                  <div className="location-form-step-content">
                    {profileSection === 'photo' && (
                      <CreateLocationStep1
                        headerForm={params}
                        profileSection={profileSection}
                        setProfileSection={(param: 'info' | 'photo' | 'stories') => {
                          setProfileSection(param);
                        }}
                      />
                    )}
                    {profileSection === 'info' && (
                      <CreateLocationStep2
                        headerForm={params}
                        profileSection={profileSection}
                        setProfileSection={(param: 'info' | 'photo' | 'stories') => {
                          setProfileSection(param);
                        }}
                      />
                    )}
                    {profileSection === 'stories' && (
                      <CreateLocationStep3
                        headerForm={params}
                        profileSection={profileSection}
                        setProfileSection={(param: 'info' | 'photo' | 'stories') => {
                          setProfileSection(param);
                        }}
                      />
                    )}
                  </div>
                </>
              )}
            </Formik>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateLocation;
