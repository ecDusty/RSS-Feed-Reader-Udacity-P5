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
    describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        function feedCheck(value) {
            for (const feed of allFeeds) {
                expect(feed).toBeDefined();
                expect(feed[value]).not.toBeNull();
            }
        }

        it('Feeds have URLs', function() {
            feedCheck('url');
        })

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('Feeds have Names', function() {
            feedCheck('name');
        })
    });


    describe('The menu', function() {
    /* TODO: Write a new test suite named "The menu" */
        let mBodyClassList,
            menuIcon;

        /* TODO: Write a test that ensures the menu element is
            * hidden by default. You'll have to analyze the HTML and
            * the CSS to determine how we're performing the
            * hiding/showing of the menu element.
            */
        beforeEach(function() {
            mBodyClassList = document.getElementsByTagName('body')[0].classList
            menuIcon = document.getElementsByClassName('menu-icon-link')[0]

        })
        it('The Menu Is hidden on start', function() {
            expect(mBodyClassList.contains('menu-hidden')).toBe(true)
        });
            /* TODO: Write a test that ensures the menu changes
            * visibility when the menu icon is clicked. This test
            * should have two expectations: does the menu display when
            * clicked and does it hide when clicked again.
            */
        it('The Menu shows & hides upon a click', function() {

            menuIcon.click()
            expect(mBodyClassList.contains('menu-hidden')).toBe(false)
            
            menuIcon.click()
            expect(mBodyClassList.contains('menu-hidden')).toBe(true)
        });

    })



    describe('Initial Entries', function() {
       /* TODO: Write a new test suite named "Initial Entries" */
        let mBodyClassList

        beforeEach(function(done) {
            mBodyClassList = document.getElementsByTagName('body')[0].classList
            loadFeed(0,done)
        })

        
       /* TODO: Write a test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        it('The Async Articles load with data', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0)
            expect($('.feed .entry h2').first()[0].innerHTML).not.toBeNull()
            done()
        })
    
    })

    

    describe('New Feed Selection', function() {
        var feedList,
            Current_Title;
        /* TODO: Write a new test suite named "New Feed Selection" */
    
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            feedList = $('.feed-list')
            
            feedList.on('click','a',function() {
                // var done_that = done_this,
                var    feed = $(this);
                Current_Title = $('.header-title').html()
                
                console.log('Click happened, title is: \n' + Current_Title + '\n')
                loadFeed(feed.data('id'),done)
            })
        });

        it('are defined', function(done) {
            console.log('This is the pages live title'+$('.header-title').html())
            console.log('This was the old title' + Current_Title)
            expect($('.header-title').html()).not.toBe(Current_Title)
            done()
        });
    });
}());
