// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var PERMISSIONS = {origins: ['https://api.stackexchange.com/']};
var URL = 'https://api.stackexchange.com/2.2/search?page=1&pagesize=10&order=desc&sort=activity&tagged=google-chrome-extension&site=stackoverflow';
var ROOT = 'https://api.stackexchange.com';

chrome.permissions.contains(PERMISSIONS, function(result) {
  if (!result) {
    // Open options page to request permissions.
    document.querySelector('#title').innerText =
        'Requires Stack Overflow permission';
    chrome.tabs.create({url: 'options.html'});
  } else {
    // Make the request to SO.
    makeRequest(function(data) {
      // Render the results.
      renderQuestions(JSON.parse(data));
    });
  }
});

function makeRequest(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', URL);
  xhr.addEventListener('load', function(e) {
    var result = xhr.responseText;
    callback(result);
  });
  xhr.send();
}

function renderQuestions(data) {
  var $results = document.querySelector('#results');
  var questions = data.items;
  for (var i = 0; i < Math.min(10, questions.length); i++) {
    var question = questions[i];
    var $question = document.createElement('li');
    var url = question.link;
    $question.innerHTML = '<a href="' + url + '" target="_blank">' +
        question.title + '</a>';
    results.appendChild($question);
  }
  // Update title too.
  document.querySelector('#title').innerText = 'Top Chrome Extension Questions';
}
