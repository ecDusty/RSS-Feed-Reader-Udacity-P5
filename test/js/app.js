'use strict';

/* global status, Handlebars, google */
/* app.js
 *
 * This is our RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object we can make
 * use of. It also uses the Handlebars templating library and
 * jQuery.
 */

// The names and URLs to all of the feeds we'd like available.
var allFeeds = [{
    name: 'Udacity Blog',
    url: 'http://blog.udacity.com/feed'
}, {
    name: 'CSS Tricks',
    url: 'http://feeds.feedburner.com/CssTricks'
}, {
    name: 'HTML5 Rocks',
    url: 'http://feeds.feedburner.com/html5rocks'
}, {
    name: 'Linear Digressions',
    url: 'http://feeds.feedburner.com/udacity-linear-digressions'
}];

/* This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 */
function init() {
    // Load the first feed we've defined (index of 0).
    loadFeed(0);
}

/* This function performs everything necessary to load a
 * feed using the Google Feed Reader API. It will then
 * perform all of the DOM operations required to display
 * feed entries on the page. Feeds are referenced by their
 * index position within the allFeeds array.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
 */
function loadFeed(id, cb) {
    var feedUrl = allFeeds[id].url,
        feedName = allFeeds[id].name;

    $.ajax({
        type: "POST",
        url: 'https://rsstojson.udacity.com/parseFeed',
        data: JSON.stringify({ url: feedUrl }),
        contentType: "application/json",
        success: function success(result) {
            var container = $('.feed'),
                title = $('.header-title'),
                entries = result.feed.entries,

            //entriesLen = entries.length,
            entryTemplate = Handlebars.compile($('.tpl-entry').html());

            title.html(feedName); // Set the header text
            container.empty(); // Empty out all previous entries
            /* Loop through the entries we just loaded via the Google
            * Feed Reader API. We'll then parse that entry against the
            * entryTemplate (created above using Handlebars) and append
            * the resulting HTML to the list of entries on the page.
            */
            entries.forEach(function (entry) {
                container.append(entryTemplate(entry));
            });

            if (cb) {
                cb();
            }
        },
        dataType: "json"
    });
}

/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 */
google.setOnLoadCallback(init);

