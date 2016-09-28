var express = require('express');
var fortune = require('./lib/fortune.js');


var app = express();

var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));



//var fortunes = [
//    "Conquer your fears or they will conquer you.",
//    "Rivers need springs.",
//    "Do not fear what you don't know.",
//    "You will have a pleasant surprise.",
//    "Whenever possible, keep it simple."
//];


app.use(function (req, res, next) {
    res.locals.showTeste = app.get('env') !== 'production' && req.query.text === '1';
    next();
});



//路由
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    //var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: fortune.getFortune() });
});

//视图引擎取到了页面 会默认返回200 所以404和500要单独设置状态码
//404 catch-all 处理器 (中间件)
app.use(function (req, res,next) {
    res.status(404);
    res.render('404');
});

//500 错误处理器 (中间件)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + ';press Ctrl-C to terminate');
});