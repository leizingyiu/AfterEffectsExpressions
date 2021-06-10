let debuging = true;
console.log = debuging ? console.log : (() => void 0);

/** 页面标题设置 */
document.querySelector('#title').innerText = document.title.replace(/ /g, '\n');

/* 获取 location.search 并且转换成 Object */
function getSearchJson() {
    let search = location.search ? location.search : '';
    if (arguments.length == 1) {
        search = arguments[0];
    }
    let param = {};
    search.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
        param[v] = decodeURIComponent(k);
        return k + '=' + v;
    });
    return param;
};
var search = getSearchJson();
var pathname = String(location.pathname.match(/\/.*\//)).replace(/^null$/, '');

/* 获取网址关于语言的参数 */
function getLangSuffixFromSearch() {
    var search = getSearchJson();
    let langSuffix = '';
    if (search.hasOwnProperty('lang')) {
        langSuffix = document.getElementById('langSelector').innerText.indexOf(search.lang) != -1 && search
            .lang != '中文' ? '' + search.lang : '';
    }
    return langSuffix;
}

/* 发送请求的函数 */
function sendGETRequest(url, urlReplaceObj, type, callback) {
    let xhr = new XMLHttpRequest();

    console.log(urlReplaceObj);
    console.log((JSON.stringify(urlReplaceObj) != "{}") && urlReplaceObj != undefined);

    if (JSON.stringify(urlReplaceObj) != "{}" && urlReplaceObj != undefined) {
        let urlReplaceObjKey = Object.keys(urlReplaceObj);
        for (let i in urlReplaceObjKey) {
            url = url.replace(urlReplaceObjKey[i], urlReplaceObj[urlReplaceObjKey[i]]);
        }
    }
    xhr.open('GET', url);
    xhr.responseType = type;
    let arg = [...arguments];
    arg.pop();
    xhr.onload = function () {
        // console.log(url);
        // console.log(xhr['status']);
        callback(...arg, xhr);

    };
    xhr.send();
};

/* 读取到请求返回后写页面 */
var writeMarkDown = function (cssSelector, fn) {
    return function () {
        var content = arguments[arguments.length - 1]['response'];
        var status = arguments[arguments.length - 1]['status'];
        //if (status == 200) {
        document.querySelector(cssSelector).innerHTML = fn(marked(content));
        //} else {
        //document.querySelector(cssSelector).innerText = '\n(´ﾟдﾟ`)\n 这个页面还没做，快了快了\n (๑•́ ₃ •̀๑)';
        //}
    }
};

var writeHtml = function (cssSelector) {
    return function () {
        var content = arguments[arguments.length - 1]['response'];
        var status = arguments[arguments.length - 1]['status'];
        if (status == 200) {
            document.querySelector(cssSelector).innerHTML = (content);
        } else {
            document.querySelector(cssSelector).innerText = ' (´ﾟдﾟ`) 这个页面还没做，快了快了 (๑•́ ₃ •̀๑)';
        }
    }
};


/* lazy loading start */
var imgs = document.querySelectorAll('img');
function isIn(el) {
    var bound = el.getBoundingClientRect();
    var clientHeight = window.innerHeight;
    return bound.top <= clientHeight;
}
function loadImg(el) {
    if (!el.src) {
        var source = el.dataset.src;
        el.src = source;
    }
}
function checkLazyLoading() {
    imgs = document.querySelectorAll('img');
    Array.from(imgs).forEach(function (el) {
        if (isIn(el)) {
            loadImg(el);
        }
    });
    videos = document.querySelectorAll('video');
    Array.from(videos).forEach(function (el) {
        if (isIn(el)) {
            loadImg(el);
        }
    });
}
function clickImgEnlarge() {
    let imgs = document.querySelectorAll('img');

    [...imgs].map(function (img) {
        img.style.cursor = 'zoom-in';
        img.onclick = function () {
            let div = document.createElement('div');
            div.style = `
width:100%;
height:100%;
position:fixed;
top:0;
left:0;
background:rgba(0,0,0,0.8);
cursor:zoom-out;
`;

            let i = document.createElement('img');
            i.src = img.src;
            i.style = `
max-width:90vw;
max-height:90vh;
position:fixed;
top:50%;
left:50%;
transform: translate(-50%,-50%);
cursor:zoom-out;
`;

            div.onclick = i.onclick = function () {
                div.parentElement.removeChild(div);
            }

            document.body.appendChild(div);
            div.appendChild(i);
        }

    });
}
window.onload = window.onscroll = document.querySelector('.markdown-body').onscroll = function () {
    checkLazyLoading();
    clickImgEnlarge();
}
var observer = new MutationObserver(mutations => {
    checkLazyLoading();
})
observer.observe(document.querySelector('html'), {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
});

/* lazy loading end */


/* 读取md内容，对md内容修改再写入 */

function imgSrcToLocal(content) {
    return location.host.match(/\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}/g) ? content.replace(/(?<=<img.*?src=['"])(https:\/\/leizingyiu\.github\.io\/afterEffectsPresets)([^'"]*)(?=['"][^>]+>)/g, '..$2') : content;
}
/* TODO!!!  */
function imgSrcToOnline(content) {
    // let a = content.match(/(?<=<((img)|(video)).*?src=['"])(\.\.)(?=[^'"]*['"][^>]+>)/g);
    // console.log(a);
    // let b = content.replace(/(?<=<((img)|(video)).*?src=['"])(\.\.)(?=[^'"]*['"][^>]+>)/g, '$1'); console.log(b);
    // let c = content.replace(/(?<=<((img)|(video)).*?src=['"])(\.\.)(?=[^'"]*['"][^>]+>)/g, location.protocol + "//" + location.hostname + location.pathname); console.log(c);

    return location.host.match(/\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}/g) ? content : content.replace(/(?<=<((img)|(video)).*?src=['"])(\.\.)(?=[^'"]*['"][^>]+>)/g, location.protocol + "//" + location.hostname + location.pathname);
}

