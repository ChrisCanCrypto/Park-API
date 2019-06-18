'use strict';

const apiKey = 'AQs680K8p6Kr6b0XVCiL7d0YqY9SXJakXpbspisQ';
const searchURL = 'https://developer.nps.gov/api/v1/parks';



function getParkResults(states, limitRes){
    const params = {
        stateCode: states,
        limit : limitRes,
        api_key : apiKey,
    }
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;
    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

function formatStates(states){
    return states.replace(/,/g, "&stateCode=");
}

function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => key + '=' + params[key]);
    return queryItems.join('&');
}

function displayResults(results){
    console.log(results);
    $('#results-list').empty();

    for(let i = 0; i < results.data.length; i++){
        $('#results-list').append(
            '<li><h3>' + results.data[i].fullName + 
            '</h3><a href="'+ results.data[i].url + 
            '"> Park Site </a><p>' + results.data[i].description + '<p></li>'
        );
    }

    $('#results').removeClass('hidden');
}

function watchForm(){

    $('form').submit(event => {
        event.preventDefault();
        var states = $('#js-state-code').val();
        states = formatStates(states);
        const limitRes = $('#js-limit').val();
        getParkResults(states, limitRes);
    });

}

$(watchForm);