// Copyright, 2013-2016, by Tomas Korcak. <korczis@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import querystring from 'querystring';
import url from 'url';

export const info = {
  name: 'google',
  url: 'https://google.com'
};

export function listing($) {
  var results = [];

  $('td > a.fl').each(function() {
    results.push({
      type: 'url',
      url: 'http://google.com'+ $(this).attr('href'),
      processor: 'google.listing'
    });
  });

  // Process pagination
  $('h3 > a').each(function() {
    var tmpUrl = 'http://google.com' + $(this).attr('href');
    var parsedUrl = url.parse(tmpUrl);
    var qarqs = querystring.parse(parsedUrl.query);

    results.push({
      type: 'data',
      data: {
        url: qarqs.q,
        title: $(this).text()
      }
    });
  });

  return results;
};