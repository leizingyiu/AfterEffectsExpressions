var debuging = false;
debuging = location.host.match(/[a-zA-Z]/g) ? debuging : true;
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
var hostAndPath = location.host.match(/[a-zA-Z]/g) ? 'https://cdn.jsdelivr.net/gh/leizingyiu/AfterEffectsExpressions/' : '..' + String(location.pathname.match(/\/.*\//)).replace(/^null$/, '');
console.log(hostAndPath);

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

    // console.log(urlReplaceObj);
    // console.log((JSON.stringify(urlReplaceObj) != "{}") && urlReplaceObj != undefined);

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
var writeMarkDown = function (cssSelector, fn, callback) {
    return function () {
        var content = arguments[arguments.length - 1]['response'];
        var status = arguments[arguments.length - 1]['status'];
        var filename = decodeURIComponent(arguments[arguments.length - 1]['responseURL']).match(/(?<=\/)[^\/]+$/g);
        if (status != '200' || content == '') {
            document.querySelector(cssSelector).innerHTML = ' (´ﾟдﾟ`) 这个页面还没做，快了快了 (๑•́ ₃ •̀๑)';
        } else {
            document.querySelector(cssSelector).innerHTML = "<title>" + filename + "</title>" + fn(marked(content));
        }
        if ("undefined" != typeof callback) {
            callback();
        }
    }
};

var writeHtml = function (cssSelector, fn) {
    return function () {
        var content = arguments[arguments.length - 1]['response'];
        var status = arguments[arguments.length - 1]['status'];
        if (status == 200) {
            document.querySelector(cssSelector).innerHTML = fn(content);
        } else {
            document.querySelector(cssSelector).innerText = ' (´ﾟдﾟ`) 这个页面还没做，快了快了 (๑•́ ₃ •̀๑)';
        }
    }
};


/* lazy loading start */{
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

    /**img click enlarge start */
    function clickImgEnlarge() {
        let imgId = 'zooming';
        let divId = "zoomingImg";


        let imgs = document.querySelectorAll('img');
        [...imgs].map(function (img) {
            img.style.cursor = 'zoom-in';
            img.onclick = function () { enlargeImg(img); };
        });

        function enlargeImg(img) {
            img.id = imgId;
            var zoominImgClass = 'zoomin';
            var hideDivClass = 'hide';
            var onImgDivClass = 'onImg';

            console.log("document.querySelector('#' + divId) " + document.querySelector('#' + divId));
            if (document.querySelector('#' + divId) == null) {
                var div = document.createElement('div');
                div.setAttribute('display', '');
                div.id = divId;
                div.addEventListener('click',
                    function () {
                        window.event.stopPropagation()
                        console.log(1)
                        div.classList.toggle(hideDivClass);
                        console.log(2)
                        console.log(Date())
                        return false;
                    }, false);
            } else {
                div = document.getElementById(divId);
            }
            console.log("div.querySelector('img')" + div.querySelector('img'));
            if (div.querySelector('img') == null) {
                var i = document.createElement('img');
                i.setAttribute('display', '');
                i.addEventListener('click',
                    function imgRealSize() {
                        window.event.stopPropagation()
                        console.log(3);
                        if (i.className.indexOf(onImgDivClass) == -1) {
                            i.classList.toggle(zoominImgClass);
                        }
                        console.log(4);
                        console.log(Date())
                        return false;
                    }, false);
                i.addEventListener('mouseover',
                    function () {
                        window.event.stopPropagation();
                        i.parentElement.classList.add(onImgDivClass);
                        return false;
                    }, false);
                i.addEventListener('mouseleave',
                    function () {
                        window.event.stopPropagation();
                        i.parentElement.classList.remove(onImgDivClass);
                        return false;
                    }, false);
            } else {
                i = div.getElementsByTagName('img')[0];
            }




            i.src = img.src;
            div.setAttribute('alt', img.alt ? img.alt : ' ');

            if (document.querySelector('#' + divId) == null) {
                document.body.appendChild(div);
                div.appendChild(i);
            } else {
                div.classList.remove(hideDivClass);
            }
        }
    }
    function switchImage(leftBoolean) {
        var imgId = 'zooming';
        var divId = "zoomingImg";
        var index = '';
        var imgs = document.querySelectorAll('img');
        var div = document.querySelector('#' + divId);
        console.log(document.querySelector('#' + divId));
        if (div != null) {

            [...imgs].map((img, idx) => (function () {
                if (img.id == imgId) {
                    index = idx;
                }
            })());
            console.log(index);
            if (index !== '') {
                console.log(document.querySelector('#' + divId + ' img'));
                let targetImg;

                if (leftBoolean == true && index != 0) {
                    targetImg = imgs[index - 1];
                } else if (leftBoolean == true && index == 0) {
                    return false;
                } else {
                    targetImg = imgs[index + 1];
                }

                console.log(imgs[index] + '\n' + targetImg);
                if (!targetImg.src) {
                    targetImg.src = targetImg.getAttribute('data-src');
                }
                if (targetImg.currentSrc.indexOf(location.hostname) != -1) {
                    imgs[index].id = '';
                    targetImg.id = imgId;
                    document.querySelector('#' + divId + ' img').src = targetImg.src;
                    console.log(targetImg.alt);
                    div.setAttribute('alt', targetImg.alt);
                    console.log(div.alt);
                }
            }
        }
    }

    function keyboard(event) {
        let keycode = event.keyCode;
        if (keycode == 37) {
            console.log("⬅️");
            switchImage(true);
        }
        if (keycode == 39) {
            console.log("➡️");
            switchImage(false);
        }
    }/**img click enlarge end */

    document.addEventListener("keydown", keyboard);

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
}

/* lazy loading  /  img click enlarge end */


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

    return location.host.match(/\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}/g) ? content : content.replace(/(?<=<((img)|(video)).*?src=['"])(\.\.)(?=[^'"]*['"][^>]+>)/g, hostAndPath);
    /*location.protocol + "//" + location.hostname + location.pathname*/
}

