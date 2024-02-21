$(document).ready(function () {
         const sectionsList = $('#test-swipe-1');
         const resultDiv = $('#test-swipe-2');
         const infoDiv = $('#test-swipe-3');
         let currentRequest = null;

         function getApiSections(url) {
                  $.ajax({
                           url: url,
                           method: 'GET',
                           success: function (response) {
                                    Object.entries(response).forEach(([key, value]) => {
                                             const button = $('<h3>').text(key).attr('data-url', value).addClass('api-button');
                                             sectionsList.append(button);
                                    });
                           },
                           error: function (xhr, status, error) {
                                    console.error('Error fetching data:', error);
                           }
                  });
         }

         function getSectionData(url) {
                  if (currentRequest) {
                           currentRequest.abort();
                  }

                  currentRequest = $.ajax({
                           url: url,
                           method: 'GET',
                           success: function (response) {
                                    response.results.forEach(function (item) {
                                             const data = $('<h4>').text(item.name || item.title).attr('data-url', item.url).addClass('api-item');
                                             resultDiv.append(data);
                                    });
                                    if (response.next) {
                                             getSectionData(response.next);
                                    }
                           },
                           error: function (xhr, status, error) {
                                    console.error('Error fetching data:', error);
                           },
                           complete: function () {
                                    $('.api-button').prop('disabled', true);

                                    setTimeout(function () {
                                             $('.api-button').prop('disabled', false);
                                    }, 3000);
                           }
                  });
         }

         function getObjInfo(url) {
                  $.ajax({
                           url: url,
                           method: 'GET',
                           success: function (response) {
                                    Object.entries(response).forEach(([key, value]) => {
                                             if (typeof value === 'string' && value.startsWith('http')) {
                                                      $.ajax({
                                                               url: value,
                                                               method: 'GET',
                                                               success: function (data) {
                                                                        const name = data.name || data.title;
                                                                        const info = $('<h6>').text(key + ': ' + name);
                                                                        infoDiv.append(info);
                                                               },
                                                               error: function (xhr, status, error) {
                                                                        console.error('Error fetching data for', key, ':', error);
                                                               }
                                                      });
                                             } else if (typeof value === 'object') {
                                                      const paragraph = $('<h6>').text(key + ":");
                                                      const list = $('<ul>');
                                                      for (const [k, v] of Object.entries(value)) {
                                                               $.ajax({
                                                                        url: v,
                                                                        method: 'GET',
                                                                        success: function (data) {
                                                                                 const name = data.name || data.title;
                                                                                 const listItem = $('<li>').text(name);
                                                                                 list.append(listItem);
                                                                        },
                                                                        error: function (xhr, status, error) {
                                                                                 console.error('Error fetching data for', key, ':', error);
                                                                        }
                                                               });

                                                      }
                                                      infoDiv.append(paragraph);
                                                      infoDiv.append(list);
                                             } else {
                                                      const info = $('<h6>').text(key + ': ' + value);
                                                      infoDiv.append(info);
                                             }
                                    });
                           },
                           error: function (xhr, status, error) {
                                    console.error('Error fetching data:', error);
                           }
                  });
         }

         sectionsList.on('click', '.api-button', function (event) {
                  resultDiv.empty();
                  infoDiv.empty();
                  event.preventDefault();
                  const url = $(this).attr('data-url');
                  getSectionData(url);
                  // Desliza a la pestaña test-swipe-2
                  $('#tabs').tabs('select', 'test-swipe-2');
         });

         resultDiv.on('click', '.api-item', function (event) {
                  infoDiv.empty();
                  event.preventDefault();
                  const url = $(this).attr('data-url');
                  getObjInfo(url);
                  // Desliza a la pestaña test-swipe-3
                  $('#tabs').tabs('select', 'test-swipe-3');
         });

         // Inicializa los tabs
         $('#tabs').tabs();

         // Obtén las secciones de la API al cargar la página
         getApiSections('https://swapi.dev/api/');
});
