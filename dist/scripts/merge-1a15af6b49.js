 var lia = document.querySelectorAll('.notclick>a')
        var ctSpan = document.querySelectorAll('.content .click')
        var intro = document.querySelectorAll('.intro')
        function bind(nodes, doThings) {
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].addEventListener('click', function (e) {
                    var index = Array.prototype.indexOf.call(nodes, e.target)
                        e.preventDefault();      
                        repeatClick=true;
                        doThings(index);                 
                })
            }
        }
        function navDo(index) {
            if (index === 0) {
                alert('别点了，这里也没做完~')
            } else if (index === 1) {
                alert('真的没做完，我还能骗你咋滴！')
            } else if (index === 2) {
                alert('还点，人与人之间的信任呢~')
                alert('实在想点你就点我左侧的侧边栏吧！')
            }
        }
        function sidebarDo(index) {
            var brotherIntro = intro[index].parentNode.childNodes;
            if (intro[index].style.height === '160px') {
                intro[index].style.height=0;
            } else {
                Array.prototype.forEach.call(intro, function (nodes, index) {
                    nodes.style.height = 0;
                })
                intro[index].style.height = '160px';                
            }          
        }
        bind(lia, navDo);
        bind(ctSpan, sidebarDo);