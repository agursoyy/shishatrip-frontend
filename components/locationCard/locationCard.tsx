import Link from 'next/link';
import React, {FC} from 'react';
import './locationCard.scss';
import {LazyLoadImage} from 'react-lazy-load-image-component';

interface IProps {
  link: string;
  as: string;
  locationItem?: any; // data
}

const LocationList: FC<IProps> = ({ link, locationItem, as }) => {
  const { logo_img, name, address, up, opening_hours, slug } = locationItem;
  return (
    <Link href={as} as={link}>
      <a className="location-item-card">
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
              <Link href={as} as={link}>
                <a>{name}</a>
              </Link>
            </h5>
            <p className="card-text adress">{JSON.parse(address).value}</p>

            <div className="flexbox d-flex">
              <div className="info">
                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="#a5adc4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="expl ml-4">1.1 km</span>
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
                  <span className="expl ml-4">bis 01:00 Uhr</span>
                </p>
              </div>
              <div className="up-down">
                <div className="pl-0 pl-xl-2">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default LocationList;
