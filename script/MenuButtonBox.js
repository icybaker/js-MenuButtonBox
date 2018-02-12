class MenuButtonBox {
    constructor(box,desktopOff,initColors,popColors){
        if(window.activeMenuButton != null){window.activeMenuButton = null;}
        this.isMobile = this.checkMobile();
        this.buttonColors = [initColors[0],popColors[0]];
        this.barColors = [initColors[1],popColors[1]];
        
        if(!this.isMobile && desktopOff){
            box.style.display = "none";
            box.showMenu = true;
        }
        else{
            this._initButtonStyles(box,this.buttonColors);
            this._initBars(box,this.barColors);
            this.attachListener(box,"click",this._ev_togglePop);
            this.attachListener(box,"click",this._ev_stopPropagation);
            this.attachListener(window,"click",this._ev_unPop);
            box.showMenu = false;
        }
    }
    checkMobile(){
        var W = window.innerWidth, H = window.innerHeight;
        if((W/H)>1){return false;}
        else{return true;}
    }
    _initButtonStyles(button,colors){
        if(window.getComputedStyle(button,null).position == "static"){
            button.style.position = "relative";
        }
        if(window.getComputedStyle(button,null).height == "0px"){
            button.style.height = "40px";
        }
        button.style.width = button.style.height;
        button.style.backgroundColor = colors[0];
        button.colors = colors;
        button.isClicked = false;
        button.transform = this.transformBars;
    }
    _initBars(button,colors){
        var bars = [document.createElement("div"),document.createElement("div"),document.createElement("div")];
        for(var i=0;i<3;i++){
            button.appendChild(bars[i]);
        }
        this._initBarStyles(bars,colors);
    }
    _initBarStyles(bars,colors){
        for(var i=0;i<3;i++){
            bars[i].style.position = "absolute";
            bars[i].style.height = "12%";
            bars[i].style.width = "80%";
            bars[i].style.top = ((i+1)*16+i*12)+"%";
            bars[i].style.left = "10%";
            bars[i].style.backgroundColor = colors[0];
            bars[i].colors = colors;
        }
        
    }
    attachListener(element,action,listenerFunction){
        element.addEventListener(action,listenerFunction,false);
    }
    _ev_togglePop(evt){
        var button = evt.currentTarget, bars = button.children,isClicked = button.isClicked;
        if(isClicked){
            button.style.backgroundColor = button.colors[0];
            for(var i=0;i<3;i++){
                bars[i].style.backgroundColor = bars[i].colors[0]
            }
            button.transform(bars,isClicked);
            button.isClicked = false;
            window.activeMenuButton = null;
            console.log("togglePop activated unPop");
        }
        else{
            button.style.backgroundColor = button.colors[1];
            for(var i=0;i<3;i++){
                bars[i].style.backgroundColor = bars[i].colors[1]
            }
            button.transform(bars,isClicked);
            button.isClicked = true;
            window.activeMenuButton = button;
            console.log("togglePop activated Pop");
        }
    }
    _ev_stopPropagation(evt){
        evt.stopPropagation();
    }
    _ev_unPop(evt){
        var target = evt.currentTarget, button = target.activeMenuButton;
        if(button != null){
            console.log("unpop trigured");
            var bars = button.children, isClicked = button.isClicked;
            button.style.backgroundColor = button.colors[0];
            for(var i=0;i<3;i++){
                bars[i].style.backgroundColor = bars[i].colors[0]
            }
            button.transform(bars,isClicked);
            button.isClicked = false;
            window.activeMenuButton = null;
        }
    }
    transformBars(bars,isClicked){
        if(isClicked){
            TweenMax.to(bars[0],.5,{rotationZ:0,transformOrigin:"50% 50% 0%"});
            TweenMax.to(bars[2],.5,{rotationZ:0,transformOrigin:"50% 50% 0%"});

            TweenMax.to(bars[0],.5,{top:"16%"}).delay(.5);
            TweenMax.set(bars[1],{display:"block"}).delay(.5);
            TweenMax.to(bars[2],.5,{top:"72%"}).delay(.5);
        }
        else{
            TweenMax.to(bars[0],.5,{top:"44%"});
            TweenMax.set(bars[1],{display:"none"});
            TweenMax.to(bars[2],.5,{top:"44%"});

            TweenMax.to(bars[0],.5,{rotationZ:45,transformOrigin:"50% 50% 0%"}).delay(.5);
            TweenMax.to(bars[2],.5,{rotationZ:-45,transformOrigin:"50% 50% 0%"}).delay(.5);
            
        }
    }

    static initMenuButtonBox(selector,{desktopOff = true,initColors = ["transparent","darkgray"],popColors=["black","white"]}={}){
        var box = document.querySelectorAll(selector)[0];
        var menuButtonBox = new MenuButtonBox(box,desktopOff,initColors,popColors);
        return menuButtonBox;
    }
    static _doc(){
        var docString = ``;
        console.log(docString);
        return docString;
    }
}