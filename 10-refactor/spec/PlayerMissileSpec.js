/*

  Requisitos: 

  La nave del usuario disparará 2 misiles si está pulsada la tecla de
  espacio y ha pasado el tiempo de recarga del arma.

  El arma tendrá un tiempo de recarga de 0,25s, no pudiéndose enviar
  dos nuevos misiles antes de que pasen 0,25s desde que se enviaron
  los anteriores



  Especificación:

  - Hay que añadir a la variable sprites la especificación del sprite
    missile

  - Cada vez que el usuario presione la tecla de espacio se añadirán
    misiles al tablero de juego en la posición en la que esté la nave
    del usuario. En el código de la clase PlayerSip es donde tienen
    que añadirse los misiles

  - La clase PlayerMissile es la que implementa los misiles. Es
    importante que la creación de los misiles sea poco costosa pues va
    a haber muchos disparos, para lo cual se declararán los métodos de
    la clase en el prototipo

*/


describe("PlayerMissile",function() {
        var canvas,ctx ;

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
 

    it ("cargar misiles",function() {
        SpriteSheet.map = {
                draw: function(ctx, name, x, y) {},
                missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }
            }

        var pm = new PlayerMissile(1,1000) ;
        expect(pm.w).toEqual( SpriteSheet.map['missile'].w) ; 
        expect(pm.h).toEqual( SpriteSheet.map['missile'].h) ;
        expect(pm.x).toEqual( 1- SpriteSheet.map['missile'].w/2 ) ;
        expect(pm.y).toEqual( 1000-SpriteSheet.map['missile'].h) ;
 
    }) ; 

    it("step",function() {
            SpriteSheet.map = {
                draw: function(ctx, name, x, y) {},
                missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }
            }
             pm = new PlayerMissile(1,1000);

             pm.step(1) ; 
            
             expect(pm.x).toEqual(0) ; 
             expect(pm.y).toEqual(290) ; 

            //Ahora falta probar el remove 

            var dummyBoard = { remove: function(obj) {} };

            pm.board = dummyBoard;
            spyOn(dummyBoard, "remove");
            pm.step(-1+(-pm.h-pm.y)/pm.vy); 
            expect(dummyBoard.remove).not.toHaveBeenCalled();


            pm.step(1000+(-pm.h-pm.y)/pm.vy); 
            expect(dummyBoard.remove).toHaveBeenCalled();
            expect(dummyBoard.remove).toHaveBeenCalledWith(pm);

            

    }) ;

    
    it("draw",function() {
    
           SpriteSheet.map = {
                draw: function(ctx, name, x, y) {},
                missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }
            }
            pm = new PlayerMissile(1,1000);
            spyOn(SpriteSheet, "draw");
            pm.draw(ctx) ; 
            expect(SpriteSheet.draw).toHaveBeenCalled();
            expect(SpriteSheet.draw).toHaveBeenCalledWith(ctx,'missile', pm.x, pm.y); 
            expect(SpriteSheet.draw.calls[0].args[0]).toEqual(ctx);
            expect(SpriteSheet.draw.calls[0].args[0]).not.toEqual("missile");
            expect(SpriteSheet.draw.calls[0].args[1]).toEqual("missile");
            expect(SpriteSheet.draw.calls[0].args[2]).toEqual(pm.x);
            expect(SpriteSheet.draw.calls[0].args[3]).toEqual(pm.y);

       }) ; 



}); 