function imgSrcToDataSrc(content) {
    return content.replace(/(<img.*)(src=['"][^'"]*['"][^>]*>)/g, '$1 data-$2');
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
        expressionsDom.style.display = 'flex';
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
                            let target = hostAndPath + '/' + key + '/' + v;
                            buttonFn(text, target);
                        })())
                    } else {
                        let text = key + ' ' + parameter['expressions'][js][key].match(/(?<=\.).*/);
                        let target = hostAndPath + '/' + key + '/' + parameter['expressions'][js][key];
                        buttonFn(text, target);
                    }
                })())

                let expressionUrl = hostAndPath + '/expressions/' + js;
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
                        console.log('click copy button');
                        copyOrNotWithUrl(script);
                    };
                    div.appendChild(copyButton);

                    buttonArr.map(b => (function () {
                        div.appendChild(b);
                    })());
                });



            })());
        }
    }

    tempDiv.setAttribute('style', 'display:none!important')
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
    return content.replace(/\$\$([\s\S]*?)\$\$/g, '<br>' + before + '$1' + after + '<br>');
}
function preCopyButton(content) {
    content = content.replace(/<pre>/g, '<pre onclick="copyOrNotWithUrl(this.innerText)">');
    return content;
}

function pageCatalogAnchorAddingAfterTagNames() {
    let selectorReg = RegExp('(' + [...arguments].map(arg => '(<' + arg + ' )').join('|') + ')([^<]*)(</)?', 'g');
    let argUpper = arguments;
    console.log(arguments.length);
    console.log(selectorReg);
    return function (content) {
        let args = [...argUpper];
        let catalogAttrName = 'data-catalog-id';
        if (content.match(selectorReg)) {
            content.match(selectorReg).map(function (d, idx) {
                content = content.replace(d, d.replace(selectorReg, '$1' + ' ' + catalogAttrName + '="' + idx + '" ' + args.map(function (a, idx) {
                    let n = 5;
                    let i = 1 + idx * n;
                    args[0] = (idx == 0) ? '$' + i : args[0] + '$' + i;
                    for (let j = 0; j < n; j++) {
                        i += 1;
                        args[0] += '$' + i;
                    }
                    return args[0];
                })[0]));
            });
        }
        return content;
    }
}
function generateArticleCatalog(articleSelector = '#content .markdown-body', catalogBookmarkSelector = '[data-catalog-id]', catalogDom = '#articleCatalog') {
    var catalogList = document.querySelectorAll(catalogBookmarkSelector);
    console.log(catalogList);
    var catalogDomList = [];
    document.querySelector(catalogDom).innerHTML = '';

    if (catalogList.length != 0) {
        [...catalogList].map(function (dom) {
            var level = dom.localName.match(/\d/);
            var idx = dom.getAttribute('data-catalog-id');
            var d = document.createElement('a');
            d.href = 'javascript:void 0;';
            d.onclick = function () {
                dom.scrollIntoView();
                document.body.scrollIntoView();
            };
            d.innerHTML = dom.innerHTML;
            d.innerHTML = d.innerText.length > 10 ? d.innerHTML.replace(/([，。～]+)/g, '$1</br>') : d.innerHTML;
            d.innerHTML = d.innerHTML.replace(/(<\/*br>)+/g, '</br>')
            d.style.display = 'block';
            d.style.marginLeft = (level - 1) + "em";
            d.style.fontSize = (10 - level + 1) / 10 + "em";
            catalogDomList[idx] = d;
        })
        console.log(catalogDomList);

        var dl = document.createElement('dl');
        var dt = document.createElement('dt');
        var dd = document.createElement('dd');
        var ul = document.createElement('ul');
        var li = [];
        dl.id = "article catalog";
        console.log(document.querySelector(articleSelector + ' title').innerText);
        dl.setAttribute('alt', document.querySelector(articleSelector + ' title') ? document.querySelector(articleSelector + ' title').innerText : '文章目录');
        console.log(dl.alt);
        dt.innerText = dl.id;
        document.querySelector(catalogDom).appendChild(dl);
        dl.appendChild(dt);
        dl.appendChild(dd);
        dd.appendChild(ul);
        catalogDomList.map(function (dom, idx) {
            li[idx] = document.createElement('li');
            ul.appendChild(li[idx]);
            li[idx].appendChild(dom);
        });
    }
}
function scrollContentTop(content) {
    document.querySelector('.markdown-body').scrollTop = 0;
    return content;
}

function returnFnFromArgs() {
    var arg = arguments;
    return function (content) {
        for (let i = 0; i < arg.length; i++) {
            content = arg[i](content);
        }
        return content;
    }
}
function runFns() {
    var arg = [...arguments];
    return function () {
        arg.map(fn => fn());
    }
}

var writingContentFn = returnFnFromArgs(
    imgSrcToLocal,
    imgSrcToOnline,
    imgSrcToDataSrc,
    imgZoonToWidth,
    writeTitleAndExpressions,
    refreshMathJax,
    preCopyButton,
    solveError,
    resetMain,
    scrollContentTop,

    pageCatalogAnchorAddingAfterTagNames('h1', 'h2', 'h3'),
);
var writingContentCallback = runFns(
    generateArticleCatalog,
    catalogInteraction

);

/* 读取md内容，对md内容修改再写入⬆️ */



/**写入md后，对页面的修改⬆️  writeMarkDown的callback*/


function expressionMain(content) {
    document.getElementById('main').className = 'expression';
    return content;
}
function resetMain(content) {
    document.getElementById('main').removeAttribute('class');
    return content;
}

function writeInPre(content) {
    return '<pre>' + content + '</pre>';
}
var writingExpressionCallback = returnFnFromArgs(
    writeInPre,
    expressionMain,
    preCopyButton
)
/**读取非md内容，对非md内容修改再写入⬆️ */

/* 文章选择 & /* catalog ul dt onclick */
/*var contents = document.getElementById('contents');
[...contents.querySelectorAll('li a')].map(i => i.onclick = function () {
    let langSuffix = getLangSuffixFromSearch();
    window.history.replaceState({}, null, '?content=' + i.innerText + (langSuffix != '' ? '&lang=' +
        langSuffix : ''));
    sendGETRequest('./contents/' + i.innerText + '.md', {}, 'text', writeMarkDown('#content div', htmlReplacement));

    //document.querySelector('#main').className = 'detail';
});*/

function catalogInteraction() {
    var catalog = document.getElementById('catalog');
    [...catalog.querySelectorAll('dl')].map(dl => (function () {
        let dt = dl.querySelector('dt');
        let dd = dl.querySelector('dd');

        dt.innerText = dt.parentElement.id.replace(/([A-Z])/g, ' $1');

        /**鼠标hover时，折叠其他 */
        dl.onmouseover = function catalogDlOnMouseOver() {
            let dt = this.querySelector('dt');
            let dd = this.querySelector('dd');



            // let p = this.parentElement;
            // [...p.children].map(function (j) {
            //     j.className = 'fold';
            //     j.querySelector('dd').style.maxHeight = '0!importannt';
            //     j.onmouseover = catalogDlOnMouseOver;
            // });
            // this.removeAttribute('class');


            [...document.getElementById('catalog').querySelectorAll('dl')].map(function (j) {
                j.className = 'fold';
                j.querySelector('dd').style.maxHeight = '0!importannt';
                j.onmouseover = catalogDlOnMouseOver;
            });
            this.removeAttribute('class');



            dd.setAttribute('data-height', dd.scrollHeight);
        };
        /**鼠标hover时，折叠其他 */

        /**dt 三角形 点击 */
        dt.onclick = function () {
            dt.parentElement.className = dt.parentElement.className == '' ? 'fold' : '';
            dl.onmouseover = dl.onmouseover == '' ? catalogDlOnMouseOver : '';
        };


        [...dl.querySelectorAll('li a')].map(function (i) {
            if (document.getElementById('websiteCatalog').contains(i)) {
                i.onclick = function () {
                    let langSuffix = getLangSuffixFromSearch();
                    window.history.replaceState({}, null, '?' + dl.id + '=' + i.innerText + (langSuffix != '' ? '&lang=' +
                        langSuffix : ''));
                    if (i.getAttribute('data-file-type') == 'md') {
                        console.log('click md');
                        sendGETRequest('./' + dl.id + '/' + i.innerText + (i.getAttribute('data-file-type') ? '.' + i.getAttribute('data-file-type') : ''), {}, 'text', writeMarkDown('#content div', writingContentFn, writingContentCallback));
                    } else if (i.getAttribute('data-file-type') != 'md' || i.innerText.indexOf('.js' != -1)) {
                        console.log('click not md');
                        sendGETRequest('./' + dl.id + '/' + i.innerText + (i.getAttribute('data-file-type') ? '.' + i.getAttribute('data-file-type') : ''), {}, 'text', writeHtml('#content div', writingExpressionCallback));
                    }
                }
            }
        });

        [...dl.querySelectorAll('li a')].map(function (a) {
            a.href = 'javascript:void 0';
        })
    })())
}

/**页面加载时如果url存在参数，读取参数指向的内容， */

console.log(1);



/**TODO */

if (Object.keys(search).length != 0 && Object.keys(search).map(function (key) {
    return [...document.querySelectorAll('#catalog dl')].map(function (dl) {
        return dl.id == key && [...dl.querySelectorAll('li')].map(function (li) {
            return li.innerText == search[key];
        }).filter(Boolean).length != 0;
    })
}).filter(Boolean).length == 0) {
    console.log(2);
    window.location = '../' + window.location.pathname;
}

if (Object.keys(search).length == 0) {
    console.log(3);

    sendGETRequest('index.md', {}, 'text', writeMarkDown('#content div', writingContentFn, writingContentCallback));
}

Object.keys(search).map(key => (function () {

    console.log("document.querySelector('#' + key)  " + document.querySelector('#' + key));
    console.log("search[key].indexOf('.') == -1)   " + search[key].indexOf('.') == -1);
    console.log(search[key]);
    console.log("search[key].indexOf('.'))   " + search[key].indexOf('.'));

    if (document.querySelector('#' + key) && search[key].indexOf('.') == -1) {
        sendGETRequest('./' + key + '/' + search[key] + '.md', {}, 'text', writeMarkDown('#content div', writingContentFn, writingContentCallback));
    } else if (document.querySelector('#' + key)) {
        console.log('not md loading');

        sendGETRequest('./' + key + '/' + search[key], {}, 'text', writeHtml('#content div', writingExpressionCallback));
    }
})());

/**TODO */




/* 复制函数 */
function copyOrNotWithUrl(str) {
    let a = document.createElement("textarea");
    a.value = str + '\n/* 来源：' + decodeURIComponent(location.href) + ' */';
    a.setAttribute('display', 'display');
    document.body.appendChild(a);
    a.select();
    let maxLength = 300;
    let resultBoo = window.confirm('将以下内容复制到剪贴板?\n' + (str.length > maxLength ? str.substr(0, maxLength) + '......' : str));
    console.log(resultBoo);
    if (resultBoo) {
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
