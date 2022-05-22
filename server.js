const express = require('express')
const app = express()
app.set('view engine', 'ejs');


app.listen(1989, (err) => {
    if (err) console.log(err);
})

/**
 * req = request object, res = response object
 */
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + 'index.html');
// })

/**
 * Sends what is in public if link/route does not match.
 */
app.use(express.static('./public'));

const https = require('https');

app.get('/profile/:id', function (req, res) {

    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    data = ""
    https.get(url, function(https_res) {
        https_res.on("data", function(chunk) {
            data += chunk
        })

        https_res.on("end", function() {
            parsed_data = JSON.parse(data)

            hp = parsed_data.stats.filter((object) => {
                return object.stat.name == "hp"
            }).map((hpfinder) => {
                return hpfinder.base_stat
            })

            //alternatively, instead of chaining the map function above, simply use hp[0].base_stat to get the hp base stat

            attack = parsed_data.stats.filter((object) => {
                return object.stat.name == "attack"
            }).map((atkfinder) => {
                return atkfinder.base_stat
            })

            defense = parsed_data.stats.filter((object) => {
                return object.stat.name == "defense"
            }).map((deffinder) => {
                return deffinder.base_stat
            })

            special_attack = parsed_data.stats.filter((object) => {
                return object.stat.name == "special-attack"
            }).map((specatkfinder) => {
                return specatkfinder.base_stat
            })

            special_defense = parsed_data.stats.filter((object) => {
                return object.stat.name == "special-defense"
            }).map((specdeffinder) => {
                return specdeffinder.base_stat
            })

            speed = parsed_data.stats.filter((object) => {
                return object.stat.name == "speed"
            }).map((speedfinder) => {
                return speedfinder.base_stat
            })

            res.render("profile.ejs", {
                "id": req.params.id,
                "name": parsed_data.name,
                "hp": hp,
                "attack": attack,
                "defense": defense,
                "special_attack": special_attack,
                "special_defense": special_defense,
                "speed": speed
            })
        })
    });

})