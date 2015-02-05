
enyo.kind({
    name: "myapp.MainView",
    kind: "FittableRows",
    classes: "enyo-fit",
    published: {
        day_num_today: -1
    },
    components: [
        {name: "TBpanels", kind: "Panels", arrangerKind: "TopBottomArranger", margin: 0,
            classes: "top-bottom-panels enyo-fit ",
            realtimeFit: true, components: [
                {name: "app_scroller", kind: "Scroller", classes: "enyo-fit app-scoller",
                    horizontal: "hidden", touch: true, components: [
                        {name: "app_container", classes: "app-container enyo-fit",
                            kind: "FittableRows",
                            components: [
                                {name: "today_date", classes: "today-date",
                                    components: [
                                        {name: "today_date_box",
                                            classes: "today-date-box",
                                            components: [
                                                {name: "today_full_date", classes: "today-full-date"},
                                                {content: "Today", classes: "today-text"}
                                            ]
                                        }
                                    ]
                                },
                                {name: "days", classes: "days-container", components: [
                                        {name: "days_in_bricks",
                                            components: [
                                                {name: "bricks_repeater", kind: "Repeater",
                                                    onSetupItem: "setupBricks", components: [
                                                        {name: "brick", classes: "brick-work-day"}
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {name: "info_date", classes: "info-date",
                                    components: [
                                        {name: "info_date_box",
                                            classes: "info-date-box",
                                            components: [
                                                {name: "info_date_box_text",
                                                    classes: "info-date-box-text"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {name: "goto_reseter", classes: "goto-reseter",
                                    components: [
                                        {name: "goto_reseter_box", ontap: "gotoReseter",
                                            classes: "goto-reseter-box",
                                            components: [
                                                {name: "goto_rester_box_text",
                                                    classes: "goto-reseter-box-text",
                                                    content: "Reset"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                    {tag: "a", classes: "author", content: "© Prataksha Gurung",
                                        attributes: {
                                            href: "http://fi.linkedin.com/pub/prataksha-gurung/66/4a7/758",
                                            target: "_blank"
                                        }
                                    }
                            ]
                        }
                    ]
                },
                {name: "reseter", classes: "reseter",
                    components: [
                        {name: "reseter_scroller", kind: "Scroller", classes: "enyo-fit app-scoller",
                            horizontal: "hidden", touch: true, components: [
                                {name: "go_back", classes: "go-back",
                                    components: [
                                        {name: "go_back_box", ontap: "goBack",
                                            classes: "go-back-box",
                                            components: [
                                                {classes: "go-back-box-text",
                                                    content: "Back"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {tag: "h1", content: "Submit first day of work after the last free/off day:"},
                                {classes: "onyx-toolbar-inline", components: [
                                        {name: "start_date", kind: "onyx.DatePicker"}
                                    ]
                                },
                                {kind: "onyx.Button", content: "Submit",
                                    classes: "onyx-blue submit-btn", ontap: "submitFirstDay"
                                },
                                {name: "set_work_days", classes: "set-work-days",
                                    components: [
                                        {name: "set_work_days_box",
                                            classes: "set-work-days-box", ontap: "gotoSetWorkDays",
                                            components: [
                                                {name: "set_work_days_box_text",
                                                    classes: "set-work-days-box-text",
                                                    content: "Set Days"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]}
                    ]
                },
                {name: "days_setter", classes: "day-setter",
                    components: [
                        {name: "days_setter_scroller", kind: "Scroller", classes: "enyo-fit app-scoller",
                            horizontal: "hidden", touch: true, components: [
                                {name: "go_back_2", classes: "go-back",
                                    components: [
                                        {name: "go_back_box_2", ontap: "goBack",
                                            classes: "go-back-box",
                                            components: [
                                                {classes: "go-back-box-text",
                                                    content: "Back"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {tag: "br"}, {tag: "br"},
                                {classes: "onyx-toolbar-inline work-days-setter", components: [
                                        {content: "Number of straight work days: "},
                                        {kind: "onyx.PickerDecorator", components: [
                                                {style: "min-width: 60px"},
                                                {kind: "onyx.IntegerPicker", name: "total_work_days",
                                                    min: 1, max: 8,
                                                    value: 6}
                                            ]}
                                    ]
                                },
                                {classes: "onyx-toolbar-inline free-days-setter", components: [
                                        {content: "Number of straight free/off days: "},
                                        {kind: "onyx.PickerDecorator", components: [
                                                {style: "min-width: 60px;"},
                                                {kind: "onyx.IntegerPicker", name: "total_free_days",
                                                    min: 1, max: 8,
                                                    value: 2}
                                            ]}
                                    ]
                                },
                                {kind: "onyx.Button", content: "Submit",
                                    classes: "onyx-blue submit-btn",
                                    ontap: "submitTotalDays"
                                }
                            ]
                        }
                    ]}
            ]
        }
    ],
    rendered: function() {
        this.$.today_full_date.setContent(this.getDayName(new Date().getDay())
                + " " + this.getMonthName(new Date().getMonth()) + " " +
                new Date().getDate() + " " + new Date().getFullYear());
        this.$.app_scroller.render();
        this.$.reseter_scroller.render();
        this.$.days_setter_scroller.render();
        this.defineToday();
        this.$.bricks_repeater.setCount((parseInt(window.localStorage.getItem("totalWorkDays"))
                + parseInt(window.localStorage.getItem("totalFreeDays"))) || 0);
        this.$.TBpanels.setIndex(0);
    },
    defineToday: function() {
        //var today = new Date().getMonth() + 1 + "/" + new Date().getDate() + "/" + new Date().getFullYear();
        var today = [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()];
        var start_date = window.localStorage.getItem("startDate").split("/");
        var day_num = Math.floor((Date.parse(this.getMonthName(today[1] - 1)+" "+today[2]+", "+today[0]) - Date.parse(this.getMonthName(start_date[0] - 1)+" "+start_date[1]+", 20"+start_date[2])) / 86400000);
        do {
            if(day_num > 8) day_num = day_num - 8;
        } while (day_num > 8);
        if(day_num === 8) day_num = 0;
        this.setDay_num_today(day_num);
    },
    getDayName: function(day_index) {
        var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        return days[day_index] || undefined;
    },
    getMonthName: function(month_index) {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[month_index] || undefined;
    },
    setupBricks: function(inSender, inEvent) {
        if (inEvent.index <= (parseInt(window.localStorage.getItem("totalWorkDays")) - 1)) {
            inEvent.item.$["brick"].addRemoveClass("brick-day-off", false);
            inEvent.item.$["brick"].addRemoveClass("brick-work-day", true);
        } else {
            inEvent.item.$["brick"].addRemoveClass("brick-work-day", false);
            inEvent.item.$["brick"].addRemoveClass("brick-day-off", true);
        }

        if ((inEvent.index) === this.getDay_num_today()) {
            inEvent.item.$["brick"].addRemoveClass("brick-today", true);
            
            var bool = true;
            var brickAnimation = setInterval(function () {
                inEvent.item.$["brick"].addRemoveClass("brick-today-anim", bool);
                bool = !bool;
            }, 500);
            
            if (inEvent.index > (parseInt(window.localStorage.getItem("totalWorkDays")) - 1)) {
                this.$.info_date_box_text.setContent("Free Day");
            } else {
                this.$.info_date_box_text.setContent("Work Day");
            }
        }
    },
    gotoReseter: function(inSender, inEvent) {
        this.$.TBpanels.next();
        return true;
    },
    goBack: function(inSender, inEvent) {
        this.$.TBpanels.previous();
        return true;
    },
    gotoSetWorkDays: function(inSender, inEvent) {
        this.$.TBpanels.next();
        return true;
    },
    submitFirstDay: function(inSender, inEvent) {
        var fmt_date = this.format_date();
        var start_date = fmt_date.format(this.$.start_date.getValue());
        window.localStorage.setItem("startDate", start_date);
        this.defineToday();
        this.$.bricks_repeater.build();
        this.$.TBpanels.setIndex(0);
        return true;
    },
    format_date: function(dateComponents) {
        return (fmt = new enyo.g11n.DateFmt({
            dateComponents: dateComponents || undefined,
            date: 'short',
            locale: new enyo.g11n.Locale(this.locale)
        }));
    },
    submitTotalDays: function(inEvent, inSender) {
        window.localStorage.setItem("totalWorkDays", this.$.total_work_days.getValue());
        window.localStorage.setItem("totalFreeDays", this.$.total_free_days.getValue());
        this.defineToday();
        if (this.$.bricks_repeater.getCount() === (this.$.total_work_days.getValue() + this.$.total_free_days.getValue()))
            this.$.bricks_repeater.build();
        else
            this.$.bricks_repeater.setCount(this.$.total_work_days.getValue() + this.$.total_free_days.getValue());
        this.$.TBpanels.setIndex(0);
        return true;
    }
});
