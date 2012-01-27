
var MyOwnSlider = function(){



    var SLIDER_CONTAINER_ID = null;
    var SLIDER_WRAPPER_ID = '#item_wrapper';
    var SLIDER_ITEM_CLASS = '.slider_item';
    var SWING_TIME = 250;
    var CONTENT_WIDTH = null;
    var SLIDER_ITEM_MARGIN_RIGHT = 24;
    var LAST_ELM_WIDTH = null;

    var LEFT = 0;

    var STEP = 400;

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
            $(SLIDER_CONTAINER_ID).addClass('mos_container');
            this.calculateContentSize();
            this.addListeners();
        },

        calculateContentSize: function(){

            CONTENT_WIDTH = 0;
            LAST_ELM_WIDTH = 0;

            $(SLIDER_ITEM_CLASS).each((function(index, element){

                var width = $(element).width();

                if(width > 0){
                    CONTENT_WIDTH += (width + SLIDER_ITEM_MARGIN_RIGHT );
                    console.log(CONTENT_WIDTH);
                    LAST_ELM_WIDTH = width;


                }
                //console.log(element);

            }));

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


            if( (LEFT +STEP ) < (CONTENT_WIDTH - LAST_ELM_WIDTH ) ){

                $(SLIDER_WRAPPER_ID).animate({
                    left: '-='+STEP
                }, SWING_TIME, 'swing', function() {

                    // Animation complete. CALLBACK?

                });

                LEFT += STEP;

                console.log(LEFT);
            }
        },

        /**
         * ----------------------------------------
         */
        moveLeft: function(){

            if(LEFT > 0 ){

                $(SLIDER_WRAPPER_ID).animate({
                    left: '+='+STEP
                }, SWING_TIME, 'swing', function() {

                    // Animation complete. CALLBACK?

                });

                LEFT -= STEP;
            }
        }

    }

}();

