$(document).ready(function () {
         loadDataTest1();
         $('#loadDataTest2').on('click', loadDataTest2);
         $('#loadDataTest3').on('click', loadDataTest3);
});

function loadDataTest1() {
         $.ajax({
                  url: 'https://www.swapi.tech/api/',
                  method: 'GET',
                  success: function (data) {
                           const keys = Object.keys(data);
                           const test1Collection = $("#test-1-collection");
                           test1Collection.empty();
                           const index = 0;
                           keys.forEach(key => {
                                    const subKeys = Object.keys(data[key]);
                                    subKeys.forEach(subKey => {
                                             while (index < 2) {
                                                      index++;
                                             }
                                             if (index >= 2) {
                                                      const link = $('<a>').attr('href', 'test2.html?key=' + subKey).text(subKey);
                                                      const li = $('<li>').addClass("collection-item").append(link);
                                                      test1Collection.append(li);
                                             }


                                    });
                           });
                  },
                  error: function (error) {
                           console.error('Error fetching data for Test 1:', error);
                  }
         });
}


function loadDataTest2() {
         $.ajax({
                  url: 'https://www.swapi.tech/api/',
                  method: 'GET',
                  success: function (data) {
                           const results = Object.entries(data).map(([key, value]) => ({ key, value }));

                           const test2Collection = $("#test-2-collection");
                           test2Collection.empty();

                           results.forEach(result => {
                                    const li = $('<li>').addClass("collection-item").text(`${result.key}: ${JSON.stringify(result.value)}`);
                                    test2Collection.append(li);
                           });
                  },
                  error: function (error) {
                           console.error('Error fetching data for Test 2:', error);
                  }
         });
}

function loadDataTest3() {
         $.ajax({
                  url: 'https://www.swapi.tech/api/',
                  method: 'GET',
                  success: function (data) {
                           const results = Object.entries(data).map(([key, value]) => ({ key, value }));

                           const test3Collection = $("#test-3-collection");
                           test3Collection.empty();

                           results.forEach(result => {
                                    const li = $('<li>').addClass("collection-item").text(`${result.key}: ${JSON.stringify(result.value)}`);
                                    test3Collection.append(li);
                           });
                  },
                  error: function (error) {
                           console.error('Error fetching data for Test 3:', error);
                  }
         });
}
