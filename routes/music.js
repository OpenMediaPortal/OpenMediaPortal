/**
 * @fileoverview Music music endpoint
 *
 * Also includes mongodb code
 *
 * @TODO Move mongodb code into a DAO
 * @TODO OOify this code
 *
 * @author ojourmel
 */

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;


/**
 * @const
 */
var OMPDB = 'omp';
/**
 * @const
 */
var MUSICCOL = 'musiccol';

/**
 * Use docker image name as the hostname of the mongodb server
 * @see docker-compose.yml
 */
var server = new Server('omp-mongo', 27017, {auto_reconnect: true});
var db = new Db('omp', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to " + OMPDB + " database");
        db.collection(MUSICCOL, {strict:true}, function(err, collection) {
            if (err) {
                console.log("The " + MUSICCOL + " collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

/**
 * get /music
 *
 */
exports.findAll = function(req, res) {
    db.collection(MUSICCOL, function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

/**
 * post /music/:id
 *
 * @TODO collection throws null pointer exception
 */
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving songs: ' + id);
    db.collection(MUSICCOL, function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

/**
 * post /music
 *
 * @TODO collection throws null pointer exception
 */
exports.addMusic = function(req, res) {
    var song = req.body;
    console.log('Adding song: ' + JSON.stringify(song));
    db.collection(MUSICCOL, function(err, collection) {
        collection.insert(song, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

/**
 * Put /music/:id
 *
 * @TODO collection throws null pointer exception
 */
exports.updateMusic = function(req, res) {
    var id = req.params.id;
    var song = req.body;
    console.log('Updating song: ' + id);
    console.log(JSON.stringify(song));
    db.collection(MUSICCOL, function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, song, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating song: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(song);
            }
        });
    });
}

/**
 * delete /music/:id
 *
 * @TODO collection throws null pointer exception
 */
exports.deleteMusic = function(req, res) {
    var id = req.params.id;
    console.log('Deleting song: ' + id);
    db.collection(MUSICCOL, function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var songs = [
    {
        name: "Hallelujah",
        year: "1984",
        artist: "Leonard Cohen",
        album: "Various Positions",
        label: "Columbia"
    },
    {
        name: "We are the Champions",
        year: "1977",
        artist: "Freddie Murcury",
        album: "We Will Rock You",
        label: "EMI"
    },
    {
        name: "Imagine",
        year: "1971",
        artist: "John Lennon",
        album: "Imagine",
        label: "Apple",
    }];

    db.collection(MUSICCOL, function(err, collection) {
        collection.insert(songs, {safe:true}, function(err, result) {});
    });

};
