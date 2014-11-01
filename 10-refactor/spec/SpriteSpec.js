describe("SpriteSpec",function() {
    beforeEach(function(){
                    loadFixtures("index.html") ; 
                    canvas = $('#game')[0] ;
                    expect(canvas).toExist() ; 

                    ctx=canvas.getContext('2d') ; 
                    expect(ctx).toBeDefined() ;  

                    oldGame = Game ; 
            });

            afterEach(function() {
                Game = oldGame ; 
            });


    it("setup",function() {



    }) ;




    it ("merge",function(){




    }) ;




    it("draw",function() {
        var sp = new Sprite();
        SpriteSheet.map = function(ctx,name,x,y,frame) {};
        spyOn(SpriteSheet, "draw");
        sp.draw(ctx);
        expect(SpriteSheet.draw).toHaveBeenCalledWith(ctx,sp.sprite, sp.x, sp.y, sp.frame);
  

    }) ; 











}) ; 
