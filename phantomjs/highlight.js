module.exports = function(token, diff, opt){

    /**
     * console log debug message
     * @param {string} msg
     */
    function log(msg){
        console.log(token + msg);
    }

    /**
     * get px string
     * @param {string} val
     * @returns {string}
     */
    function px(val){
        return val + 'px';
    }

    var CHANGE_TYPE = opt.changeType;
    var CHANGE_STYLE = {};
    CHANGE_STYLE.ADD = opt.highlight.add;
    CHANGE_STYLE.REMOVE = opt.highlight.remove;
    CHANGE_STYLE.TEXT = opt.highlight.text;
    CHANGE_STYLE.STYLE = opt.highlight.style;
    var lContainer = document.getElementById('left');
    var rContainer = document.getElementById('right');

    /**
     *
     * @param {Array} rect [x, y, width, height]
     * @param {Object} options
     * @param {HTMLElement} container
     * @param {Boolean} useTitle
     * @returns {HTMLElement}
     */
    function highlightElement(rect, options, container, useTitle){
        var div = document.createElement('x-diff-div');
        div.style.position = 'absolute';
        div.style.display = 'block';
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
        div.style.border = '1px dashed #333';
        div.style.fontSize = '12px';
        div.style.fontWeight = 'normal';
        div.style.overflow = 'hidden';
        div.style.color = '#fff';
        div.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.4)';
        if(useTitle && options.title){
            var span = document.createElement('x-diff-span');
            span.innerHTML = options.title;
            div.appendChild(span);
        }
        for(var key in options){
            if(options.hasOwnProperty(key)){
                div.style[key] = options[key];
            }
        }
        div.style.left = px(rect[0]);
        div.style.top = px(rect[1]);
        div.style.width = px(rect[2]);
        div.style.height = px(rect[3]);
        container.appendChild(div);
        return div;
    }

    // add lenged
    var lenged = document.getElementById('legend');
    for(var key in CHANGE_STYLE){
        if(CHANGE_STYLE.hasOwnProperty(key)){
            var div = highlightElement([0, 0, 100, 18], CHANGE_STYLE[key], lenged, true);
            div.style.position = 'static';
            div.style.margin = '5px 8px';
            div.style.display = 'inline-block';
            div.style.lineHeight = '18px';
            div.style.textAlign = 'center';
            div.style.fontWeight = 'bold';
        }
    }

    // highlight diffs
    diff.forEach(function(item){
        var node = item.node;
        switch (item.type){
            case CHANGE_TYPE.ADD:
                highlightElement(node.rect, CHANGE_STYLE.ADD, rContainer);
                break;
            case CHANGE_TYPE.REMOVE:
                highlightElement(node.rect, CHANGE_STYLE.REMOVE, lContainer);
                break;
            case CHANGE_TYPE.TEXT:
                highlightElement(node.rect, CHANGE_STYLE.TEXT, rContainer);
                break;
            default :
                highlightElement(node.rect, CHANGE_STYLE.STYLE, rContainer);
                break;
        }
    });

};