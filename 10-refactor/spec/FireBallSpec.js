describe("FireBallSpec", function () {

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


        it("step",function() {

            SpriteSheet.map = {
                        draw: function(ctx, name, x, y) {},
                        explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
                }
            
             fireball = new PlayerFireball(1,100,100) ; 
             //fireball.step(0.1) ; // t = 1s //FALLA AQUI, ARREGLARLO 

             //expect(fireball.x).toEqual(100) ; 


        
        
        }) ; 
        
        
        it ("draw",function() {
                SpriteSheet.map = {
                        draw: function(ctx, name, x, y) {},
                        explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
                }
        
                fireball = new PlayerFireball(1,100,100) ; 
                spyOn(SpriteSheet,"draw") ; 
                fireball.draw(ctx) ; 
                expect(SpriteSheet.draw).toHaveBeenCalled() ; 
                expect(SpriteSheet.draw.calls[0].args[0]).toEqual(ctx) ; 
                expect(SpriteSheet.draw.calls[0].args[1]).toEqual('explosion') ;
                expect(SpriteSheet.draw.calls[0].args[1]).not.toEqual('missile') ;  
                
        
        }) ; 







}) ; 
