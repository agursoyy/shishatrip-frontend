import Link from 'next/link';
import React, { FC } from 'react';
import './locationCard.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface IProps {
  link: string;
  locationItem?: any; // data
}

const LocationList: FC<IProps> = ({ link, locationItem }) => {
  const { logo_img, name, address, up, opening_hours, slug } = locationItem;
  return (
    <div className="location-item-card">
      <div className="card">
        <div className="img-wrapper">
          <Link href={link}>
            <a>
              <img className="card-img-top d-none" src={logo_img} alt="Card image cap" />
              <LazyLoadImage
                alt={'Card image cap'}
                src={logo_img} // use normal <img> attributes as props
              />
            </a>
          </Link>
        </div>
        <div className="card-body">
          <h5 className="card-title name">
            <Link href={link}>
              <a>{name}</a>
            </Link>
          </h5>
          <p className="card-text adress">{JSON.parse(address).value}</p>

          <div className="flexbox d-flex">
            <div className="info">
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a5adc4"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span className="expl ml-4">1200 views</span>
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a5adc4"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span className="expl ml-4">bits 01:00 Uhr</span>
              </p>
            </div>
            <div className="up-down">
              <button className="btn pl-0 pl-xl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f33364"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                <span className="ml-4">{up} upvotes</span>
              </button>
              <button className="btn d-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f33364"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationList;
