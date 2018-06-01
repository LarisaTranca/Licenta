/**
 * @flow
 */

'use strict';

import React, { Component } from 'react';
import { Image } from 'react-native';

function renderForecastImage(icon: string, width: number, height: number) {
  var image: number;
      switch (icon) {
    case 'chanceflurries':
      image = require('./img/rain_s_cloudy.png');
      break;
    case 'chancerain':
    image = require('./img/rain.png');
      break;
    case 'chancesleet':
    image = require('./img/rain_s_cloudy.png');
      break;
    case 'chancesnow':
    image = require('./img/snow.png');
      break;
    case 'chancetstorms':
    image = require('./img/thunderstorms.png');
      break;
    case 'clear':
    image = require('./img/sunny.png');
      break;
    case 'cloudy':
     image = require('./img/cloudy.png');
      break;
    case 'flurries':
    image = require('./img/sunny.png');
      break;
    case 'fog':
    image = require('./img/fog.png');
      break;
    case 'hazy':
    image = require('./img/sunny.png');
      break;
    case 'mostlycloudy':
    image = require('./img/partly_cloudy.png');
      break;
    case 'mostlysunny':
    image = require('./img/sunny.png');
      break;
    case 'sleet':
    image = require('./img/sunny.png');
      break;
    case 'snow':
    image = require('./img/snow.png');
      break;
    case 'sunny':
    image = require('./img/sunny.png');
      break;
    case 'tstorms':
    image = require('./img/thunderstorms.png');
      break;
    case 'cloudy':
    image = require('./img/cloudy.png');
      break;
    case 'partlycloudy':
    image = require('./img/partly_cloudy.png');
      break;
    case 'nt_chanceflurries':
    image = require('./img/rain_s_cloudy.png');
      break;
    case 'nt_chancerain':
    image = require('./img/rain.png');
      break;
    case 'nt_chancesleet':
    image = require('./img/rain_s_cloudy.png');
      break;
    case 'nt_chancesnow':
   image = require('./img/snow.png');
      break;
    case 'nt_chancetstorms':
    image = require('./img/thunderstorms.png');
      break;
    case 'nt_clear':
    image = require('./img/sunny.png');
      break;
    case 'nt_cloudy':
    image = require('./img/cloudy.png');
      break;
    case 'nt_flurries':
    image = require('./img/sunny.png');
      break;
    case 'nt_fog':
    image = require('./img/fog.png');
      break;
    case 'nt_hazy':
    image = require('./img/sunny.png');
      break;
    case 'nt_mostlycloudy':
    image = require('./img/partly_cloudy.png');
      break;
    case 'nt_mostlysunny':
   image = require('./img/sunny.png');
      break;
    case 'nt_sleet':
    image = require('./img/partly_cloudy.png');
      break;
    case 'nt_snow':
    image = require('./img/snow.png');
      break;
    case 'nt_sunny':
    image = require('./img/sunny.png');
      break;
    case 'nt_tstorms':
    image = require('./img/thunderstorms.png');
      break;
    case 'nt_cloudy':
    image = require('./img/cloudy.png');
      break;
    case 'nt_partlycloudy':
      image = require('./img/partly_cloudy.png');
      break;
  }

  const imageStyle = {
    width: width,
    height: height
  };

  return (
    <Image style={imageStyle} source={image} />
  );
}

module.exports = renderForecastImage;