function imgSrcToDataSrc(content) {
    return content.replace(/(<img.*)(src=['"][^'"]*['"][^>]+>)/g, '$1 data-$2');
}

function imgZoonToWidth(content) {
    return content.replace(/(<img[^>]*style=['"].*?)(zoom)([^>]*>)/g, '$1width$3');
}

/* 从content 获取 expressionn  并写入 */
var contentHeaderDom = document.querySelector('#content section');
var titleDom = document.querySelector('#content h1');
var descriptionDom = document.querySelector('#content p');
var expressionsDom = document.querySelector('#expression');
function writeTitleAndExpressions(content) {
    var tempDiv = document.createElement('div');
    tempDiv.className = 'temp'; tempDiv.style.width = '1px'; tempDiv.style.height = '1px'; tempDiv.innerHTML = content;
    document.querySelector('body').appendChild(tempDiv);


    if (tempDiv.querySelector('#parameter') != null) {

        var parameter = '';
        try {
            parameter = JSON.parse(tempDiv.querySelector('#parameter').innerHTML);
        } catch (err) {
            contentHeaderDom.style.display = 'none';
            console.log('#parameter error');
            return content;
        }
        contentHeaderDom.style.display = 'inherit';
        console.log(parameter);

        titleDom.innerText = parameter.hasOwnProperty('title') ? parameter['title'] : '';
        titleDom.style.display = parameter.hasOwnProperty('title') ? titleDom.style.display : 'none';

        descriptionDom.innerText = parameter.hasOwnProperty('description') ? parameter['description'] : '';
        descriptionDom.style.display = parameter.hasOwnProperty('description') ? descriptionDom.style.display : 'none';


        expressionsDom.innerHTML = '';
        if (parameter.hasOwnProperty('expressions')) {
            Object.keys(parameter['expressions']).map(js => (function () {

                let div = document.createElement('div');
                let pre = document.createElement('pre');
                let copyButton = document.createElement('button');
                copyButton.innerText = copyButton.className = 'copy';

                let buttonArr = [], n = 0;
                let buttonFn = function (text, target) {
                    buttonArr[buttonArr.length] = document.createElement('button');
                    buttonArr[buttonArr.length - 1].innerText = text;
                    buttonArr[buttonArr.length - 1].setAttribute('target', target);
                    buttonArr[buttonArr.length - 1].setAttribute('style', 'bottom:' + (1 + n * 3) + 'rem;');
                    n = n + 1;
                    buttonArr[buttonArr.length - 1].onclick = function () {
                        let form = document.createElement('form');
                        form.setAttribute('method', 'get');
                        form.setAttribute('action', this.getAttribute('target'));
                        document.body.appendChild(form);
                        form.submit();
                        form.parentElement.removeChild(form);
                    };
                }
                Object.keys(parameter['expressions'][js]).map((key, idx) => (function () {
                    if (parameter['expressions'][js][key] instanceof Array) {
                        parameter['expressions'][js][key].map(v => (function () {
                            let text = key + ' ' + v.match(/(?<=\.).*/);
                            let target = '..' + pathname + '/' + key + '/' + v;
                            buttonFn(text, target);
                        })())
                    } else {
                        let text = key + ' ' + parameter['expressions'][js][key].match(/(?<=\.).*/);
                        let target = '..' + pathname + '/' + key + '/' + parameter['expressions'][js][key];
                        buttonFn(text, target);
                    }
                })())

                let expressionUrl = '..' + pathname + '/expressions/' + js;
                console.log(expressionUrl);

                let script = '';
                /**读取js，写入expressions */

                sendGETRequest(expressionUrl, {}, 'text', function () {
                    var content = arguments[arguments.length - 1]['response'];
                    var status = arguments[arguments.length - 1]['status'];
                    script = status == '200' ? content : '大概是写错东西了吧。･ﾟ･(つд`ﾟ)･ﾟ･';
                    pre.innerText = script;
                    div.setAttribute('title', js); /**这里设置expression的标题 */
                    expressionsDom.appendChild(div);
                    div.appendChild(pre);

                    copyButton.onclick = function () {
                        copyStr(script)
                    };
                    div.appendChild(copyButton);

                    buttonArr.map(b => (function () {
                        div.appendChild(b);
                    })());
                });



            })());
        }
    }


    tempDiv.parentElement.removeChild(tempDiv);
    //console.log(content);
    return content;
}

function solveError(content) {
    let err = content.match(/<title>Error<\/title>/g);
    if (err != null) {
        content = '<p style=" width:100%; text-align:center; line-height:2em;"> (´ﾟдﾟ`)    </br> 这个页面还没做，快了快了 </br>    (๑•́ ₃ •̀๑) </p>';
        contentHeaderDom.style.display = 'none';
        expressionsDom.innerHTML = content;

    } else {
        contentHeaderDom.style.display = 'block';
    }
    return content;
}

function refreshMathJax(content) {
    let before = '<img src="http://latex.codecogs.com/gif.latex?';
    let after = '"/>';
    //console.log(content);
    return content.replace(/\$\$([\s\S]*?)\$\$/g, '<br>' + before + '$1' + after + '<br>');
}

function replaceMarkedHTML() {
    var arg = arguments;
    return function (content) {
        for (let i = 0; i < arg.length; i++) {
            content = arg[i](content);
        }
        return content;
    }
}




function typingH1WhenHomePage(content) {
    console.log(pathname == '');
    content = pathname == '' ? content + `
    < script >
    function typing(selector) {
        let dom = document.querySelector(selector);
        if ('undefined' == typeof i) {
            i = 0;
        }
        if ('undefined' == typeof timer) {
            timer = 0;
        }
        if ('undefined' == typeof str) {
            str = dom.innerText.replace(/\n/g, '➾');
        }
        if (i <= str.length) {
            dom.innerHTML = str.slice(0, i++).replace(/➾/g, '<br>') + '_';
            let ranTime = Math.random() * 100;
            var nextTyping = function() {
                    typing(selector)
                };
            timer = setTimeout(nextTyping, ranTime)
        } else {
            dom.innerHTML = str.replace(/➾/g, '<br>');
            clearTimeout(timer)
        }
    };
    typing('.markdown-body h1')
    < /script >
    ` : content;
    console.log(content);
    return content;
}

function preCopyButton(content) {
    //console.log(content);
    content = content.replace(/<pre>/g, '<pre onclick="copyStr(this.innerText)">');
    //console.log(content);
    return content;
}
var htmlReplacement = replaceMarkedHTML(imgSrcToLocal, imgSrcToOnline, imgSrcToDataSrc, imgZoonToWidth, writeTitleAndExpressions, refreshMathJax, preCopyButton, solveError);
/* 读取md内容，对md内容修改再写入 */


/* 文章选择 */
/*var contents = document.getElementById('contents');
[...contents.querySelectorAll('li a')].map(i => i.onclick = function () {
    let langSuffix = getLangSuffixFromSearch();
    window.history.replaceState({}, null, '?content=' + i.innerText + (langSuffix != '' ? '&lang=' +
        langSuffix : ''));
    sendGETRequest('./contents/' + i.innerText + '.md', {}, 'text', writeMarkDown('#content div', htmlReplacement));

    //document.querySelector('#main').className = 'detail';
});*/


var catalog = document.getElementById('catalog');
[...catalog.querySelectorAll('dl')].map(dl => (function () {
    dl.querySelector('dt').innerText = dl.id;
    [...dl.querySelectorAll('li a')].map(i => i.onclick = function () {
        let langSuffix = getLangSuffixFromSearch();
        window.history.replaceState({}, null, '?' + dl.id + '=' + i.innerText + (langSuffix != '' ? '&lang=' +
            langSuffix : ''));
        sendGETRequest('./' + dl.id + '/' + i.innerText + '.md', {}, 'text', writeMarkDown('#content div', htmlReplacement));

        //document.querySelector('#main').className = 'detail';
    })
})())

/**页面加载时如果url存在参数，读取参数指向的内容， */
Object.keys(search).map(key => (function () {
    Object.keys(search).map(key => (function () {
        if (document.querySelector('#' + key)) {
            sendGETRequest('./' + key + '/' + search[key] + '.md', {}, 'text', writeMarkDown('#content div', htmlReplacement));
        }
    })());
})());

if (Object.keys(search).length == 0) {
    sendGETRequest('./contents/index.md', {}, 'text', writeMarkDown('#content div', htmlReplacement));

}

/* catalog ul dt onclick */
var catalogDt = document.querySelectorAll('#catalog dt');
[...catalogDt].map(i => i.onclick = function () {
    console.log(this);
    i.parentElement.className = i.parentElement.className == '' ? 'fold' : '';
})




/* 复制函数 */
function copyStr(str) {
    let a = document.createElement("textarea");
    a.value = str;
    document.body.appendChild(a);
    a.select();
    let maxLength = 300;
    let resultBoo = window.confirm('将以下内容复制到剪贴板?\n' + (str.length > maxLength ? str.substr(0, maxLength) + '......' : str));
    if (resultBoo == true) {
        document.execCommand("Copy");
    }
    a.style.display = "none";
    return resultBoo;
};



/* 语言选择 */
/*
var langSelector = document.getElementById('langSelector');
[...langSelector.querySelectorAll('li a')].map(i => i.onclick = function () {

    // 选择器class变更
    [...langSelector.querySelectorAll('li a')].map(j => j.className = 'off');
    this.className = 'on';

    search = getSearchJson();
    window.history.replaceState({}, null, '?content=' + search.browsing + '&lang=' + i.innerText);
    sendGETRequest('./contents/' + search['content'] + '.md', {},
        'text', writeMarkDown('#content div', htmlReplacement));

    document.querySelector('#main').className = 'detail';
});
*/


/* 添加页脚 */
//sendGETRequest('./footer/footer.html', {}, 'text', writeHtml('#footer'));



// /*  滚动条美化  */
// let timer = null;
// let scrollDomSelector = 'body';
// let scrollingClassName = 'scrolling';
// document.querySelector(scrollDomSelector).onscroll = function () {
//     clearTimeout(timer) // 每次滚动前 清除一次
//     timer = setTimeout("Data()", 500);
//     m1 = document.documentElement.scrollTop || document.body.scrollTop;
//     document.querySelector(scrollDomSelector).className = scrollingClassName;
//     //console.log(scrollDomSelector + 'isScrolling');
// }
// function Data() {
//     m2 = document.documentElement.scrollTop || document.body.scrollTop;
//     if (m2 == m1) {
//         //console.log('滚动结束了');
//         document.querySelector(scrollDomSelector).className = document.querySelector(scrollDomSelector).className.replace(RegExp(scrollingClassName, 'g'), '');

//     }
// }
/*  滚动条美化  */
