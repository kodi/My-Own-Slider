
var MyOwnSlider = function(){

    var SLIDER_CONTAINER_ID = null;
    var SLIDER_WRAPPER_ID = '#item_wrapper';
    var SLIDER_ITEM_CLASS = '.slider_item';
    var SWING_TIME = 800;
    var CONTENT_WIDTH = null;
    var SLIDER_ITEM_MARGIN_RIGHT = 24;
    var LAST_ELM_WIDTH = null;
    var LEFT = 0;
    var STEP = 524;
    var EASING_NAME = 'easeInOutCubic';
    var SLIDER_CONTAINER_WIDTH = null;
    var ITEMS = [];
    var CURRENT_INDEX = -1;
    var CURRENT_RIGHT_EDGE = 0;

    return {

        /**
         * ----------------------------------------
         * @param sliderContainerId
         */
        init:function(sliderContainerId){

            //prevent multiple calls
            if(SLIDER_CONTAINER_ID === null){
                SLIDER_CONTAINER_ID = '#'+sliderContainerId;
                this.setup();
            }
        },

        /**
         * ----------------------------------------
         */
        setup: function(){
            this.calculateContentSize();
            this.addListeners();
            CURRENT_INDEX = 0;

        },

        /**
         * ----------------------------------------
         */
        calculateContentSize: function(){

            SLIDER_CONTAINER_WIDTH = $(SLIDER_CONTAINER_ID).width();

            CONTENT_WIDTH = 0;
            LAST_ELM_WIDTH = 0;

            $(SLIDER_ITEM_CLASS).each((function(index, element){

                var width = $(element).width();

                if(width > 0){
                    ITEMS.push({
                        width: width
                    });
                    CONTENT_WIDTH += (width + SLIDER_ITEM_MARGIN_RIGHT );
                    LAST_ELM_WIDTH = width;

                }
            }));

            CURRENT_RIGHT_EDGE = ITEMS[0].width + SLIDER_ITEM_MARGIN_RIGHT;

        },

        /**
         * ----------------------------------------
         */
        addListeners: function(){
            var self = this;
            $(document).keydown(function(e){
                if (e.keyCode == 39) {
                   self.moveRight();
                   return false;
                }

                if(e.keyCode == 37){
                   self.moveLeft();
                   return false;
                }
            });
        },

        /**
         * ----------------------------------------
         */
        moveRight: function(){

            if(typeof(ITEMS[CURRENT_INDEX + 1 ]) == 'undefined'){
                return;
            }

            if(CURRENT_RIGHT_EDGE >= SLIDER_CONTAINER_WIDTH/2 ){
                var niceStep =  CURRENT_RIGHT_EDGE - ((SLIDER_CONTAINER_WIDTH - (ITEMS[CURRENT_INDEX + 1 ].width )) / 2) ;
            }


            if( CURRENT_INDEX < ITEMS.length ){

                CURRENT_INDEX += 1;
                CURRENT_RIGHT_EDGE = (CURRENT_RIGHT_EDGE - niceStep) + ITEMS[CURRENT_INDEX].width + SLIDER_ITEM_MARGIN_RIGHT;

                $(SLIDER_WRAPPER_ID).animate({
                    left: '-='+niceStep
                }, SWING_TIME, EASING_NAME, function() {

                });

                LEFT += niceStep;
            }
        },

        /**
         * ----------------------------------------
         */
        moveLeft: function(){

             if(typeof(ITEMS[CURRENT_INDEX - 1 ]) == 'undefined'){
                return;
             }

            if(CURRENT_RIGHT_EDGE >= SLIDER_CONTAINER_WIDTH/2 ){
                var niceStep =   CURRENT_RIGHT_EDGE - ((SLIDER_CONTAINER_WIDTH - (ITEMS[CURRENT_INDEX - 1 ].width )) / 2);
             }


            if(LEFT > 0 ){

                CURRENT_INDEX -= 1;
                CURRENT_RIGHT_EDGE = (CURRENT_RIGHT_EDGE - niceStep) + ITEMS[CURRENT_INDEX].width + SLIDER_ITEM_MARGIN_RIGHT;

                $(SLIDER_WRAPPER_ID).animate({
                    left: '+='+niceStep
                }, SWING_TIME, EASING_NAME , function() {

                });

                LEFT -= niceStep;
            }
        }
    }
}();

