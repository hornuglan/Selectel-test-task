'use strict';

const PRICING_URL = 'https://api.jsonbin.io/b/5b683d097b212953678c03dd';

const getObjects = () => {
    const configPreloader = document.querySelector('.config__preloader');
    const configTable = document.querySelector('.config__table');

    const xhrRequest = new XMLHttpRequest();

    xhrRequest.open('GET', PRICING_URL, true);
    xhrRequest.send();

    xhrRequest.onreadystatechange = () => {
        if (xhrRequest.readyState !== 4) return;
        configPreloader.classList.add('config__preloader--invisible');
        if (xhrRequest.status === 200) {
            const response = xhrRequest.responseText;

            let tableContents = '';
            JSON.parse(response).forEach((item) => {
                tableContents += `<div class="config__row">
                    <div class="config__cpu">${item.cpu}</div>
                    <div class="config__hdd">${item.hdd}</div>
                    <div class="config__ram">${item.ram}</div>
                    <div class="config__price">${item.price}</div>
                </div>`;
            });

            configTable.innerHTML = tableContents;
        } else {
            configTable.innerHTML =
                `<div class="config__error-message">
                   Ошибка соединения         
                </div>`;
        }
    };
};

getObjects();
