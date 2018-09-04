/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
   /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds Check', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
        it('are defined', function() {
            expect(allFeeds).toBeTruthy();
            expect(allFeeds.length).not.toBe(0);
        });


        /* The test function allows for the feedList to grow or shrink and still test the entirety of allFeeds so that all the required data is included. */
        function feedCheck(value) {
            for (const feed of allFeeds) {
                it('Feed '+ feed +' has a ' + value, function() {
                    expect(feed[value]).not.toBe('');
                })
            }
        }
        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        feedCheck('url');

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        feedCheck('name');
    });


    describe('The Menu Check', function() {
    /* TODO: Write a new test suite named "The menu" */
        let mBodyClassList,
            menuIcon;

        beforeEach(function() {
            // Setting up the elements that'll be used by the tests in this suite
            mBodyClassList = document.getElementsByTagName('body')[0].classList;
            menuIcon = document.getElementsByClassName('menu-icon-link')[0];
        })

        

        /* TODO: Write a test that ensures the menu element is
            * hidden by default. You'll have to analyze the HTML and
            * the CSS to determine how we're performing the
            * hiding/showing of the menu element.
            */
        it('Is hidden on start', function() {
            expect(mBodyClassList.contains('menu-hidden')).toBe(true);
        })

        /* TODO: Write a test that ensures the menu changes
            * visibility when the menu icon is clicked. This test
            * should have two expectations: does the menu display when
            * clicked and does it hide when clicked again.
            */
        it('Shows & hides upon a click', function() {
            menuIcon.click();
            expect(mBodyClassList.contains('menu-hidden')).toBe(false);
            
            menuIcon.click();
            expect(mBodyClassList.contains('menu-hidden')).toBe(true);
        })
    })



    describe('Initial Entries Check', function() {
        let feedEnt;

        beforeAll(function(done) {
            loadFeed(0,done);
        })

       /* Test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        it('The async articles have loaded', function(done) {
            feedEnt = $('.feed .entry');
            expect(feedEnt[0]).toBeTruthy();
            expect(feedEnt.length).toBeGreaterThan(0);
            done();
        })


        it('The async article loads with Title data', function(done) {
            feedEnt = $('.feed .entry');
            expect(feedEnt.find('h2').html()).not.toBe('');
            done();
        })

       /* Test that ensures when the loadFeed
        * The description text is loaded with the titles
        */
        it('The async articles load with description data', function(done) {
            feedEnt = $('.feed .entry');
            feedEnt.each(function(){
                expect($(this).find('p')[0]).toBeTruthy();
                expect($(this).find('p').html()).not.toBe('');
            })
            done();
        })

        /* Test to ensure all RSS feed articles have included a link.
         */
        it('The articles came with links', function(done) {
            $('.feed .entry-link a').each(function(){
                expect($(this).attr('href')).not.toBe('');
            })
            done();
        })

        /* Test to all description texts are hidden when feeds are loaded.
         * To ensure that the description text is hidden, make sure the hide-description class is added to the div.entry-link element
         */
        it('Each article description is hidden on load', function(done) {
            $('.feed .entry-link').each(function(){
                expect($(this)[0].classList.contains('hide-description')).toBeTruthy();
            })
            done();
        })

        /* Test to see if description texts are shown & hidden when drop-down-icon is clicked.
         * This looks to see if the hide-description class has been removed on first click, and added on the second.
         */
        it('Article description shows on click, then hides again', function(done) {
            var feed_item = $('.feed .entry-link')[0],
                drop_down_icon = $('.feed .entry-link').find('.drop-down-icon')[0];

            drop_down_icon.click();
            expect(feed_item.classList.contains('hide-description')).toBeFalsy();

            drop_down_icon.click();
            expect(feed_item.classList.contains('hide-description')).toBeTruthy();

            done();;
        })
    })

    

    describe('New Feed Selection Check', function() {
        var feedList,
            Current_Title;
    
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         * 
         * It's important to note that this test will fail, if the menu isn't tested fast enough (As jasmine has a timer to fail a test if it doens't pass within a certain time).
         */
        beforeEach(function(done) {
            feedList = $('.feed-list');
            

            feedList.on('click','a',function() {
                const feed = $(this);
                $('.header-title').html(''); //Set title to null, which will be reset by the async data loaded
                Current_Title = $('.header-title').html(); //Save title for comparison
                loadFeed(feed.data('id'),done);
            })
        })

        // The Testing part
        it('New info from feed updated', function(done) {
            expect($('.header-title').html()).not.toBe(Current_Title);
            done();
        })
    })
}())
