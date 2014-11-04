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

        var sp = new Sprite () ; 
        sp.merge= function(props){} ;
        SpriteSheet.map ={'missilespec': {w:10, h:11}}  ;
        spyOn(sp,"merge") ; 
        sp.setup('missilespec','merge') ;
       // expect(sp.sprite).toHaveBeenCalled();
        expect(sp.sprite).toBe("missilespec");
        expect(sp.merge).toHaveBeenCalled();
       // expect(sp.merge).toEqual(props) ; 
        expect(sp.w).toEqual(10);
        expect(sp.h).toEqual(11);


    }) ;




    it ("merge",function(){

        var sp = new Sprite() ; 
        sp.merge({i:1,j:2,k:3}) ;
        expect(sp['i']).toEqual(1) ;
        expect(sp['j']).toEqual(2) ;
        expect(sp['k']).toEqual(3) ;
        var sp1 = new Sprite() ; 
        var num = [1,2,3] ; 
        sp1.merge(num) ; 
        expect(sp1[0]).toEqual(1) ;    
        expect(sp1[1]).toEqual(2) ; 
        expect(sp1[2]).toEqual(3) ; 
    




    }) ;




    it("draw",function() {
        var sp = new Sprite();
        SpriteSheet.map = function(ctx,name,x,y,frame) {};
        spyOn(SpriteSheet, "draw");
        sp.draw(ctx);
        expect(SpriteSheet.draw).toHaveBeenCalledWith(ctx,sp.sprite, sp.x, sp.y, sp.frame);
  

    }) ; 











}) ; 