/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 */
$(function () {
    // var container = $('.feed'),
    var feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        feedId = 0,
        menuIcon = $('.menu-icon-link');

    /* Loop through all of our feeds, assigning an id property to
     * each of the feeds based upon its index within the array.
     * Then parse that feed against the feedItemTemplate (created
     * above using Handlebars) and append it to the list of all
     * available feeds within the menu.
     */
    allFeeds.forEach(function (feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));

        feedId++;
    });

    /* When a link in our feedList is clicked on, we want to hide
     * the menu, load the feed, and prevent the default action
     * (following the link) from occurring.
     */
    feedList.on('click', 'a', function () {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });

    /* When the menu icon is clicked on, we need to toggle a class
     * on the body to perform the hiding/showing of our menu.
     */
    menuIcon.on('click', function () {
        $('body').toggleClass('menu-hidden');
    });
}());
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhbGxGZWVkcyIsIm5hbWUiLCJ1cmwiLCJpbml0IiwibG9hZEZlZWQiLCJpZCIsImNiIiwiZmVlZFVybCIsImZlZWROYW1lIiwiJCIsImFqYXgiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJjb250YWluZXIiLCJ0aXRsZSIsImVudHJpZXMiLCJmZWVkIiwiZW50cnlUZW1wbGF0ZSIsIkhhbmRsZWJhcnMiLCJjb21waWxlIiwiaHRtbCIsImVtcHR5IiwiZm9yRWFjaCIsImVudHJ5IiwiYXBwZW5kIiwiZGF0YVR5cGUiLCJnb29nbGUiLCJzZXRPbkxvYWRDYWxsYmFjayIsImZlZWRMaXN0IiwiZmVlZEl0ZW1UZW1wbGF0ZSIsImZlZWRJZCIsIm1lbnVJY29uIiwib24iLCJpdGVtIiwiYWRkQ2xhc3MiLCJ0b2dnbGVDbGFzcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0EsSUFBSUEsV0FBVyxDQUNYO0FBQ0lDLFVBQU0sY0FEVjtBQUVJQyxTQUFLO0FBRlQsQ0FEVyxFQUlSO0FBQ0NELFVBQU0sWUFEUDtBQUVDQyxTQUFLO0FBRk4sQ0FKUSxFQU9SO0FBQ0NELFVBQU0sYUFEUDtBQUVDQyxTQUFLO0FBRk4sQ0FQUSxFQVVSO0FBQ0NELFVBQU0sb0JBRFA7QUFFQ0MsU0FBSztBQUZOLENBVlEsQ0FBZjs7QUFnQkE7Ozs7QUFJQSxTQUFTQyxJQUFULEdBQWdCO0FBQ1o7QUFDQUMsYUFBUyxDQUFUO0FBQ0g7O0FBRUQ7Ozs7Ozs7O0FBUUMsU0FBU0EsUUFBVCxDQUFrQkMsRUFBbEIsRUFBc0JDLEVBQXRCLEVBQTBCO0FBQ3RCLFFBQUlDLFVBQVVQLFNBQVNLLEVBQVQsRUFBYUgsR0FBM0I7QUFBQSxRQUNJTSxXQUFXUixTQUFTSyxFQUFULEVBQWFKLElBRDVCOztBQUdBUSxNQUFFQyxJQUFGLENBQU87QUFDSkMsY0FBTSxNQURGO0FBRUpULGFBQUsseUNBRkQ7QUFHSlUsY0FBTUMsS0FBS0MsU0FBTCxDQUFlLEVBQUNaLEtBQUtLLE9BQU4sRUFBZixDQUhGO0FBSUpRLHFCQUFZLGtCQUpSO0FBS0pDLGlCQUFTLGlCQUFVQyxNQUFWLEVBQWlCO0FBQ2xCLGdCQUFJQyxZQUFZVCxFQUFFLE9BQUYsQ0FBaEI7QUFBQSxnQkFDSVUsUUFBUVYsRUFBRSxlQUFGLENBRFo7QUFBQSxnQkFFSVcsVUFBVUgsT0FBT0ksSUFBUCxDQUFZRCxPQUYxQjs7QUFHSTtBQUNBRSw0QkFBZ0JDLFdBQVdDLE9BQVgsQ0FBbUJmLEVBQUUsWUFBRixFQUFnQmdCLElBQWhCLEVBQW5CLENBSnBCOztBQU9BTixrQkFBTU0sSUFBTixDQUFXakIsUUFBWCxFQVJrQixDQVFNO0FBQ3hCVSxzQkFBVVEsS0FBVixHQVRrQixDQVNNO0FBQ3hCOzs7OztBQUtBTixvQkFBUU8sT0FBUixDQUFnQixVQUFTQyxLQUFULEVBQWdCO0FBQzVCViwwQkFBVVcsTUFBVixDQUFpQlAsY0FBY00sS0FBZCxDQUFqQjtBQUNILGFBRkQ7O0FBSUEsZ0JBQUl0QixFQUFKLEVBQVE7QUFDSkE7QUFDSDtBQUNKLFNBM0JEO0FBNEJKd0Isa0JBQVU7QUE1Qk4sS0FBUDtBQThCSDs7QUFFRjs7O0FBR0FDLE9BQU9DLGlCQUFQLENBQXlCN0IsSUFBekI7O0FBRUE7Ozs7QUFJQU0sRUFBRSxZQUFXO0FBQ1Y7QUFDQyxRQUFJd0IsV0FBV3hCLEVBQUUsWUFBRixDQUFmO0FBQUEsUUFDSXlCLG1CQUFtQlgsV0FBV0MsT0FBWCxDQUFtQmYsRUFBRSxxQkFBRixFQUF5QmdCLElBQXpCLEVBQW5CLENBRHZCO0FBQUEsUUFFSVUsU0FBUyxDQUZiO0FBQUEsUUFHSUMsV0FBVzNCLEVBQUUsaUJBQUYsQ0FIZjs7QUFLQTs7Ozs7O0FBTUFULGFBQVMyQixPQUFULENBQWlCLFVBQVNOLElBQVQsRUFBZTtBQUM1QkEsYUFBS2hCLEVBQUwsR0FBVThCLE1BQVY7QUFDQUYsaUJBQVNKLE1BQVQsQ0FBZ0JLLGlCQUFpQmIsSUFBakIsQ0FBaEI7O0FBRUFjO0FBQ0gsS0FMRDs7QUFPQTs7OztBQUlBRixhQUFTSSxFQUFULENBQVksT0FBWixFQUFxQixHQUFyQixFQUEwQixZQUFXO0FBQ2pDLFlBQUlDLE9BQU83QixFQUFFLElBQUYsQ0FBWDs7QUFFQUEsVUFBRSxNQUFGLEVBQVU4QixRQUFWLENBQW1CLGFBQW5CO0FBQ0FuQyxpQkFBU2tDLEtBQUsxQixJQUFMLENBQVUsSUFBVixDQUFUO0FBQ0EsZUFBTyxLQUFQO0FBQ0gsS0FORDs7QUFRQTs7O0FBR0F3QixhQUFTQyxFQUFULENBQVksT0FBWixFQUFxQixZQUFXO0FBQzVCNUIsVUFBRSxNQUFGLEVBQVUrQixXQUFWLENBQXNCLGFBQXRCO0FBQ0gsS0FGRDtBQUdILENBdENDLEVBQUYiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHN0YXR1cywgSGFuZGxlYmFycywgZ29vZ2xlICovXHJcbi8qIGFwcC5qc1xyXG4gKlxyXG4gKiBUaGlzIGlzIG91ciBSU1MgZmVlZCByZWFkZXIgYXBwbGljYXRpb24uIEl0IHVzZXMgdGhlIEdvb2dsZVxyXG4gKiBGZWVkIFJlYWRlciBBUEkgdG8gZ3JhYiBSU1MgZmVlZHMgYXMgSlNPTiBvYmplY3Qgd2UgY2FuIG1ha2VcclxuICogdXNlIG9mLiBJdCBhbHNvIHVzZXMgdGhlIEhhbmRsZWJhcnMgdGVtcGxhdGluZyBsaWJyYXJ5IGFuZFxyXG4gKiBqUXVlcnkuXHJcbiAqL1xyXG5cclxuLy8gVGhlIG5hbWVzIGFuZCBVUkxzIHRvIGFsbCBvZiB0aGUgZmVlZHMgd2UnZCBsaWtlIGF2YWlsYWJsZS5cclxudmFyIGFsbEZlZWRzID0gW1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6ICdVZGFjaXR5IEJsb2cnLFxyXG4gICAgICAgIHVybDogJ2h0dHA6Ly9ibG9nLnVkYWNpdHkuY29tL2ZlZWQnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NTUyBUcmlja3MnLFxyXG4gICAgICAgIHVybDogJ2h0dHA6Ly9mZWVkcy5mZWVkYnVybmVyLmNvbS9Dc3NUcmlja3MnXHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0hUTUw1IFJvY2tzJyxcclxuICAgICAgICB1cmw6ICdodHRwOi8vZmVlZHMuZmVlZGJ1cm5lci5jb20vaHRtbDVyb2NrcydcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnTGluZWFyIERpZ3Jlc3Npb25zJyxcclxuICAgICAgICB1cmw6ICdodHRwOi8vZmVlZHMuZmVlZGJ1cm5lci5jb20vdWRhY2l0eS1saW5lYXItZGlncmVzc2lvbnMnXHJcbiAgICB9XHJcbl07XHJcblxyXG4vKiBUaGlzIGZ1bmN0aW9uIHN0YXJ0cyB1cCBvdXIgYXBwbGljYXRpb24uIFRoZSBHb29nbGUgRmVlZFxyXG4gKiBSZWFkZXIgQVBJIGlzIGxvYWRlZCBhc3luY2hvbm91c2x5IGFuZCB3aWxsIHRoZW4gY2FsbCB0aGlzXHJcbiAqIGZ1bmN0aW9uIHdoZW4gdGhlIEFQSSBpcyBsb2FkZWQuXHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0KCkge1xyXG4gICAgLy8gTG9hZCB0aGUgZmlyc3QgZmVlZCB3ZSd2ZSBkZWZpbmVkIChpbmRleCBvZiAwKS5cclxuICAgIGxvYWRGZWVkKDApO1xyXG59XHJcblxyXG4vKiBUaGlzIGZ1bmN0aW9uIHBlcmZvcm1zIGV2ZXJ5dGhpbmcgbmVjZXNzYXJ5IHRvIGxvYWQgYVxyXG4gKiBmZWVkIHVzaW5nIHRoZSBHb29nbGUgRmVlZCBSZWFkZXIgQVBJLiBJdCB3aWxsIHRoZW5cclxuICogcGVyZm9ybSBhbGwgb2YgdGhlIERPTSBvcGVyYXRpb25zIHJlcXVpcmVkIHRvIGRpc3BsYXlcclxuICogZmVlZCBlbnRyaWVzIG9uIHRoZSBwYWdlLiBGZWVkcyBhcmUgcmVmZXJlbmNlZCBieSB0aGVpclxyXG4gKiBpbmRleCBwb3NpdGlvbiB3aXRoaW4gdGhlIGFsbEZlZWRzIGFycmF5LlxyXG4gKiBUaGlzIGZ1bmN0aW9uIGFsbCBzdXBwb3J0cyBhIGNhbGxiYWNrIGFzIHRoZSBzZWNvbmQgcGFyYW1ldGVyXHJcbiAqIHdoaWNoIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGV2ZXJ5dGhpbmcgaGFzIHJ1biBzdWNjZXNzZnVsbHkuXHJcbiAqL1xyXG4gZnVuY3Rpb24gbG9hZEZlZWQoaWQsIGNiKSB7XHJcbiAgICAgdmFyIGZlZWRVcmwgPSBhbGxGZWVkc1tpZF0udXJsLFxyXG4gICAgICAgICBmZWVkTmFtZSA9IGFsbEZlZWRzW2lkXS5uYW1lO1xyXG5cclxuICAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgIHVybDogJ2h0dHBzOi8vcnNzdG9qc29uLnVkYWNpdHkuY29tL3BhcnNlRmVlZCcsXHJcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe3VybDogZmVlZFVybH0pLFxyXG4gICAgICAgIGNvbnRlbnRUeXBlOlwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoJy5mZWVkJyksXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSAkKCcuaGVhZGVyLXRpdGxlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgZW50cmllcyA9IHJlc3VsdC5mZWVkLmVudHJpZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9lbnRyaWVzTGVuID0gZW50cmllcy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgZW50cnlUZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZSgkKCcudHBsLWVudHJ5JykuaHRtbCgpKTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgdGl0bGUuaHRtbChmZWVkTmFtZSk7ICAgLy8gU2V0IHRoZSBoZWFkZXIgdGV4dFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmVtcHR5KCk7ICAgICAgLy8gRW1wdHkgb3V0IGFsbCBwcmV2aW91cyBlbnRyaWVzXHJcbiAgICAgICAgICAgICAgICAvKiBMb29wIHRocm91Z2ggdGhlIGVudHJpZXMgd2UganVzdCBsb2FkZWQgdmlhIHRoZSBHb29nbGVcclxuICAgICAgICAgICAgICAgICogRmVlZCBSZWFkZXIgQVBJLiBXZSdsbCB0aGVuIHBhcnNlIHRoYXQgZW50cnkgYWdhaW5zdCB0aGVcclxuICAgICAgICAgICAgICAgICogZW50cnlUZW1wbGF0ZSAoY3JlYXRlZCBhYm92ZSB1c2luZyBIYW5kbGViYXJzKSBhbmQgYXBwZW5kXHJcbiAgICAgICAgICAgICAgICAqIHRoZSByZXN1bHRpbmcgSFRNTCB0byB0aGUgbGlzdCBvZiBlbnRyaWVzIG9uIHRoZSBwYWdlLlxyXG4gICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQoZW50cnlUZW1wbGF0ZShlbnRyeSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCJcclxuICAgICB9KTtcclxuIH1cclxuXHJcbi8qIEdvb2dsZSBBUEk6IExvYWRzIHRoZSBGZWVkIFJlYWRlciBBUEkgYW5kIGRlZmluZXMgd2hhdCBmdW5jdGlvblxyXG4gKiB0byBjYWxsIHdoZW4gdGhlIEZlZWQgUmVhZGVyIEFQSSBpcyBkb25lIGxvYWRpbmcuXHJcbiAqL1xyXG5nb29nbGUuc2V0T25Mb2FkQ2FsbGJhY2soaW5pdCk7XHJcblxyXG4vKiBBbGwgb2YgdGhpcyBmdW5jdGlvbmFsaXR5IGlzIGhlYXZpbHkgcmVsaWFudCB1cG9uIHRoZSBET00sIHNvIHdlXHJcbiAqIHBsYWNlIG91ciBjb2RlIGluIHRoZSAkKCkgZnVuY3Rpb24gdG8gZW5zdXJlIGl0IGRvZXNuJ3QgZXhlY3V0ZVxyXG4gKiB1bnRpbCB0aGUgRE9NIGlzIHJlYWR5LlxyXG4gKi9cclxuJChmdW5jdGlvbigpIHtcclxuICAgLy8gdmFyIGNvbnRhaW5lciA9ICQoJy5mZWVkJyksXHJcbiAgICBsZXQgZmVlZExpc3QgPSAkKCcuZmVlZC1saXN0JyksXHJcbiAgICAgICAgZmVlZEl0ZW1UZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZSgkKCcudHBsLWZlZWQtbGlzdC1pdGVtJykuaHRtbCgpKSxcclxuICAgICAgICBmZWVkSWQgPSAwLFxyXG4gICAgICAgIG1lbnVJY29uID0gJCgnLm1lbnUtaWNvbi1saW5rJyk7XHJcblxyXG4gICAgLyogTG9vcCB0aHJvdWdoIGFsbCBvZiBvdXIgZmVlZHMsIGFzc2lnbmluZyBhbiBpZCBwcm9wZXJ0eSB0b1xyXG4gICAgICogZWFjaCBvZiB0aGUgZmVlZHMgYmFzZWQgdXBvbiBpdHMgaW5kZXggd2l0aGluIHRoZSBhcnJheS5cclxuICAgICAqIFRoZW4gcGFyc2UgdGhhdCBmZWVkIGFnYWluc3QgdGhlIGZlZWRJdGVtVGVtcGxhdGUgKGNyZWF0ZWRcclxuICAgICAqIGFib3ZlIHVzaW5nIEhhbmRsZWJhcnMpIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGxpc3Qgb2YgYWxsXHJcbiAgICAgKiBhdmFpbGFibGUgZmVlZHMgd2l0aGluIHRoZSBtZW51LlxyXG4gICAgICovXHJcbiAgICBhbGxGZWVkcy5mb3JFYWNoKGZ1bmN0aW9uKGZlZWQpIHtcclxuICAgICAgICBmZWVkLmlkID0gZmVlZElkO1xyXG4gICAgICAgIGZlZWRMaXN0LmFwcGVuZChmZWVkSXRlbVRlbXBsYXRlKGZlZWQpKTtcclxuXHJcbiAgICAgICAgZmVlZElkKys7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiBXaGVuIGEgbGluayBpbiBvdXIgZmVlZExpc3QgaXMgY2xpY2tlZCBvbiwgd2Ugd2FudCB0byBoaWRlXHJcbiAgICAgKiB0aGUgbWVudSwgbG9hZCB0aGUgZmVlZCwgYW5kIHByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uXHJcbiAgICAgKiAoZm9sbG93aW5nIHRoZSBsaW5rKSBmcm9tIG9jY3VycmluZy5cclxuICAgICAqL1xyXG4gICAgZmVlZExpc3Qub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaXRlbSA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbWVudS1oaWRkZW4nKTtcclxuICAgICAgICBsb2FkRmVlZChpdGVtLmRhdGEoJ2lkJykpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qIFdoZW4gdGhlIG1lbnUgaWNvbiBpcyBjbGlja2VkIG9uLCB3ZSBuZWVkIHRvIHRvZ2dsZSBhIGNsYXNzXHJcbiAgICAgKiBvbiB0aGUgYm9keSB0byBwZXJmb3JtIHRoZSBoaWRpbmcvc2hvd2luZyBvZiBvdXIgbWVudS5cclxuICAgICAqL1xyXG4gICAgbWVudUljb24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtZW51LWhpZGRlbicpO1xyXG4gICAgfSk7XHJcbn0oKSk7XHJcbiJdfQ==
