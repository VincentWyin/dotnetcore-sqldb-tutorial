// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
'use strict';
/*! CEL.js - v1.0.0.0
 * Vincent Zhao 2017-Apr-07
 * Copyright (c) 2017 China Ever Bright;*/

/* CELPage functions show all basic function of CEL page */
var CELPage = function () {

    // Variables
    var Window = $(window);
    var Body = $('body');

    var _IEDetection = function () {
        if ($('html').hasClass("lt-ie10")) {
            alert("IE浏览器版本过低. (要求IE10或以上)。\n建议更新IE或者安装其他浏览器，例如Chrome或者Firefox。");
        }
    };

    var _RunFormElements = function () {
        // If a panel element has the ".panel-scroller" class we init
        // custom fixed height content scroller. An optional delay data attr
        // may be set. This is useful when you expect the panels height to 
        // change due to a plugin or other dynamic modification.
        var panelScroller = $('.panel-scroller');
        if (panelScroller.length) {
            panelScroller.each(function (i, e) {
                var This = $(e);
                var Delay = This.data('scroller-delay');
                var Margin = 5;

                // Check if scroller bar margin is required
                if (This.hasClass('scroller-thick')) { Margin = 0; }

                // Check if scroller bar is in a dropdown, if so 
                // we initilize scroller after dropdown is visible
                var DropMenuParent = This.parents('.dropdown-menu');
                if (DropMenuParent.length) {
                    DropMenuParent.prev('.dropdown-toggle').on('click', function () {
                        setTimeout(function () {
                            This.scroller();
                            $('.navbar').scrollLock('on', 'div');
                        }, 50);
                    });
                    return;
                }

                if (Delay) {
                    var Timer = setTimeout(function () {
                        This.scroller({ trackMargin: Margin, });
                        //$('#content').scrollLock('on', 'div');
                    }, Delay);
                }
                else {
                    This.scroller({ trackMargin: Margin, });
                    //$('#content').scrollLock('on', 'div');
                }

            });
        }
    };

    // Variables
    var Window = $(window);
    var Body = $('body');
    var Navbar = $('.navbar');

    // Constant Heights
    var windowH = Window.height();
    var bodyH = Body.height();
    var navbarH = 0;

    // Variable Heights
    if (Navbar.is(':visible')) { navbarH = Navbar.height(); }

    // Calculate Height for inner content elements
    var contentHeight = windowH - navbarH;

    // SideMenu Functions
    var runSideMenu = function (options) {
        
        // Sidebar state naming conventions:
        // "sb-l-o" - SideBar Left Open
        // "sb-l-c" - SideBar Left Closed
        // "sb-l-m" - SideBar Left Minified
        // Same naming convention applies to right sidebar

        // SideBar Left Toggle Function
        var sidebarLeftToggle = function () {

            // If sidebar is set to Horizontal we return
            if ($('body.sb-top').length) { return; }

            // We check to see if the the user has closed the entire
            // leftside menu. If true we reopen it, this will result
            // in the menu resetting itself back to a minified state.
            // A second click will fully expand the menu.
            if (Body.hasClass('sb-l-c') && options.collapse === "sb-l-m") {
                Body.removeClass('sb-l-c');
            }

            // Toggle sidebar state(open/close)
            Body.toggleClass(options.collapse).removeClass('sb-r-o').addClass('sb-r-c');
            triggerResize();
        };

        // SideBar Right Toggle Function
        var sidebarRightToggle = function () {

            // If sidebar is set to Horizontal we return
            if ($('body.sb-top').length) { return; }

            // toggle sidebar state(open/close)
            if (options.siblingRope === true && !Body.hasClass('mobile-view') && Body.hasClass('sb-r-o')) {
                Body.toggleClass('sb-r-o sb-r-c').toggleClass(options.collapse);
            }
            else {
                Body.toggleClass('sb-r-o sb-r-c').addClass(options.collapse);
            }
            triggerResize();
        };

        // SideBar Left Toggle Function
        var sidebarTopToggle = function () {
            // Toggle sidebar state(open/close)
            Body.toggleClass('sb-top-collapsed');
        };

        // Sidebar Left Collapse Entire Menu event
        $('.sidebar-toggle-mini').on('click', function (e) {
            e.preventDefault();

            // If sidebar is set to Horizontal we return
            if ($('body.sb-top').length) { return; }

            // Close Menu
            Body.addClass('sb-l-c');
            triggerResize();

            // After animation has occured we toggle the menu.
            // Upon the menu reopening the classes will be toggled
            // again, effectively restoring the menus state prior
            // to being hidden 
            if (!Body.hasClass('mobile-view')) {
                setTimeout(function () {
                    Body.toggleClass('sb-l-m sb-l-o');
                }, 250);
            }
        });

        // Check window size on load
        // Adds or removes "mobile-view" class based on window size
        var sbOnLoadCheck = function () {

            // If sidebar menu is set to Horizontal we add
            // unique custom mobile css classes
            if ($('body.sb-top').length) {
                // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
                if ($(window).width() < 900) {
                    Body.addClass('sb-top-mobile').removeClass('sb-top-collapsed');
                }
                return;
            }

            // Check Body for classes indicating the state of Left and Right Sidebar.
            // If not found add default sidebar settings(sidebar left open, sidebar right closed).
            if (!$('body.sb-l-o').length && !$('body.sb-l-m').length && !$('body.sb-l-c').length) {
                $('body').addClass(options.sbl);
            }
            if (!$('body.sb-r-o').length && !$('body.sb-r-c').length) {
                $('body').addClass(options.sbr);
            }

            if (Body.hasClass('sb-l-m')) { Body.addClass('sb-l-disable-animation'); }
            else { Body.removeClass('sb-l-disable-animation'); }

            // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
            if ($(window).width() < 1080) {
                Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
            }

            resizeBody();
        };

        // Check window size on resize
        // Adds or removes "mobile-view" class based on window size
        var sbOnResize = function () {

            // If sidebar menu is set to Horizontal mode we return
            // as the menu operates using pure CSS
            if ($('body.sb-top').length) {
                // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
                if ($(window).width() < 900 && !Body.hasClass('sb-top-mobile')) {
                    Body.addClass('sb-top-mobile');
                } else if ($(window).width() > 900) {
                    Body.removeClass('sb-top-mobile');
                }
                return;
            }

            // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
            if ($(window).width() < 1080 && !Body.hasClass('mobile-view')) {
                Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
            } else if ($(window).width() > 1080) {
                Body.removeClass('mobile-view');
            } else {
                return;
            }

            resizeBody();
        };

        // Function to set the min-height of content
        // to that of the body height. Ensures trays
        // and content bgs span to the bottom of the page
        var resizeBody = function () {
            var sidebarH = $('#sidebar_left').outerHeight();
            var cHeight = (sidebarH);
            Body.css('min-height', cHeight);
        };

        // Most CSS menu animations are set to 300ms. After this time
        // we trigger a single global window resize to help catch any 3rd 
        // party plugins which need the event to resize their given elements
        var triggerResize = function () {
            setTimeout(function () {
                $(window).trigger('resize');

                if (Body.hasClass('sb-l-m')) {
                    Body.addClass('sb-l-disable-animation');
                }
                else {
                    Body.removeClass('sb-l-disable-animation');
                }
            }, 300)
        };

        // Functions Calls
        sbOnLoadCheck();
        $("#toggle_sidemenu_t").on('click', sidebarTopToggle);
        $("#toggle_sidemenu_l").on('click', sidebarLeftToggle);
        $("#toggle_sidemenu_r").on('click', sidebarRightToggle);

        // Attach debounced resize handler
        var rescale = function () {
            sbOnResize();
        }
        var lazyLayout = debounce(rescale, 300);
        $(window).resize(lazyLayout);

        // 2. LEFT MENU LINKS TOGGLE
        $('.sidebar-menu li a.accordion-toggle').on('click', function (e) {
            e.preventDefault();

            // If the clicked menu item is minified and is a submenu (has sub-nav parent) we do nothing
            if ($('body').hasClass('sb-l-m') && !$(this).parents('ul.sub-nav').length) { return; }

            // If the clicked menu item is a dropdown we open its menu
            if (!$(this).parents('ul.sub-nav').length) {

                // If sidebar menu is set to Horizontal mode we return
                // as the menu operates using pure CSS
                if ($(window).width() > 900) {
                    if ($('body.sb-top').length) { return; }
                }

                $('a.accordion-toggle.menu-open').next('ul').slideUp('fast', 'swing', function () {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
            }
            // If the clicked menu item is a dropdown inside of a dropdown (sublevel menu)
            // we only close menu items which are not a child of the uppermost top level menu
            else {
                var activeMenu = $(this).next('ul.sub-nav');
                var siblingMenu = $(this).parent().siblings('li').children('a.accordion-toggle.menu-open').next('ul.sub-nav')

                activeMenu.slideUp('fast', 'swing', function () {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
                siblingMenu.slideUp('fast', 'swing', function () {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
            }

            // Now we expand targeted menu item, add the ".open-menu" class
            // and remove any left over inline jQuery animation styles
            if (!$(this).hasClass('menu-open')) {
                $(this).next('ul').slideToggle('fast', 'swing', function () {
                    $(this).attr('style', '').prev().toggleClass('menu-open');
                });
            }

        });
    }

    // jQuery Helper Functions
    var runHelpers = function () {

        // Disable element selection
        $.fn.disableSelection = function () {
            return this
                .attr('unselectable', 'on')
                .css('user-select', 'none')
                .on('selectstart', false);
        };

        // Find element scrollbar visibility
        $.fn.hasScrollBar = function () {
            return this.get(0).scrollHeight > this.height();
        }

        // Test for IE, Add body class if version 9
        function msieversion() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                var ieVersion = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
                if (ieVersion === 9) { $('body').addClass('no-js ie' + ieVersion); }
                return ieVersion;
            }
            else { return false; }
        }
        msieversion();

        // Clean up helper that removes any leftover
        // animation classes on the primary content container
        // If left it can cause z-index and visibility problems
        setTimeout(function () {
            $('#content').removeClass('animated fadeIn');
        }, 800);

    }

    // Delayed Animations
    var runAnimations = function () {

        // Add a class after load to prevent css animations
        // from bluring pages that have load intensive resources
        if (!$('body.boxed-layout').length) {
            setTimeout(function () {
                $('body').addClass('onload-check');
            }, 100);
        }

        // Delayed Animations
        // data attribute accepts delay(in ms) and animation style
        // if only delay is provided fadeIn will be set as default
        // eg. data-animate='["500","fadeIn"]'
        $('.animated-delay[data-animate]').each(function () {
            var This = $(this)
            var delayTime = This.data('animate');
            var delayAnimation = 'fadeIn';

            // if the data attribute has more than 1 value
            // it's an array, reset defaults 
            if (delayTime.length > 1 && delayTime.length < 3) {
                delayTime = This.data('animate')[0];
                delayAnimation = This.data('animate')[1];
            }

            var delayAnimate = setTimeout(function () {
                This.removeClass('animated-delay').addClass('animated ' + delayAnimation)
                    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                        This.removeClass('animated ' + delayAnimation);
                    });
            }, delayTime);
        });

        // "In-View" Animations
        // data attribute accepts animation style and offset(in %)
        // eg. data-animate='["fadeIn","40%"]'
        $('.animated-waypoint').each(function (i, e) {
            var This = $(this);
            var Animation = This.data('animate');
            var offsetVal = '35%';

            // if the data attribute has more than 1 value
            // it's an array, reset defaults 
            if (Animation.length > 1 && Animation.length < 3) {
                Animation = This.data('animate')[0];
                offsetVal = This.data('animate')[1];
            }

            var waypoint = new Waypoint({
                element: This,
                handler: function (direction) {
                    console.log(offsetVal)
                    if (This.hasClass('animated-waypoint')) {
                        This.removeClass('animated-waypoint').addClass('animated ' + Animation)
                            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                This.removeClass('animated ' + Animation);
                            });
                    }
                },
                offset: offsetVal
            });
        });

    }

    // Header Functions
    var runHeader = function () {

        // Searchbar - Mobile modifcations
        $('.navbar-search').on('click', function (e) {
            // alert('hi')
            var This = $(this);
            var searchForm = This.find('input');
            var searchRemove = This.find('.search-remove');

            // Don't do anything unless in mobile mode
            if ($('body.mobile-view').length || $('body.sb-top-mobile').length) {

                // Open search bar and add closing icon if one isn't found
                This.addClass('search-open');
                if (!searchRemove.length) {
                    This.append('<div class="search-remove"></div>');
                }

                // Fadein remove btn and focus search input on animation complete
                setTimeout(function () {
                    This.find('.search-remove').fadeIn();
                    searchForm.focus().one('keydown', function () {
                        $(this).val('');
                    });
                }, 250)

                // If remove icon clicked close search bar
                if ($(e.target).attr('class') == 'search-remove') {
                    This.removeClass('search-open').find('.search-remove').remove();
                }

            }

        });

        // Init jQuery Multi-Select for navbar user dropdowns
        if ($("#user-status").length) {
            $('#user-status').multiselect({
                buttonClass: 'btn btn-default btn-sm',
                buttonWidth: 100,
                dropRight: false
            });
        }
        if ($("#user-role").length) {
            $('#user-role').multiselect({
                buttonClass: 'btn btn-default btn-sm',
                buttonWidth: 100,
                dropRight: true
            });
        }

        // Dropdown Multiselect Persist. Prevents a menu dropdown
        // from closing when a child multiselect is clicked
        $('.dropdown-menu').on('click', function (e) {

            e.stopPropagation();
            var Target = $(e.target);
            var TargetGroup = Target.parents('.btn-group');
            var SiblingGroup = Target.parents('.dropdown-menu').find('.btn-group');

            // closes all open multiselect menus. Creates Toggle like functionality
            if (Target.hasClass('multiselect') || Target.parent().hasClass('multiselect')) {
                SiblingGroup.removeClass('open');
                TargetGroup.addClass('open');
            }
            else { SiblingGroup.removeClass('open'); }

        });

        // Sliding Topbar Metro Menu
        var menu = $('#topbar-dropmenu');
        var items = menu.find('.metro-tile');
        var metroBG = $('.metro-modal');

        // Toggle menu and active class on icon click
        $('.topbar-menu-toggle').on('click', function () {

            // If dropmenu is using alternate style we don't show modal
            if (menu.hasClass('alt')) {
                // Toggle menu and active class on icon click
                menu.slideToggle(230).toggleClass('topbar-menu-open');
                metroBG.fadeIn();
            }
            else {
                menu.slideToggle(230).toggleClass('topbar-menu-open');
                $(items).addClass('animated animated-short fadeInDown').css('opacity', 1);

                // Create Modal for hover effect
                if (!metroBG.length) {
                    metroBG = $('<div class="metro-modal"></div>').appendTo('body');
                }
                setTimeout(function () {
                    metroBG.fadeIn();
                }, 380);
            }

        });

        // If modal is clicked close menu
        $('body').on('click', '.metro-modal', function () {
            metroBG.fadeOut('fast');
            setTimeout(function () {
                menu.slideToggle(150).toggleClass('topbar-menu-open');
            }, 250);
        });
    }

    // Tray related Functions
    var runTrays = function () {

        // Match height of tray with the height of body
        var trayFormat = $('#content .tray');
        if (trayFormat.length) {

            // Loop each tray and set height to match body
            trayFormat.each(function (i, e) {
                var This = $(e);
                var trayScroll = This.find('.tray-scroller');

                This.height(contentHeight);
                trayScroll.height(contentHeight);

                if (trayScroll.length) {
                    trayScroll.scroller();
                }
            });

            // Scroll lock all fixed content overflow
            $('#content').scrollLock('on', 'div');

        };

        // Debounced resize handler
        var rescale = function () {
            if ($(window).width() < 1000) { Body.addClass('tray-rescale'); }
            else { Body.removeClass('tray-rescale tray-rescale-left tray-rescale-right'); }
        }
        var lazyLayout = debounce(rescale, 300);

        if (!Body.hasClass('disable-tray-rescale')) {
            // Rescale on window resize
            $(window).resize(lazyLayout);

            // Rescale on load
            rescale();
        }

        // Perform a custom animation if tray-nav has data attribute
        var navAnimate = $('.tray-nav[data-nav-animate]');
        if (navAnimate.length) {
            var Animation = navAnimate.data('nav-animate');

            // Set default "fadeIn" animation if one has not been previously set
            if (Animation == null || Animation == true || Animation == "") { Animation = "fadeIn"; }

            // Loop through each li item and add animation after set timeout
            setTimeout(function () {
                navAnimate.find('li').each(function (i, e) {
                    var Timer = setTimeout(function () {
                        $(e).addClass('animated animated-short ' + Animation);
                    }, 50 * i);
                });
            }, 500);
        }

        // Responsive Tray Javascript Data Helper. If browser window
        // is <575px wide (extreme mobile) we relocate the tray left/right
        // content into the element appointed by the user/data attr
        var dataTray = $('.tray[data-tray-mobile]');
        var dataAppend = dataTray.children();
        function fcRefresh() {
            if ($('body').width() < 585) {
                dataAppend.appendTo($(dataTray.data('tray-mobile')));
            }
            else { dataAppend.appendTo(dataTray); }
        };
        fcRefresh();

        // Attach debounced resize handler
        var fcResize = function () { fcRefresh(); }
        var fcLayout = debounce(fcResize, 300);
        $(window).resize(fcLayout);

    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    return {
        init: function () {
            _IEDetection();
            _RunFormElements();

            Body.on("submit", "#Edit", ajaxSubmit);
            Body.on("submit", "#Create", ajaxSubmit);
            Body.on("submit", "#Disable", ajaxSubmit);
            Body.on("submit", "#Delete", ajaxSubmit);
            
            $(document).ajaxComplete(function () {
                _RunFormElements();
            });

            // Add left side bar

            // Set Default Options
            var defaults = {
                sbl: "sb-l-o", // sidebar left open onload 
                sbr: "sb-r-c", // sidebar right closed onload
                sbState: "save", //Enable localstorage for sidebar states

                collapse: "sb-l-m", // sidebar left collapse style
                siblingRope: true
                // Setting this true will reopen the left sidebar
                // when the right sidebar is closed
            };

            // Extend Default Options.
            var options = $.extend({}, defaults);
            runHelpers();
            runAnimations();
            runHeader();
            runSideMenu(options);
            runTrays();

        }
    }
};

function SetMenuByCode(code) {
    $("#sidebar_left .sidebar-menu li.active").removeClass("active");
    $("#sidebar_left .sidebar-menu li a[data-code='" + code + "']").parent("li").addClass("active");
}

function SetMenu(parentId, id) {
    $("#sidebar_left .sidebar-menu li.active").removeClass("active");
    $("#sidebar_left .sidebar-menu li a[data-code='FOF_" + parentId + "']").click().parent("li").addClass("active");
    $("#sidebar_left .sidebar-menu li a[data-code='FOF_" + parentId + "']").siblings(".sub-fund-list").find("li a[data-code='" + id + "']").parent("li").addClass("active");
}

function URL_add_parameter(url, param, value) {
    var hash = {};
    var parser = document.createElement('a');

    parser.href = url;

    var parameters = parser.search.split(/\?|&/);

    for (var i = 0; i < parameters.length; i++) {
        if (!parameters[i])
            continue;

        var ary = parameters[i].split('=');
        hash[ary[0]] = ary[1];
    }

    hash[param] = value;

    var list = [];
    Object.keys(hash).forEach(function (key) {
        list.push(key + '=' + hash[key]);
    });

    parser.search = '?' + list.join('&');
    return parser.href;
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var ajaxSubmit = function (e) {
    var form = $(e.currentTarget);
    var url = form.attr("action"); // the script where you handle the form input.
    var data = form.serialize();
    $.ajax({
        type: "POST",
        url: url,
        data: data, // serializes the form's elements.
        success: function (data) {
            Ladda.stopAll();
            if (data.result != "3") {
                if (data.redirectedURL != null) {
                    alert(data.message.toString()); // show response from the server.
                    window.location.href = data.redirectedURL;
                } else {
                    alert(data.message.toString()); // show response from the server.
                    location.href = URL_add_parameter(location.href, 'isReload', '1');
                }
            }
            else {
                $(form).find(".br-danger-light").removeClass("br-danger-light");
                $(form).find(".has-error").removeClass("has-error");
                $.each(data.errors, function (key, value) {
                    if (value) {
                        var div = $("#" + key + ",#" + key + "Id,[name='" + key + "'],[name='" + key + "Id']");
                        if (div.length > 0) {
                            div = div.parents(".field").parent();
                            if (div.length > 0)
                                $(div).addClass("has-error").find(".error-message").text(value);
                        }
                    }
                });

                if (data.message != null)
                    if (data.message.toString() != "")
                        alert(data.message.toString()); // show response from the server.
            }
        }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.
}

var language4Datatable = {
    "processing": "处理中...",
    "loadingRecords": "载入中...",
    "lengthMenu": "显示 _MENU_ 项结果",
    "zeroRecords": "沒有符合的结果",
    "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
    "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
    "infoFiltered": "(从 _MAX_ 项结果中过滤)",
    "infoPostFix": "",
    "search": "搜索:",
    "paginate": {
        "first": "第一页",
        "previous": "上一页",
        "next": "下一页",
        "last": "最后一页"
    },
    "aria": {
        "sortAscending": ": 升幂排列",
        "sortDescending": ": 降幂排列"
    }
};

var table_IntVal = function (i) {
    return typeof i === 'string' ?
        i.replace(/[\$,]/g, '') * 1 :
        typeof i === 'number' ?
            i : 0;
};

var table_InitSelect = function (table, selectId, columnIndex) {
    var select = $("#" + selectId);
    if (select.find("option").length == 1) {
        var columnBU = table.api().column(columnIndex);
        columnBU.data().unique().sort().each(function (d, j) {
            select.append('<option value="' + d + '">' + d + '</option>')
        });
        var selectedValue = table.api().state().columns[columnIndex].search.search.replace("^", "").replace("$", "");
        select.on('change', function () {
            var val = $.fn.dataTable.util.escapeRegex($(this).val());
            columnBU.search(val ? '^' + val + '$' : '', true, false).draw();
        }).val(selectedValue);
    }
}

var InitNumberFormatOption = function (id, selectedValue, rowList, table, key) {
    var currentValue = localStorage.getItem(key);
    if (currentValue == undefined) {
        localStorage.setItem(key, selectedValue);
        currentValue = selectedValue;
    }

    var filter = $("#" + id + "_wrapper .dataTables_filter");
    var selectId = id + '_unitofamount';
    var arr = [
        { val: 1, text: '原始数据' },
        { val: 1000, text: '显示单位：千' },
        { val: 10000, text: '显示单位：万' },
        { val: 1000000, text: '显示单位：百万' },
        { val: 100000000, text: '显示单位：亿' }
    ];

    var sel = $('<select id="' + selectId + '" class="ml20" style="height:28px;padding:3px 5px;"></select>').appendTo(filter);
    $(arr).each(function () {
        sel.append($("<option>").attr('value', this.val).text(this.text));
    });

    $(document.body).on('change', '#' + selectId, function () {
        var unit = $(this).val();
        table.rows().every(function (rowIdx, tableLoop, rowLoop) {
            var data = this.data();
            var arr = rowList.split(',');
            $.each(arr, function (index, value) {
                var v = $.number((table.cell(rowIdx, value).node().dataset.content / unit), 2);
                if (v == "0.00") {
                    v = "-";
                }
                data[value] = v;
            });
            this.data(data);
        });
        table.draw();
        localStorage.setItem(key, unit);
    });

    $('#' + selectId).val(currentValue).change();
}

var InitFormNumberFormatOption = function (id, selectedValue, key) {
    var currentValue = localStorage.getItem(key);
    if (currentValue == undefined) {
        localStorage.setItem(key, selectedValue);
        currentValue = selectedValue;
    }

    var selectId = "display-option";
    var arr = [
        { val: '1_', text: '显示个位' },
        { val: '1000_千', text: '显示单位：千' },
        { val: '10000_万', text: '显示单位：万' },
        { val: '1000000_百万', text: '显示单位：百万' },
        { val: '100000000_亿', text: '显示单位：亿' }
    ];

    var sel = $('<select id="' + selectId + '" style="height:28px;padding:3px 5px;"></select>').appendTo($("#" + id));
    $(arr).each(function () {
        sel.append($("<option>").attr('value', this.val).text(this.text));
    });

    $(document.body).on('change', '#' + selectId, function () {
        var option_val = $(this).val();
        var val_amt = option_val.split('_')[0];
        var val_unit = option_val.split('_')[1];
        $('p.form-control-static[data-content]').each(function () {
            var data = $(this).attr("data-content");
            $(this).text($.number((data / val_amt), 2) + " " + val_unit);
        });
        localStorage.setItem(key, option_val);
    });

    $('#' + selectId).val(currentValue).change();
}

$(function () {
    var currentPage = new CELPage();
    currentPage.init();
});

(function ($) {
    $.DocumentUploader = function (el, configs) {
        var base = this;

        base.el = el;
        base.$el = $(el);

        base.entity = configs.entity;
        base.formId = "document-uploader-" + base.entity;
        base.datatableId = "dataTable_doc_" + base.entity;
        base.filterId = configs.entity;

        base.fileCount = 0;
        base.successes = 0;
        base.fails = 0;

        base.init = function () {
            base.setUploadResultLogger();

            base.setFileUpload2IFrame();

            base.setFilter();
        }

        base.setUploadResultLogger = function () {
            console.log(base.formId);

            // Initialize the jQuery File Upload widget:
            $("#" + base.formId).fileupload({
                limitMultiFileUploads: 10,
                maxFileSize: 5
            }).bind('fileuploaddone', function (e, data) {
                base.fileCount++;
                base.successes++;
                console.log('fileuploaddone');
                if (base.fileCount === data.files.length) {
                    console.log('all done, successes: ' + base.successes + ', fails: ' + base.fails);
                }
            }).bind('fileuploadfail', function (e, data) {
                base.fileCount++;
                base.fails++;
                alert(data.messages.uploadedBytes);
                console.log('fileuploadfail');
                if (base.fileCount === data.files.length) {
                    console.log('all done, successes: ' + base.successes + ', fails: ' + base.fails);
                }
            }).bind('fileuploadstop', function (e) {
                console.log('Uploads stopped');
                // refresh page
                location.href = URL_add_parameter(location.href, 'isReload', '1');
            });;
        }

        base.setFilter = function () {
            $("#document-type-" + base.entity + " .list-group-item").click(function (e) {
                if (!$(this).hasClass("active")) {
                    $(this).addClass("active").siblings().removeClass("active");
                    var id = $(this).attr("data-filter");
                    var root = $(this).parents(".cel-nav");
                    var hasDoc = $(this).parents(".cel-nav").attr("data-has-doc");
                    var name = $(this).find("a").text();

                    var target = $("#" + base.datatableId);

                    if (id != "") {
                        target.find("tr").hide();
                        target.find("tr[data-filter-value='" + id + "']").show();

                        if (hasDoc == "1" && id != "PE系统文档")
                            $("select[name='DocumentTypeId']").val(id);
                    } else {
                        target.find("tr").show();
                    }
                    $(root).find(".dropdown-toggle span").html(name);
                };
                e.preventDefault();
            });
        }

        base.setFileUpload2IFrame = function () {
            // Open download dialogs via iframes,
            // to prevent aborting current uploads:
            $("#" + base.formId).on("click", ".files a:not([target^=_blank])", function (e) {
                e.preventDefault();
                $('<iframe style="display:none;"></iframe>')
                    .prop('src', this.href)
                    .appendTo('body');
            });
        }

        return base.init();
    };

    $.fn.DocumentUploader = function (config) {
        var configs = $.extend({}, $.fn.DocumentUploader.defaults, config);

        return new $.DocumentUploader(this, configs);
    };

    $.fn.DocumentUploader.defaults = {
        entity: ""
    };

}(jQuery));


/*
    Plugin: Ajax Form File Uploader
    - Purpose/Reason:
        -- Ladda button animation is not working as expected when form contains <input type="file"/>
        -- Ladda button is found to possibly break the file upload behavior in <form></form> (HttpPostedFileBase equals null in controller action) 
        -- Provide interface to add callback function after file handled by controller (e.g. Page refresh / ladda animation stop)
    - Dependency:
        -- ladda.js
    - Example: 
        -- $(<form></form>).ajaxFileUpload();
*/


(function ($) {
    $.ajaxFileUpload = function (el, configs) {
        var base = this;

        base.$form = $(el);

        if (configs.submitBtnId == "" || configs.submitBtnId.length == 0) {
            base.$btn = base.$form.find("button[class*='ladda-button']");
            base.btnId = '#' + base.$btn.attr("id");
        }
        else {
            base.btnId = configs.submitBtnId.includes("#") ? configs.submitBtnId : '#' + configs.submitBtnId;
            base.$btn = $(base.btnId);
        }

        if (configs.fileInputId == "" || configs.fileInputId.length == 0) {
            base.$fileInput = base.$form.find("input[type='file']");
            base.fileInputId = '#' + base.$fileInput.attr("id");
        }
        else {
            base.fileInputId = configs.fileInputId.includes("#") ? configs.fileInputId : '#' + configs.fileInputId;
            base.$fileInput = $(base.fileInputId);
        }

        base.laddaBtn = Ladda.create(document.querySelector(base.btnId));
        base.callback = configs.callback;

        base.init = function () {
            base.initAjaxUpload();
            return this;
        };

        base.initAjaxUpload = function () {
            base.$form.submit(function (event) {
                base.laddaBtn.start();
                event.preventDefault();
                event.stopPropagation();
                var formData = new FormData();
                formData.append('File', base.$fileInput.get(0).files[0]);
                console.log(formData);
                $.ajax({
                    url: base.$form.attr('action'),
                    data: formData,
                    type: 'POST',
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        setTimeout(function () {
                            base.callback(response);
                            base.laddaBtn.stop();
                        }, 1000);
                    }
                });
            });
        };

        return base.init();
    }

    $.fn.ajaxFileUpload = function (config) {
        var configs = $.extend({}, $.fn.ajaxFileUpload.defaults, config);
        return new $.ajaxFileUpload(this, configs);
    }

    $.fn.ajaxFileUpload.defaults = {
        submitBtnId: "",
        fileInputId: "",
        callback: function (response) {
            alert(response.message);
        }
    };
}(jQuery));
