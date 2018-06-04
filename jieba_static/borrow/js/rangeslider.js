$.fn.RangeSlider = function (cfg) {
    this.sliderCfg = {
        min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null, 
        max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
        step: cfg && Number(cfg.step) ? cfg.step : 1,
        callback: cfg && cfg.callback ? cfg.callback : null
    };

    var $input = $(this);
    var min = this.sliderCfg.min;
    var max = this.sliderCfg.max;
    var step = this.sliderCfg.step;
    var callback = this.sliderCfg.callback;

    $input.attr('min', min)
        .attr('max', max)
        .attr('step', step);
     console.log(  $input);
    $input.bind("input", function (e) {
        $input.attr('value', this.value);
        $input.removeAttr("style");
        var num = parseInt(this.value);
        var v = ((num -min)*100) / (max - min);

        
         $input.css( 'background-size', (v)+ '% 100%' ); 
      
    
        if ($.isFunction(callback)) {
            callback(this);
        }
    });

};