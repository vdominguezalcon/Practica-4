describe("FireBallSpec", function () {


        it("step",function() {
        
        
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
