/*

  Requisitos:

    El objetivo de este prototipo es a�adir niveles al juego. En cada
    nivel deber�n ir apareciendo bater�as de enemigos seg�n avanza el
    tiempo.

    Cada nivel termina cuando no quedan enemigos por crear en ninguno
    de sus niveles, y cuando todos los enemigos del nivel han
    desaparecido del tablero de juegos (eliminados por misiles/bolas
    de fuego o desaparecidos por la parte de abajo de la pantalla).

    Cuando terminan todos los niveles sin que la nave haya colisionado
    termina el juego, ganando el jugador.

    Cuando la nave del jugador colisiona con un enemigo debe terminar
    el juego, perdiendo el jugador.


  Especificaci�n:

    El constructor Level() recibir� como argumentos la definici�n del
    nivel y la funci�n callback a la que llamar cuando termine el
    nivel.

    La definici�n del nivel tiene este formato:
      [ 
        [ parametros de bateria de enemigos ] , 
        [ parametros de bateria de enemigos ] , 
        ... 
      ]


      Los par�metros de cada bater�a de enemigos son estos:
           Comienzo (ms),  Fin (ms),   Frecuencia (ms),  Tipo,    Override
 Ejemplo:
         [ 0,              4000,       500,              'step',  { x: 100 } ]


    Cada vez que se llame al m�todo step() del nivel �ste comprobar�:

      - si ha llegado ya el momento de a�adir nuevos sprites de alguna
        de las bater�as de enemigos.
    
      - si hay que eliminar alguna bater�a del nivel porque ya ha
        pasado la ventana de tiempo durante la que hay tiene que crear
        enemigos

      - si hay que terminar porque no quedan bater�as de enemigos en
        el nivel ni enemigos en el tablero de juegos.

*/



  describe("Level spec", function() {
        
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




    
    it("construir un level",function(){

        var level1 = [
      //  Comienzo, Fin,   Frecuencia,  Tipo,       Override
        [ 0,        4000,  500,         'step'                 ],
        [ 6000,     13000, 800,         'ltr'                  ],
        [ 10000,    16000, 400,         'circle'               ],
        [ 17800,    20000, 500,         'straight', { x: 50  } ],
        [ 18200,    20000, 500,         'straight', { x: 90  } ],
        [ 18200,    20000, 500,         'straight', { x: 10  } ],
        [ 22000,    25000, 400,         'wiggle',   { x: 150 } ],
        [ 22000,    25000, 400,         'wiggle',   { x: 100 } ]


    ];
    

    var level = new Level(level1,loseGame) ;
    expect(level.callback).toBe(loseGame) ;

    expect(level.levelData.length).toBe(8) ; 
    expect(level.levelData.length).toBe(level1.length) ;


    }); 

    it("level.step()",function(){

        SpriteSheet.map = {
				ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
				missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
				enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
				enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
				enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
				enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 },
				explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }}


            var level1 = [
      //  Comienzo, Fin,   Frecuencia,  Tipo,       Override
        [ 0,        4000,  500,         'step'                 ],
        [ 6000,     13000, 800,         'ltr'                  ],
        [ 10000,    16000, 400,         'circle'               ],
        [ 17800,    20000, 500,         'straight', { x: 50  } ],
        [ 18200,    20000, 500,         'straight', { x: 90  } ],
        [ 18200,    20000, 500,         'straight', { x: 10  } ],
        [ 22000,    25000, 400,         'wiggle',   { x: 150 } ],
        [ 22000,    25000, 400,         'wiggle',   { x: 100 } ]


    ];


        var level = new Level(level1,loseGame) ;

        var gameBoard = new GameBoard() ; 
        gameBoard.add(level) ; 
        
        expect(level.callback).toBe(loseGame) ; 
        spyOn(level.board,"add") ; 
        spyOn(level,"callback") ; 
        level.step(2) ;
        expect(level.board.add).toHaveBeenCalled() ; 
        expect(level.t).toBe(2000);
        expect(level.levelData.length).toBe(8) ; 
        expect(level.levelData.length).toBe(level1.length) ;

        //Ya ha pasado el tiempo y no hay enemigos 
        level.t = 25001;
		level.board.cnt[OBJECT_ENEMY] = 0;
		level.step(89);
		expect(level.callback).toHaveBeenCalled();




    }) ; 



}); 
