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
            $('.entry-link').on('click', '.drop-down-icon', function () {
                $(this).parent().toggleClass('hide-description');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhbGxGZWVkcyIsIm5hbWUiLCJ1cmwiLCJpbml0IiwibG9hZEZlZWQiLCJpZCIsImNiIiwiZmVlZFVybCIsImZlZWROYW1lIiwiJCIsImFqYXgiLCJ0eXBlIiwiZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb250ZW50VHlwZSIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJjb250YWluZXIiLCJ0aXRsZSIsImVudHJpZXMiLCJmZWVkIiwiZW50cnlUZW1wbGF0ZSIsIkhhbmRsZWJhcnMiLCJjb21waWxlIiwiaHRtbCIsImVtcHR5IiwiZm9yRWFjaCIsImVudHJ5IiwiYXBwZW5kIiwib24iLCJwYXJlbnQiLCJ0b2dnbGVDbGFzcyIsImRhdGFUeXBlIiwiZ29vZ2xlIiwic2V0T25Mb2FkQ2FsbGJhY2siLCJmZWVkTGlzdCIsImZlZWRJdGVtVGVtcGxhdGUiLCJmZWVkSWQiLCJtZW51SWNvbiIsIml0ZW0iLCJhZGRDbGFzcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0EsSUFBSUEsV0FBVyxDQUNYO0FBQ0lDLFVBQU0sY0FEVjtBQUVJQyxTQUFLO0FBRlQsQ0FEVyxFQUlSO0FBQ0NELFVBQU0sWUFEUDtBQUVDQyxTQUFLO0FBRk4sQ0FKUSxFQU9SO0FBQ0NELFVBQU0sYUFEUDtBQUVDQyxTQUFLO0FBRk4sQ0FQUSxFQVVSO0FBQ0NELFVBQU0sb0JBRFA7QUFFQ0MsU0FBSztBQUZOLENBVlEsQ0FBZjs7QUFnQkE7Ozs7QUFJQSxTQUFTQyxJQUFULEdBQWdCO0FBQ1o7QUFDQUMsYUFBUyxDQUFUO0FBQ0g7O0FBRUQ7Ozs7Ozs7O0FBUUMsU0FBU0EsUUFBVCxDQUFrQkMsRUFBbEIsRUFBc0JDLEVBQXRCLEVBQTBCO0FBQ3RCLFFBQUlDLFVBQVVQLFNBQVNLLEVBQVQsRUFBYUgsR0FBM0I7QUFBQSxRQUNJTSxXQUFXUixTQUFTSyxFQUFULEVBQWFKLElBRDVCOztBQUdBUSxNQUFFQyxJQUFGLENBQU87QUFDSkMsY0FBTSxNQURGO0FBRUpULGFBQUsseUNBRkQ7QUFHSlUsY0FBTUMsS0FBS0MsU0FBTCxDQUFlLEVBQUNaLEtBQUtLLE9BQU4sRUFBZixDQUhGO0FBSUpRLHFCQUFZLGtCQUpSO0FBS0pDLGlCQUFTLGlCQUFVQyxNQUFWLEVBQWlCO0FBQ2xCLGdCQUFJQyxZQUFZVCxFQUFFLE9BQUYsQ0FBaEI7QUFBQSxnQkFDSVUsUUFBUVYsRUFBRSxlQUFGLENBRFo7QUFBQSxnQkFFSVcsVUFBVUgsT0FBT0ksSUFBUCxDQUFZRCxPQUYxQjs7QUFHSTtBQUNBRSw0QkFBZ0JDLFdBQVdDLE9BQVgsQ0FBbUJmLEVBQUUsWUFBRixFQUFnQmdCLElBQWhCLEVBQW5CLENBSnBCOztBQU9BTixrQkFBTU0sSUFBTixDQUFXakIsUUFBWCxFQVJrQixDQVFNO0FBQ3hCVSxzQkFBVVEsS0FBVixHQVRrQixDQVNNO0FBQ3hCOzs7Ozs7QUFNQU4sb0JBQVFPLE9BQVIsQ0FBZ0IsVUFBU0MsS0FBVCxFQUFnQjtBQUM1QlYsMEJBQVVXLE1BQVYsQ0FBaUJQLGNBQWNNLEtBQWQsQ0FBakI7QUFDSCxhQUZEO0FBR0FuQixjQUFFLGFBQUYsRUFBaUJxQixFQUFqQixDQUFvQixPQUFwQixFQUE0QixpQkFBNUIsRUFBOEMsWUFBVztBQUNyRHJCLGtCQUFFLElBQUYsRUFBUXNCLE1BQVIsR0FBaUJDLFdBQWpCLENBQTZCLGtCQUE3QjtBQUNILGFBRkQ7O0FBSUEsZ0JBQUkxQixFQUFKLEVBQVE7QUFDSkE7QUFDSDtBQUNKLFNBL0JEO0FBZ0NKMkIsa0JBQVU7QUFoQ04sS0FBUDtBQWtDSDs7QUFFRjs7O0FBR0FDLE9BQU9DLGlCQUFQLENBQXlCaEMsSUFBekI7O0FBRUE7Ozs7QUFJQU0sRUFBRSxZQUFXO0FBQ1Y7QUFDQyxRQUFJMkIsV0FBVzNCLEVBQUUsWUFBRixDQUFmO0FBQUEsUUFDSTRCLG1CQUFtQmQsV0FBV0MsT0FBWCxDQUFtQmYsRUFBRSxxQkFBRixFQUF5QmdCLElBQXpCLEVBQW5CLENBRHZCO0FBQUEsUUFFSWEsU0FBUyxDQUZiO0FBQUEsUUFHSUMsV0FBVzlCLEVBQUUsaUJBQUYsQ0FIZjs7QUFNQTs7Ozs7O0FBTUFULGFBQVMyQixPQUFULENBQWlCLFVBQVNOLElBQVQsRUFBZTtBQUM1QkEsYUFBS2hCLEVBQUwsR0FBVWlDLE1BQVY7QUFDQUYsaUJBQVNQLE1BQVQsQ0FBZ0JRLGlCQUFpQmhCLElBQWpCLENBQWhCOztBQUVBaUI7QUFDSCxLQUxEOztBQU9BOzs7O0FBSUFGLGFBQVNOLEVBQVQsQ0FBWSxPQUFaLEVBQXFCLEdBQXJCLEVBQTBCLFlBQVc7QUFDakMsWUFBSVUsT0FBTy9CLEVBQUUsSUFBRixDQUFYOztBQUVBQSxVQUFFLE1BQUYsRUFBVWdDLFFBQVYsQ0FBbUIsYUFBbkI7QUFDQXJDLGlCQUFTb0MsS0FBSzVCLElBQUwsQ0FBVSxJQUFWLENBQVQ7QUFDQSxlQUFPLEtBQVA7QUFDSCxLQU5EOztBQVFBOzs7QUFHQTJCLGFBQVNULEVBQVQsQ0FBWSxPQUFaLEVBQXFCLFlBQVc7QUFDNUJyQixVQUFFLE1BQUYsRUFBVXVCLFdBQVYsQ0FBc0IsYUFBdEI7QUFDSCxLQUZEO0FBR0gsQ0F2Q0MsRUFBRiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWwgc3RhdHVzLCBIYW5kbGViYXJzLCBnb29nbGUgKi9cclxuLyogYXBwLmpzXHJcbiAqXHJcbiAqIFRoaXMgaXMgb3VyIFJTUyBmZWVkIHJlYWRlciBhcHBsaWNhdGlvbi4gSXQgdXNlcyB0aGUgR29vZ2xlXHJcbiAqIEZlZWQgUmVhZGVyIEFQSSB0byBncmFiIFJTUyBmZWVkcyBhcyBKU09OIG9iamVjdCB3ZSBjYW4gbWFrZVxyXG4gKiB1c2Ugb2YuIEl0IGFsc28gdXNlcyB0aGUgSGFuZGxlYmFycyB0ZW1wbGF0aW5nIGxpYnJhcnkgYW5kXHJcbiAqIGpRdWVyeS5cclxuICovXHJcblxyXG4vLyBUaGUgbmFtZXMgYW5kIFVSTHMgdG8gYWxsIG9mIHRoZSBmZWVkcyB3ZSdkIGxpa2UgYXZhaWxhYmxlLlxyXG52YXIgYWxsRmVlZHMgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgbmFtZTogJ1VkYWNpdHkgQmxvZycsXHJcbiAgICAgICAgdXJsOiAnaHR0cDovL2Jsb2cudWRhY2l0eS5jb20vZmVlZCdcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ1NTIFRyaWNrcycsXHJcbiAgICAgICAgdXJsOiAnaHR0cDovL2ZlZWRzLmZlZWRidXJuZXIuY29tL0Nzc1RyaWNrcydcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnSFRNTDUgUm9ja3MnLFxyXG4gICAgICAgIHVybDogJ2h0dHA6Ly9mZWVkcy5mZWVkYnVybmVyLmNvbS9odG1sNXJvY2tzJ1xyXG4gICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdMaW5lYXIgRGlncmVzc2lvbnMnLFxyXG4gICAgICAgIHVybDogJ2h0dHA6Ly9mZWVkcy5mZWVkYnVybmVyLmNvbS91ZGFjaXR5LWxpbmVhci1kaWdyZXNzaW9ucydcclxuICAgIH1cclxuXTtcclxuXHJcbi8qIFRoaXMgZnVuY3Rpb24gc3RhcnRzIHVwIG91ciBhcHBsaWNhdGlvbi4gVGhlIEdvb2dsZSBGZWVkXHJcbiAqIFJlYWRlciBBUEkgaXMgbG9hZGVkIGFzeW5jaG9ub3VzbHkgYW5kIHdpbGwgdGhlbiBjYWxsIHRoaXNcclxuICogZnVuY3Rpb24gd2hlbiB0aGUgQVBJIGlzIGxvYWRlZC5cclxuICovXHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAvLyBMb2FkIHRoZSBmaXJzdCBmZWVkIHdlJ3ZlIGRlZmluZWQgKGluZGV4IG9mIDApLlxyXG4gICAgbG9hZEZlZWQoMCk7XHJcbn1cclxuXHJcbi8qIFRoaXMgZnVuY3Rpb24gcGVyZm9ybXMgZXZlcnl0aGluZyBuZWNlc3NhcnkgdG8gbG9hZCBhXHJcbiAqIGZlZWQgdXNpbmcgdGhlIEdvb2dsZSBGZWVkIFJlYWRlciBBUEkuIEl0IHdpbGwgdGhlblxyXG4gKiBwZXJmb3JtIGFsbCBvZiB0aGUgRE9NIG9wZXJhdGlvbnMgcmVxdWlyZWQgdG8gZGlzcGxheVxyXG4gKiBmZWVkIGVudHJpZXMgb24gdGhlIHBhZ2UuIEZlZWRzIGFyZSByZWZlcmVuY2VkIGJ5IHRoZWlyXHJcbiAqIGluZGV4IHBvc2l0aW9uIHdpdGhpbiB0aGUgYWxsRmVlZHMgYXJyYXkuXHJcbiAqIFRoaXMgZnVuY3Rpb24gYWxsIHN1cHBvcnRzIGEgY2FsbGJhY2sgYXMgdGhlIHNlY29uZCBwYXJhbWV0ZXJcclxuICogd2hpY2ggd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgZXZlcnl0aGluZyBoYXMgcnVuIHN1Y2Nlc3NmdWxseS5cclxuICovXHJcbiBmdW5jdGlvbiBsb2FkRmVlZChpZCwgY2IpIHtcclxuICAgICB2YXIgZmVlZFVybCA9IGFsbEZlZWRzW2lkXS51cmwsXHJcbiAgICAgICAgIGZlZWROYW1lID0gYWxsRmVlZHNbaWRdLm5hbWU7XHJcblxyXG4gICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgdXJsOiAnaHR0cHM6Ly9yc3N0b2pzb24udWRhY2l0eS5jb20vcGFyc2VGZWVkJyxcclxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7dXJsOiBmZWVkVXJsfSksXHJcbiAgICAgICAgY29udGVudFR5cGU6XCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJCgnLmZlZWQnKSxcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZSA9ICQoJy5oZWFkZXItdGl0bGUnKSxcclxuICAgICAgICAgICAgICAgICAgICBlbnRyaWVzID0gcmVzdWx0LmZlZWQuZW50cmllcyxcclxuICAgICAgICAgICAgICAgICAgICAvL2VudHJpZXNMZW4gPSBlbnRyaWVzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgICBlbnRyeVRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKCQoJy50cGwtZW50cnknKS5odG1sKCkpO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB0aXRsZS5odG1sKGZlZWROYW1lKTsgICAvLyBTZXQgdGhlIGhlYWRlciB0ZXh0XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuZW1wdHkoKTsgICAgICAvLyBFbXB0eSBvdXQgYWxsIHByZXZpb3VzIGVudHJpZXNcclxuICAgICAgICAgICAgICAgIC8qIExvb3AgdGhyb3VnaCB0aGUgZW50cmllcyB3ZSBqdXN0IGxvYWRlZCB2aWEgdGhlIEdvb2dsZVxyXG4gICAgICAgICAgICAgICAgKiBGZWVkIFJlYWRlciBBUEkuIFdlJ2xsIHRoZW4gcGFyc2UgdGhhdCBlbnRyeSBhZ2FpbnN0IHRoZVxyXG4gICAgICAgICAgICAgICAgKiBlbnRyeVRlbXBsYXRlIChjcmVhdGVkIGFib3ZlIHVzaW5nIEhhbmRsZWJhcnMpIGFuZCBhcHBlbmRcclxuICAgICAgICAgICAgICAgICogdGhlIHJlc3VsdGluZyBIVE1MIHRvIHRoZSBsaXN0IG9mIGVudHJpZXMgb24gdGhlIHBhZ2UuXHJcbiAgICAgICAgICAgICAgICAqL1xyXG5cclxuICAgICAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQoZW50cnlUZW1wbGF0ZShlbnRyeSkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAkKCcuZW50cnktbGluaycpLm9uKCdjbGljaycsJy5kcm9wLWRvd24taWNvbicsZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnaGlkZS1kZXNjcmlwdGlvbicpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIlxyXG4gICAgIH0pO1xyXG4gfVxyXG5cclxuLyogR29vZ2xlIEFQSTogTG9hZHMgdGhlIEZlZWQgUmVhZGVyIEFQSSBhbmQgZGVmaW5lcyB3aGF0IGZ1bmN0aW9uXHJcbiAqIHRvIGNhbGwgd2hlbiB0aGUgRmVlZCBSZWFkZXIgQVBJIGlzIGRvbmUgbG9hZGluZy5cclxuICovXHJcbmdvb2dsZS5zZXRPbkxvYWRDYWxsYmFjayhpbml0KTtcclxuXHJcbi8qIEFsbCBvZiB0aGlzIGZ1bmN0aW9uYWxpdHkgaXMgaGVhdmlseSByZWxpYW50IHVwb24gdGhlIERPTSwgc28gd2VcclxuICogcGxhY2Ugb3VyIGNvZGUgaW4gdGhlICQoKSBmdW5jdGlvbiB0byBlbnN1cmUgaXQgZG9lc24ndCBleGVjdXRlXHJcbiAqIHVudGlsIHRoZSBET00gaXMgcmVhZHkuXHJcbiAqL1xyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAvLyB2YXIgY29udGFpbmVyID0gJCgnLmZlZWQnKSxcclxuICAgIGxldCBmZWVkTGlzdCA9ICQoJy5mZWVkLWxpc3QnKSxcclxuICAgICAgICBmZWVkSXRlbVRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKCQoJy50cGwtZmVlZC1saXN0LWl0ZW0nKS5odG1sKCkpLFxyXG4gICAgICAgIGZlZWRJZCA9IDAsXHJcbiAgICAgICAgbWVudUljb24gPSAkKCcubWVudS1pY29uLWxpbmsnKTtcclxuXHJcblxyXG4gICAgLyogTG9vcCB0aHJvdWdoIGFsbCBvZiBvdXIgZmVlZHMsIGFzc2lnbmluZyBhbiBpZCBwcm9wZXJ0eSB0b1xyXG4gICAgICogZWFjaCBvZiB0aGUgZmVlZHMgYmFzZWQgdXBvbiBpdHMgaW5kZXggd2l0aGluIHRoZSBhcnJheS5cclxuICAgICAqIFRoZW4gcGFyc2UgdGhhdCBmZWVkIGFnYWluc3QgdGhlIGZlZWRJdGVtVGVtcGxhdGUgKGNyZWF0ZWRcclxuICAgICAqIGFib3ZlIHVzaW5nIEhhbmRsZWJhcnMpIGFuZCBhcHBlbmQgaXQgdG8gdGhlIGxpc3Qgb2YgYWxsXHJcbiAgICAgKiBhdmFpbGFibGUgZmVlZHMgd2l0aGluIHRoZSBtZW51LlxyXG4gICAgICovXHJcbiAgICBhbGxGZWVkcy5mb3JFYWNoKGZ1bmN0aW9uKGZlZWQpIHtcclxuICAgICAgICBmZWVkLmlkID0gZmVlZElkO1xyXG4gICAgICAgIGZlZWRMaXN0LmFwcGVuZChmZWVkSXRlbVRlbXBsYXRlKGZlZWQpKTtcclxuXHJcbiAgICAgICAgZmVlZElkKys7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiBXaGVuIGEgbGluayBpbiBvdXIgZmVlZExpc3QgaXMgY2xpY2tlZCBvbiwgd2Ugd2FudCB0byBoaWRlXHJcbiAgICAgKiB0aGUgbWVudSwgbG9hZCB0aGUgZmVlZCwgYW5kIHByZXZlbnQgdGhlIGRlZmF1bHQgYWN0aW9uXHJcbiAgICAgKiAoZm9sbG93aW5nIHRoZSBsaW5rKSBmcm9tIG9jY3VycmluZy5cclxuICAgICAqL1xyXG4gICAgZmVlZExpc3Qub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgaXRlbSA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbWVudS1oaWRkZW4nKTtcclxuICAgICAgICBsb2FkRmVlZChpdGVtLmRhdGEoJ2lkJykpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qIFdoZW4gdGhlIG1lbnUgaWNvbiBpcyBjbGlja2VkIG9uLCB3ZSBuZWVkIHRvIHRvZ2dsZSBhIGNsYXNzXHJcbiAgICAgKiBvbiB0aGUgYm9keSB0byBwZXJmb3JtIHRoZSBoaWRpbmcvc2hvd2luZyBvZiBvdXIgbWVudS5cclxuICAgICAqL1xyXG4gICAgbWVudUljb24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtZW51LWhpZGRlbicpO1xyXG4gICAgfSk7XHJcbn0oKSk7XHJcbiJdfQ==
