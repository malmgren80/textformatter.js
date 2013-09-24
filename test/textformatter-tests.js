var should = require('should'),
    formatter = require('../textformatter.js');

describe('text formatter tests', function(){
	describe('when supplying parameter', function() {
    	var formattedText = formatter.format('Current year {0}', 2013);

        it('should return formatted string', function() {
            formattedText.should.equal('Current year 2013');
        });
    });

    describe('when supplying multiple parameters', function() {
    	var formattedText = formatter.format('{0} is a fine number. {1} is not as great as {0}', 1337, 1336);

        it('should return formatted string', function() {
            formattedText.should.equal('1337 is a fine number. 1336 is not as great as 1337');
        });
    });

    describe('when supplying format without parameter', function() {
    	var formattedText = formatter.format('Current year {0}');

        it('should not format string', function() {
            formattedText.should.equal('Current year {0}');
        });
    });

    describe('when supplying parameter with pattern set', function() {
    	var formattedText,
    		someDate = new Date(2013,8,24);
        
        formatter.setFormat('year', function (date) {
        	return date.getFullYear();
        });
		formattedText = formatter.format('Current year {0:year}', someDate);

        it('should return formatted string', function() {
            formattedText.should.equal('Current year 2013');
        });
    });

    describe('can mix parameters with and without pattern', function() {
    	var formattedText,
    		someDate = new Date(2013,8,24);
        
        formatter.setFormat('year', function (date) {
        	return date.getFullYear();
        });
		formattedText = formatter.format('Current year {0:year}. A number: {1}', someDate, 1337);

        it('should return formatted string', function() {
            formattedText.should.equal('Current year 2013. A number: 1337');
        });
    });

    describe('when pattern is missing', function() {
    	var formattedText,
    		someDate = new Date(2013,8,24);
        
		formattedText = formatter.format('Current year {0:unknownFormat}', someDate);

        it('should return unformatted string', function() {
            formattedText.should.equal('Current year ' + someDate);
        });
    });
});