/**
 * Created by jgpro_000 on 06/09/14.
 */
define([], function() {
    describe("A testing suite to validate geographical co ordinates", function() {
        var co = {lat: 51.505918, long: -0.095383};
        it("should not be null", function() {
            expect(co).not.toBe(null);
        });
        it("should be defined", function() {
            expect(co).toBeDefined();
        });
        it("should be defined", function() {
            expect(co).toBeDefined();
        });
        it("lat should be more than -90 and less than 90", function() {
            expect(co.lat > -90 && co.lat < 90).toBeTruthy();
        });
        it("long should be more than -180 and less than 180", function() {
            expect(co.long > -180 && co.lat < 180).toBeTruthy();
        });
    });
    describe("A testing suite to validate email addresses", function() {
        var email = "1@1.com";
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var test = re.test(email);
        it("should not be null", function() {
            expect(email).not.toBe(null);
        });
        it("should be defined", function() {
            expect(email).toBeDefined();
        });
        it("should be defined", function() {
            expect(email).toBeDefined();
        });
        it("should be true", function() {
            expect(test).toBeTruthy();
        });
    });
});