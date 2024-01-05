'use strict';

/**
 * app-story service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::app-story.app-story');
