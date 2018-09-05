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
     * empty.
     */
        it('are defined', function() {
            expect(allFeeds).toBeTruthy();
            expect(allFeeds.length).not.toBe(0);
        });


        /* The test function allows for the feedList to grow or shrink and still test 
         * the entirety of allFeeds so that all the required data is included.
         * Making sure that the property is defined and not empty
         */
        function feedCheck(value) {
            for (const feed of allFeeds) {
                it(`The Feed id:${feed.id} has a ${value}`, function() {
                    expect(feed[value]).toBeDefined();
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

    /* Test to ensure that the menu works properly
     * 
     */
    describe('The Menu Check', function() {
        let mBody,
            menuIcon;

        beforeEach(function() {
            // Setting up the elements that'll be used by the tests in this suite
            mBody = $('body');
            menuIcon = $('.menu-icon-link');
        })

        

        /* Test that ensures the menu element is
            * hidden by default. You'll have to analyze the HTML and
            * the CSS to determine how we're performing the
            * hiding/showing of the menu element.
            */
        it('Is hidden on start', function() {
            expect(mBody.hasClass('menu-hidden')).toBe(true);
        })

        /* Test that ensures the menu changes
         */
        it('Shows & hides upon a click', function() {
            menuIcon.click();
            expect(mBody.hasClass('menu-hidden')).toBe(false);
            
            menuIcon.click();
            expect(mBody.hasClass('menu-hidden')).toBe(true);
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
                expect($(this).hasClass('hide-description')).toBeTruthy();
            })
            done();
        })

        /* Test to see if description texts are shown & hidden when drop-down-icon is clicked.
         * This looks to see if the hide-description class has been removed on first click, and added on the second.
         */
        it('Article description shows on click, then hides again', function(done) {
            var feed_item = $('.feed .entry-link').first(),
                drop_down_icon = $('.feed .entry-link').first().find('.drop-down-icon');

            drop_down_icon.click();
            expect(feed_item.hasClass('hide-description')).toBeFalsy();

            drop_down_icon.click();
            expect(feed_item.hasClass('hide-description')).toBeTruthy();

            done();;
        })
    })

    

    describe('New Feed Selection Check', function() {
        var Current_Title;
    
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {

            function testCallBack() {
                $('.header-title').html(''); //Set title to null, which will be reset by the async data loaded
                Current_Title = $('.header-title').html(); //Save title for comparison
                loadFeed(1,done); //Load the feed for a second round. Simulating a click
            }
            
           /* Have the feed load for the first time
            * than call back the Test function which will reset the title, than load the feed again with a new data set.
            */
            loadFeed(0,testCallBack); //Simulates app start.
        })

        // The Testing part
        it('New info from feed updated', function(done) {
            expect($('.header-title').html()).not.toBe(Current_Title);
            done();
        })
    })
}())
