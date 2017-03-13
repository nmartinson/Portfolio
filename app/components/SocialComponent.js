import React from 'react';
import Radium, { Style, StyleRoot } from "radium";

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');

const Social = ({ title, url, imageUrl }) => {
  // const handleEmailClick = (e) => {
  //   var params = e.target.dataset.message.split(",")
  //   window.location = `#/contact/${params[0]}/${params[1]}`
  // }

  return (
    <div>
      <div className="row">
        <div className="form-group col-xs-2">
          <FacebookShareButton picture={imageUrl} url={url} title={title} >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        <div className="form-group col-xs-2">
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>

        <div className="form-group col-xs-2">
          <GooglePlusShareButton url={url}>
            <GooglePlusIcon size={32} round />
          </GooglePlusShareButton>
        </div>

        <div className="form-group col-xs-2">
          <PinterestShareButton
            url={url}
            media={imageUrl}
            windowWidth={1000}
            windowHeight={730}>
            <PinterestIcon size={32} round />
          </PinterestShareButton>
        </div>

        <div className="form-group col-xs-2">
          <LinkedinShareButton
            url={url}
            title={title}
            windowWidth={750}
            windowHeight={600}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  )
}

export default Radium(Social);