// const express = require("express");
// const hbs = require("hbs");
// const { default: axios } = require("axios");

// const PORT = process.env.PORT || 8081;

// const app = express();

// app.set("view engine", "hbs");
// hbs.registerPartials(__dirname + '/views/', function(_err) {});
// hbs.registerHelper("list", (context, options) => {
//     let ret = "<ul>";

//     const entries = Object.entries(context);

//     entries.forEach(([key, value]) => {
//         ret = ret + "<li>" + options.fn({ key, value }) + "</li>";
//     });

//     return ret + "</ul>";
// });

// // const axios = require("axios").default;
// // const fs = require("fs");
// // const path = require("path");

// // app.set('view engine', 'pug');
// // app.set('views', './views');

// // const Handlebars = require("handlebars");
// // const Template = require("./template.handlebars");
// // var context = { title: "My New Post", body: "This is my first post!" };
// // var html = template(context);

// app.get("/", (_req, res) => {
//     res.render("template", {
//         title: "Home",
//     });
// });
// app.get("/covid19", (req, res) => {
//     // https://api.covid19api.com/countries
//     const countrySlug = req.query.country;

//     // Destructor
//     //
//     axios
//         .get("https://api.covid19api.com/countries")
//         .then(({ data: countries }) => {
//             axios
//                 .get("https://api.covid19api.com/summary")
//                 .then(({ data: { Countries } }) => {
//                     const currentCountry = Countries.find(
//                         (item) => item.Slug === countrySlug
//                     );

//                     if (currentCountry) delete currentCountry.Premium;

//                     console.log(currentCountry);

//                     res.render("covid-19", {
//                         title: currentCountry ?
//                             `Covid-19 in ${currentCountry.Country}` : `Covid-19`,
//                         countries,
//                         countryStats: currentCountry,
//                     });
//                 });
//         });

//     // https://api.covid19api.com/summary
// });
// app.get('/', function(_req, res) {
//     res.render('index', {
//         title: 'Washuppppp Bờ rô'

//     })
// })
// app.get('/homie', function(_req, res) {
//         res.render('homie/index', {
//             homies: [
//                 { name: 'SAA', age: 20, music: 'freestyle' },
//                 { name: 'Long', age: 22, music: 'r&b' },
//                 { name: 'Duong', age: 23, music: 'guitar' },
//             ]

//         })
//     })
// const render = (templateName, replacements) => {
//     let template = fs.readFileSync(
//         path.resolve(__dirname, "templates", `${templateName}.html`), { encoding: "utf-8" }
//     );

//     const object = {
//         name: 'windily',
//         age: 20,
//         sex: 'male',
//     };

//     Object.entries(object) === [
//         ["name", 'windily'],
//         ["age", 20],
//         ["sex", 'male'],
//     ];

//     Object.entries(replacements).forEach(([key, value]) => {
//         template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
//     });

//     return template;
// };




// Route
// app.get("/covid19", (_req, res) => {
//             const startsAt = Date.now();
//             axios
//                 .get("https://api.covid19api.com/stats")
//                 .then((value) => {
//                         res.contentType("text/html").send(
//                                 render("base", {
//                                         TITLE: "COVID-19 Stats",
//                                         BODY_CONTENT: `
//           <ul>
//             ${Object.entries(value.data)
//               .map(
//                 ([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`
//               )
//               .join("")}
//           </ul>
//         `,
//           LOAD_TIME: (Date.now() - startsAt) / 1e3,
//         })
//       );
//     })
//     .catch((error) => {
//       res.status(500).send(error);
//     });
// });
// app.get("/", (_req, res) => {
//     res.send(`${header("Home page")} ${footer()}`);
//   });

//   app.get("/404", (_req, res) => {
//     res.send(`${header("404")}`);
// //   });
// var server = app.listen(PORT, function() {

//     var host = server.address().address
//     var port = server.address().port

//     console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port)

// })
const express = require("express");
const hbs = require("hbs");
const { default: axios } = require("axios");

const PORT = process.env.PORT || 4000;

const app = express();
app.set("view engine", "hbs");

// Partial: https://handlebarsjs.com/guide/partials.html
hbs.registerPartials(__dirname + "/views", function(_error) {});

// https://handlebarsjs.com/guide/block-helpers.html#simple-iterators
// https://handlebarsjs.com/guide/builtin-helpers.html
hbs.registerHelper("list", (context, options) => {
    let ret = "<ul>";

    const entries = Object.entries(context);

    entries.forEach(([key, value]) => {
        ret = ret + "<li>" + options.fn({ key, value }) + "</li>";
    });

    return ret + "</ul>";
});

app.get("/", (_req, res) => {
    res.render("template", {
        title: "Home",
    });
});

app.get("/covid19", (req, res) => {
    // https://api.covid19api.com/countries
    const countrySlug = req.query.country;

    // Destructor
    //
    axios
        .get("https://api.covid19api.com/countries")
        .then(({ data: countries }) => {
            axios
                .get("https://api.covid19api.com/summary")
                .then(({ data: { Countries } }) => {
                    const currentCountry = Countries.find(
                        (item) => item.Slug === countrySlug
                    );

                    if (currentCountry) delete currentCountry.Premium;

                    console.log(currentCountry);

                    res.render("covid-19", {
                        title: currentCountry ?
                            `Covid-19 in ${currentCountry.Country}` : `Covid-19`,
                        countries,
                        countryStats: currentCountry,
                    });
                });
        });

    // https://api.covid19api.com/summary
});

const server = app.listen(PORT, () => {
    const port = server.address().port;

    console.log(`Server is running on port http://0.0.0.0:${port}`);
});