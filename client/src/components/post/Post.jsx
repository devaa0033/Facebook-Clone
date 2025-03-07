import React from 'react'
import { Link } from 'react-router-dom';

export default function Post() {
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src="" alt="" />

            <div className="details">
              <Link>
                  <span className='name'></span>
              </Link>
                
                <span className='date'></span>
            </div>
          </div>
        </div>


        <div className="content">
          <p></p>
          <img src="" alt="" />
        </div>

        <div className="info">
          <div className="item">

          </div>

          <div className="item">
            see Comments
          </div>

          <div className="item">
            Share
          </div>
        </div>


      </div>
    </div>
  );
};


