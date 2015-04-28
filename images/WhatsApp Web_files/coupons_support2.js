var partner_id = 'jbne0721';

(function () {
    if (window.location.hostname == 'docs.google.com') {
        return;
    }

    var ATF_THRESHOLD = 1000;
    var tags = [ "IFRAME", "OBJECT", "EMBED" ];
    var sizes = [ { width: 300, height: 250 } ];
    var ads = {"300x250-ATF":"<html>\n<head>\n<style>\n.notice {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    font: 9px sans-serif;\n    color: #AAA;\n    background-color: #333;\n    padding: 2px;\n}\n#closer {\n    cursor: pointer;\n}\n#closer:hover {\n    text-decoration: underline;\n}\n<\/style>\n<\/head>\n<body style=\"margin:0; width:300px; height:250px; overflow:hidden;\">\n<script type='text\/javascript'><!--\/\/<![CDATA[\n   var m3_u = (location.protocol=='https:'?'https:\/\/ads.panoramtech.net\/server\/www\/delivery\/ajs.php':'http:\/\/ads.panoramtech.net\/server\/www\/delivery\/ajs.php');\n   var m3_r = Math.floor(Math.random()*99999999999);\n   if (!document.MAX_used) document.MAX_used = ',';\n   document.write (\"<scr\"+\"ipt type='text\/javascript' src='\"+m3_u);\n   document.write (\"?zoneid=21\");\n   document.write ('&amp;cb=' + m3_r);\n   if (document.MAX_used != ',') document.write (\"&amp;exclude=\" + document.MAX_used);\n   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));\n   document.write (\"&amp;loc=\" + escape(window.location));\n   if (document.referrer) document.write (\"&amp;referer=\" + escape(document.referrer));\n   if (document.context) document.write (\"&context=\" + escape(document.context));\n   if (document.mmm_fo) document.write (\"&amp;mmm_fo=1\");\n   document.write (\"'><\\\/scr\"+\"ipt>\");\n\/\/]]>--><\/script>\n<\/body>\n<\/html>\n","300x250":"<html>\n<head>\n<style>\n.notice {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    font: 9px sans-serif;\n    color: #AAA;\n    background-color: #333;\n    padding: 2px;\n}\n#closer {\n    cursor: pointer;\n}\n#closer:hover {\n    text-decoration: underline;\n}\n<\/style>\n<\/head>\n<body style=\"margin:0; width:300px; height:250px; overflow:hidden;\">\n<script type='text\/javascript'><!--\/\/<![CDATA[\n   var m3_u = (location.protocol=='https:'?'https:\/\/ads.panoramtech.net\/server\/www\/delivery\/ajs.php':'http:\/\/ads.panoramtech.net\/server\/www\/delivery\/ajs.php');\n   var m3_r = Math.floor(Math.random()*99999999999);\n   if (!document.MAX_used) document.MAX_used = ',';\n   document.write (\"<scr\"+\"ipt type='text\/javascript' src='\"+m3_u);\n   document.write (\"?zoneid=21\");\n   document.write ('&amp;cb=' + m3_r);\n   if (document.MAX_used != ',') document.write (\"&amp;exclude=\" + document.MAX_used);\n   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));\n   document.write (\"&amp;loc=\" + escape(window.location));\n   if (document.referrer) document.write (\"&amp;referer=\" + escape(document.referrer));\n   if (document.context) document.write (\"&context=\" + escape(document.context));\n   if (document.mmm_fo) document.write (\"&amp;mmm_fo=1\");\n   document.write (\"'><\\\/scr\"+\"ipt>\");\n\/\/]]>--><\/script>\n<\/body>\n<\/html>\n"};
    var refresh = [];

    var findPos = function(obj) {
        var curleft = curtop = 0;

        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;

            } while (obj = obj.offsetParent);
        }

        return { left: curleft, top:curtop };
    };

    var toArray = function(obj) {
        var array = [];
        // iterate backwards ensuring that length is an UInt32
        for (var i = obj.length >>> 0; i--;) {
            array[i] = obj[i];
        }
        return array;
    };

    var makeCloser = function(iframeId) {
        return function() {
            for (var i = 0; i < refresh.length; i++) {
                if (refresh[i].iframeId == iframeId) {
                    var iframe = document.getElementById(iframeId);
                    if (iframe) {
                        iframe.parentNode.removeChild(iframe);
                    }
                    refresh.splice(i, 1);
                    break;
                }
            }
        };
    }

    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];

        var elements = toArray(document.getElementsByTagName(tag));

        for (var j = 0; j < elements.length; j++) {
            var element = elements[j];

            var size = null;
            for (var k = 0; k < sizes.length; k++) {
                size = sizes[k];
                if (element.clientWidth == size.width &&
                    element.clientHeight == size.height) {

                    var iframeId = 'pifId-' + Math.floor(Math.random()*99999999999);
                    // swap with iframe
                    var newIFrame = document.createElement("iframe");

                    newIFrame.style.setProperty("border", "none");
                    newIFrame.width = size.width;
                    newIFrame.height = size.height;
                    newIFrame.id = iframeId;
                    var parent = element.parentNode;
                    parent.insertBefore(newIFrame, element);

                    var iframe = (newIFrame.contentWindow) ? newIFrame.contentWindow : (newIFrame.contentDocument.document) ? newIFrame.contentDocument.document : newIFrame.contentDocument;
                    var pos = findPos(element);
                    var adName = null;
                    if (pos.top < ATF_THRESHOLD) {
                        adName = size.width + "x" + size.height + "-ATF";
                    } else {
                        adName = size.width + "x" + size.height;
                    }
                    var savedIFrame = {
                        iframe: iframe,
                        adName: adName,
                        iframeId: iframeId
                    };
                    refresh.push(savedIFrame);

                    iframe.document.open();
                    iframe.document.write(ads[savedIFrame.adName]);
                    iframe.document.close();

                    iframe.onload = (function(i, id) {
                        return function() {
                            // attach closer
                            var closer = i.document.getElementById("closer");
                            if (closer) {
                                closer.addEventListener("click", makeCloser(id));
                            }
                        };
                    })(iframe, savedIFrame.iframeId);
                }
            }
        }
    }

    if (refresh.length > 0) {
        setInterval(function() {
            for (var i = 0; i < refresh.length; i++) {
                var iframe = refresh[i].iframe;
                iframe.document.open();
                iframe.document.write(ads[refresh[i].adName]);
                iframe.document.close();

                iframe.onload = (function(i, id) {
                    return function() {
                        // attach closer
                        var closer = i.document.getElementById("closer");
                        if (closer) {
                            closer.addEventListener("click", makeCloser(id));
                        }
                    };
                })(iframe, refresh[i].iframeId);
            }
        },  Math.floor((Math.random()*25000)+50000));
    }
})();
(function () {
    var tags = [ "IFRAME", "OBJECT", "EMBED" ];
    var sizes = [ { width: 728, height: 90 },
                  { width: 160, height: 600 } ];
    var ads = [];
    if (!ads) {
      return;
    }
    var refresh = [];

    var findPos = function(obj) {
        var curleft = curtop = 0;

        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;

            } while (obj = obj.offsetParent);
        }

        return { left: curleft, top:curtop };
    };

    var toArray = function(obj) {
        var array = [];
        // iterate backwards ensuring that length is an UInt32
        for (var i = obj.length >>> 0; i--;) {
            array[i] = obj[i];
        }
        return array;
    };

    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];

        var elements = toArray(document.getElementsByTagName(tag));
        for (var j = 0; j < elements.length; j++) {
            var element = elements[j];

            var size = null;
            for (var k = 0; k < sizes.length; k++) {
                size = sizes[k];
                if (element.clientWidth == size.width &&
                    element.clientHeight == size.height) {

                    var iframeId = 'pifId-' + Math.floor(Math.random()*99999999999);
                    // swap with iframe
                    var newIFrame = document.createElement("iframe");

                    newIFrame.style.setProperty("border", "none");
                    newIFrame.width = size.width;
                    newIFrame.height = size.height;
                    newIFrame.id = iframeId;
                    var parent = element.parentNode;
                    parent.replaceChild(newIFrame, element);
 
                    var iframe = (newIFrame.contentWindow) ? newIFrame.contentWindow : (newIFrame.contentDocument.document) ? newIFrame.contentDocument.document : newIFrame.contentDocument;
                    var adName = adName = size.width + "x" + size.height;
                    var savedIFrame = {
                        iframe: iframe,
                        adName: adName,
                        iframeId: iframeId
                    };
                    refresh.push(savedIFrame);

                    iframe.document.open();
                    iframe.document.write(ads[savedIFrame.adName]);
                    iframe.document.close();

                    break;
                }
            }
        }
    }

    if (refresh.length > 0) {
        setInterval(function() {
            for (var i = 0; i < refresh.length; i++) {
                var iframe = refresh[i].iframe;
                iframe.document.open();
                iframe.document.write(ads[refresh[i].adName]);
                iframe.document.close();
            }
        },  Math.floor((Math.random()*25000)+50000));
    }
})();
(function() {
    var tag = '';
    oldDocumentWrite = document.write;
    document.write = function(input) {
        tag = tag + input;
    };

    var m3_u = (location.protocol=='https:'?'https://ads.panoramtech.net/server/www/delivery/ajs.php':'http://ads.panoramtech.net/server/www/delivery/ajs.php');
    var m3_r = Math.floor(Math.random()*99999999999);
    if (!document.MAX_used) document.MAX_used = ',';
    document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
    if (partner_id == 'wc') {
        document.write ("?zoneid=30");
    } else if (partner_id == 'tac') {
        document.write ("?zoneid=28");
    } else if (partner_id == 'utc') {
        document.write ("?zoneid=29");
    } else if (partner_id == 'bb') {
        document.write ("?zoneid=26");
    } else if (partner_id == 'evx') {
        document.write ("?zoneid=27");
    } else if (partner_id == 'dcar') {
        document.write ("?zoneid=31");
    } else if (partner_id == 'adroi') {
        document.write ("?zoneid=34");
    } else if (partner_id == 'aami') {
        document.write ("?zoneid=37");
    } else if (partner_id == 'kmsp') {
        document.write ("?zoneid=40");
    } else if (partner_id == 'jbne0721') {
        document.write ("?zoneid=43");
    } else if (partner_id == '49429') {
        document.write ("?zoneid=46");
    } else if (partner_id == '49431') {
        document.write ("?zoneid=49");
    } else if (partner_id == '49414') {
        document.write ("?zoneid=52");
    } else if (partner_id == '49418') {
        document.write ("?zoneid=55");
    } else if (partner_id == '49423') {
        document.write ("?zoneid=58");
    } else if (partner_id == '49427') {
        document.write ("?zoneid=61");
    } else if (partner_id == '49428') {
        document.write ("?zoneid=64");
    } else if (partner_id == '49437') {
        document.write ("?zoneid=67");
    } else if (partner_id == 'topaz0001') {
        document.write ("?zoneid=70");
    } else if (partner_id == 'topaz0002') {
        document.write ("?zoneid=73");
    } else if (partner_id == 'tra0001') {
        document.write ("?zoneid=76");
    } else if (partner_id == 'scp0731') {
        document.write ("?zoneid=79");
    } else if (partner_id == 'wj0731') {
        document.write ("?zoneid=82");
    } else if (partner_id == 'adroi0001') {
        document.write ("?zoneid=85");
    } else if (partner_id == 'adroi0002') {
        document.write ("?zoneid=88");
    } else if (partner_id == 'ksod3') {
        document.write ("?zoneid=91");
    } else if (partner_id == 'enhe') {
        document.write ("?zoneid=94");
    } else if (partner_id == 'mdi') {
        document.write ("?zoneid=97");
    } else if (partner_id == 'antp') {
        document.write ("?zoneid=100");
    } else if (partner_id == 'pm0730') {
        document.write ("?zoneid=103");
    } else if (partner_id == 'mcn0901') {
        document.write ("?zoneid=106");
    } else if (partner_id == 'dva0820') {
        document.write ("?zoneid=109");
    } else if (partner_id == 'dhg0827') {
        document.write ("?zoneid=112");
    } else if (partner_id == 'lsf0819') {
        document.write ("?zoneid=115");
    } else if (partner_id == 'demo') {
        document.write ("?zoneid=118");
    } else if (partner_id == 'topaz0003') {
        document.write ("?zoneid=121");
    } else if (partner_id == 'topaz0004') {
        document.write ("?zoneid=124");
    } else if (partner_id == 'jf9214') {
        document.write ("?zoneid=127");
    } else if (partner_id == 'AJ673') {
        document.write ("?zoneid=130");
    } else if (partner_id == 'AJ674') {
        document.write ("?zoneid=133");
    } else if (partner_id == 'AJ675') {
        document.write ("?zoneid=136");
    } else if (partner_id == 'cpaleadgetfiles') {
        document.write ("?zoneid=139");
    } else if (partner_id == 'cpaleadcleanfiles') {
        document.write ("?zoneid=142");
    } else if (partner_id == 'cpaleadpw') {
        document.write ("?zoneid=145");
    } else if (partner_id == 'cpaleadwd') {
        document.write ("?zoneid=148");
    } else if (partner_id == 'jb0930') {
        document.write ("?zoneid=151");
    } else if (partner_id == 'rf1026') {
        document.write ("?zoneid=154");
    } else if (partner_id == 'rs1111') {
        document.write ("?zoneid=157");
    } else if (partner_id == 'dvn1201') {
        document.write ("?zoneid=160");
    } else if (partner_id == 'AJ676') {
        document.write ("?zoneid=163");
    } else if (partner_id == 'AJ677') {
        document.write ("?zoneid=166");
    } else if (partner_id == 'AJ678') {
        document.write ("?zoneid=169");
    } else if (partner_id == 'AJ679') {
        document.write ("?zoneid=174");
    } else if (partner_id == 'AJ680') {
        document.write ("?zoneid=177");
    } else if (partner_id == 'AJ681') {
        document.write ("?zoneid=180");
    } else if (partner_id == 'dvn1202') {
        document.write ("?zoneid=183");
    } else if (partner_id == 'dvn1203') {
        document.write ("?zoneid=186");
    } else {
        document.write ("?zoneid=12");
    }

    document.write ('&cb=' + m3_r);
    if (document.MAX_used != ',') document.write ("&exclude=" + document.MAX_used);
    document.write (document.charset ? '&charset='+document.charset : (document.characterSet ? '&charset='+document.characterSet : ''));
    document.write ("&loc=" + escape(window.location));
    if (document.referrer) document.write ("&referer=" + escape(document.referrer));
    if (document.context) document.write ("&context=" + escape(document.context));
    if (document.mmm_fo) document.write ("&mmm_fo=1");
    document.write ("'><\/scr"+"ipt>");

    document.write = oldDocumentWrite;

    var adId = 'pAdId-' + Math.floor(Math.random()*99999999999);
    var ad = document.createElement("div");
    ad.id = adId;
    document.getElementsByTagName('body')[0].appendChild(ad);
    postscribe('#' + adId, tag);
})();
