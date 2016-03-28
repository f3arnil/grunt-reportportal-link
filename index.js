var options = {
    stage: 'render:post:page'
};

var cheerio = require('cheerio');

module.exports = function (params, callback) {
    'use strict';

    var $ = cheerio.load(params.content);
    var thisOptions;


    // Defaults: plugin parameters override data attributes, which override our defaults
    thisOptions = {
        content: ".js-content"
    };

    $(thisOptions.content).find('.b-docs__wrapper').children().each(function (i, elem) {
        if ($(elem).hasClass('docs-heading')) return;
        if ($(elem).attr('id') === 'toc') return;
        $(elem).find('a').attr('target', '_blank');
    });

    params.content = $.html();
    callback();
};

module.exports.options = options;
