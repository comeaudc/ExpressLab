const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3003;

const links = {
    "Home": "http://localhost:3000/",
    "Honda": "http://localhost:3000/honda",
    "Harley": "http://localhost:3000/harley",
    "Victory": "http://localhost:3000/victory",
    "Indian": "http://localhost:3000/indian",
    "Maine": "http://localhost:3000/maine",
    "Washington": "http://localhost:3000/washington",
    "New York": "http://localhost:3000/ny",
    "MA": "http://localhost:3000/ma",
    "Contact Us": "http://localhost:3000/contact"
};

const fs = require('fs')
app.engine('hypatia', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if(err) return callback(err)

        const rendered = content.toString()
            .replace('#title#', options.title)
            .replace('#message#', options.message)
            .replace('#content#', options.content)
            .replace('#display#', options.display)
            .replace('#fact#', options.fact)
            .replace('#image#', `<img src="${options.picture}" height="600">`)
            .replace('#links#', function(){
                let x = [];
                for(key in links){
                    x.push(`<a href="${links[key]}">${key}</a> `)
                }
                return x.join(' ')
            })
        
        // const linked = (links) => for(key in links){
        //     content.toString
        // }

        return callback(null, rendered)
    })
})

app.set('views', './template') // specify the views directory
app.set('view engine', 'hypatia') // register the hypatia view engine

app.get('/', (req, res) => {
    res.render('template', { title: 'Index', message: 'Welcome to the Homepage!', content: 'Home page, huh, get it?', picture: "https://foyr.com/learn/wp-content/uploads/2021/08/design-your-dream-home.jpg"} )
})

app.get('/honda', (req, res) => {
    res.render('template', { title: 'Honda', message: 'Honda is the coolest of custom!', content: 'Cheap and easy to build!', picture: "https://cdn.shopify.com/s/files/1/0847/8734/articles/Jack_Daniels.jpg?v=1567713158"} )
})
app.get('/harley', (req, res) => {
    res.render('template', { title: 'Harley-Davidson', message: 'Harleys are cool too!', content: 'But too dam expensive!', picture: "https://cdn1.mecum.com/auctions/lv0120/lv0120-391294/images/2-1572904686346@2x.jpg?1576276364000"} )
})
app.get('/victory', (req, res) => {
    res.render('template', { title: 'Victory', message: 'Victory RIP', content: 'Very Cool Cruisers, but was bought out and closed by Indian', picture: "https://s1.cdn.autoevolution.com/images/news/2012-victory-high-ball-bobber-preview-30038_1.jpg"} )
})

app.get('/indian', (req, res) => {
    res.render('template', { title: 'Indian', message: 'Indian Motorcycles', content: 'Oldest Motorcycle Company In US', picture:"https://cdn1.polaris.com/globalassets/indian/2022/home/build-your-own-3.jpg?v=9e56a1dd"} )
})

app.get('/maine', (req, res) => {
    res.render('pages', { title: 'Maine', message: 'Maine', content: 'Vacation Land', fact: 'Maine has over 32,000 miles of rivers and streams.', picture:"https://cdn.britannica.com/69/2269-050-C7C3CFAF/Maine-state-flags-military-troops-flag-arms-1820.jpg"} )
})

app.get('/washington', (req, res) => {
    res.render('pages', { title: 'Washington', message: 'Washington', content: 'Eureka!!!', fact: 'Washington has the lasgest ferry public transportation system in the US!', picture:"https://cdn.shopify.com/s/files/1/0554/9375/5059/products/state-flag-washington_640x.jpg?v=1618965574"} )
})

app.get('/ny', (req, res) => {
    res.render('pages', { title: 'New York', message: 'New York', content: 'Excelsior!', fact: 'New York Is the Birthplace of LGBTQ+ Rights in the USA.', picture:"https://www.crwflags.com/fotw/images/u/us-ny.gif"} )
})

app.get('/ma', (req, res) => {
    res.render('pages', { title: 'Massauchusetts', message: 'Massachusetts', content: 'Ense petit placidam sub libertate quietem', fact: 'MA is also known as the Baked Bean State!', picture:"https://cdn.britannica.com/45/2345-004-CA9B0D10/flag-pine-tree-Massachusetts-state-field-arms-1971.jpg"} )
})

app.get('/contact', (req, res) => {
    res.render('template', { title: 'Contact Us', message: 'Contact Us!!!', content: "Please Don't", picture: "https://t4.ftcdn.net/jpg/01/63/86/59/360_F_163865908_9wMXnrAan1Hb3i2FD5jX2Udkd0gH8b77.jpg"} )
})

app.listen(port, () => {
    console.log(`I am listening on port`, port)
})