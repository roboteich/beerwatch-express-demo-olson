var config = {};

config.host = process.env.HOST || "https://icf-ironworks-229.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "mHMgX4Crq5x3Z6B2wuLEbOHBJyDuUY5e6EbClh+A7QpV6m89fjl2a8NaXGM2H0gxWDpojDyg4FYhbRqUguE+Rw==";
config.databaseId = "icf-olson-hackathon15";
config.collections = {
    beer:"beer",
    activity:"activity",
    rating:"ratings",
    user:"users"
};

module.exports = config;