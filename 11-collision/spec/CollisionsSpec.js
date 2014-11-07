/*

  Requisitos:

  El objetivo de este prototipo es que se detecten colisiones entre
  varios tipos de sprites:
  
  - Los misiles tienen ahora una nueva propiedad: el da�o (damage) que
    infligen a una nave enemiga cuando colisionan con ella. Cuando un
    misil colisione con una nave enemiga le infligir� un da�o de
    cierta cuant�a (damage) a la nave enemiga con la que impacta, y
    desaparecer�.

  - Las naves enemigas tienen ahora una nueva propiedad: su salud
    (health).  El da�o ocasionado a una nave enemiga por un misil har�
    que disminuya la salud de la nave enemiga, y cuando llegue a cero,
    la nave enemiga desaparecer�.

  - cuando una nave enemiga colisione con la nave del jugador, deber�
    desaparecer tanto la nave enemiga como la nave del jugador.



  Especificaci�n:

  En el prototipo 07-gameboard se a�adi� el constructor GameBoard. El
  m�todo overlap() de los objetos creados con GameBoard() ofrece
  funcionalidad para comprobar si los rect�ngulos que circunscriben a
  los sprites que se le pasan como par�metros tienen intersecci�n no
  nula. El m�todo collide() de GameBoard utiliza overlap() para
  detectar si el objeto que se le pasa como primer par�metro ha
  colisionado con alg�n objeto del tipo que se le pasa como segundo
  par�metro.

  En este prototipo se utilizar� el m�todo collide() para detectar los
  siguientes tipos de colisiones:

    a) detectar si un misil disparado por la nave del jugador
       colisiona con una nave enemiga

    b) detectar si una nave enemiga colisiona con la nave del jugador


  En el m�todo step() de los objetos creados con PlayerMissile() y
  Enemy(), tras "moverse" a su nueva posici�n calculada, se comprobar�
  si han colisionado con alg�n objeto del tipo correspondiente. 

  No interesa comprobar si se colisiona con cualquier otro objeto,
  sino s�lo con los de ciertos tipos. El misil tiene que comprobar si
  colisiona con naves enemigas. Por otro lado, tras moverse una nave
  enemiga, �sta tiene que comprobar si colisiona con la nave del
  jugador. Para ello cada sprite tiene un tipo y cuando se comprueba
  si un sprite ha colisionado con otros, se pasa como segundo
  argumento a collide() el tipo de sprites con los que se quiere ver
  si ha colisionado el objeto que se pasa como primer argumento.

  Cuando un objeto detecta que ha colisionado con otro, llama al
  m�todo hit() del objeto con el que ha colisionado. 


  Efectos de las colisiones de un misil con una nave enemiga:

    Cuando el misil llama al m�todo hit() de una nave enemiga, pasa
    como par�metro el da�o que provoca para que la nave enemiga pueda
    calcular la reducci�n de salud que conlleva la colisi�n. Cuando
    una nave enemiga recibe una llamada a su m�todo .hit() realizada
    por un misil que ha detectado la colisi�n, la nave enemiga
    recalcula su salud reduci�ndola en tantas unidades como el da�o
    del misil indique, y si su salud llega a 0 desaparece del tablero
    de juegos, produci�ndose en su lugar la animaci�n de una
    explosi�n.

    El misil, tras informar llamando al m�tod hit() de la nave enemiga
    con la que ha detectado colisi�n, desaparece.


  Efectos de las colisiones de una nave enemiga con la nave del jugador:

    Cuando la nave del jugador recibe la llamada .hit() realizada por
    una nave enemiga que ha detectado la colisi�n, la nave del jugador
    desaparece del tablero.

    La nave enemiga, tras informar llamando a hit() de la nave del
    jugador, desaparece tambi�n.

*/

describe("Collision spec",function() {

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

    it("un misil destruye una nave",function() {
         SpriteSheet.map = {
                missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
             };
            
            Game = {width: 320, height: 480};
            
            var gameBoard = new GameBoard();

            var misil = new PlayerMissile(10,10);
            misil.x = 10;
            misil.y = 10;
            misil.damage = 20;
            
            var enemies = {
             
                        basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 }

                };

            var enemy = new Enemy(enemies.basic,{x:200});
            enemy.x = 10;
            enemy.y = 10;
            enemy.health = 19;

            gameBoard.add(misil);
            gameBoard.add(enemy);


            expect(gameBoard.objects.length).toEqual(2);
            gameBoard.step(0.0001);

            expect(gameBoard.objects.length).toEqual(1);
            expect(gameBoard.removed.length).toEqual(2); 
            expect(gameBoard.objects.length).toEqual(1);
            expect(enemy.health).toBe(-1); //Enemigo muerto

    }); 

    it ("un misil no destruye una nave",function() {
            SpriteSheet.map = {
                missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
             };
            
            Game = {width: 320, height: 480};
            
            var gameBoard = new GameBoard();

            var misil = new PlayerMissile(10,10);
            misil.x = 10;
            misil.y = 10;
            misil.damage = 5;

            var enemies = {
             
                        basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 }

                };

            var enemy = new Enemy(enemies.basic,{x:200});
            enemy.x = 10;
            enemy.y = 10;
            enemy.health = 20;

            gameBoard.add(misil);
            gameBoard.add(enemy);


            expect(gameBoard.objects.length).toEqual(2);
            gameBoard.step(0.0001);

            expect(gameBoard.objects.length).toEqual(1);
            expect(gameBoard.removed.length).toEqual(1); 
            expect(gameBoard.objects.length).toEqual(1);
            expect(enemy.health).toBe(15); //Enemigo vivo
        });

        it("una bola de fuego destruye una  nave ", function(){
                SpriteSheet.map = {
                    enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                    explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
                };

                Game = {width: 320, height: 480};

               
                var gameBoard = new GameBoard();

                var fireball = new PlayerFireball(10, 10);
                fireball.x = 10 ;
                fireball.y = 10 ; 

                var enemies = {
             
                        basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 }

                };

                var enemy = new Enemy(enemies.basic,{x:200});
                enemy.x = 10;
                enemy.y = 10;
                enemy.health = 20;

                gameBoard.add(fireball);
                gameBoard.add(enemy);
                expect(gameBoard.objects.length).toEqual(2);
                gameBoard.step(0.0001);
                expect(gameBoard.removed.length).toEqual(1);
                expect(gameBoard.objects.length).toEqual(2);//fireball + explosion
                expect(enemy.health).toEqual(-9999999979); //Muerto
        });


        it("la nave enemiga mata a nuestra nave", function(){
            SpriteSheet.map = {
                    ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
                    enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                    explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
                };
            Game = {width: 320, height: 480,keys: {'left': false , 'right':false, 'fire': false}};

            var gameBoard = new GameBoard();

            var miNave = new PlayerShip();
            miNave.x = 10 ;
            miNave.y = 10 ;

            var enemies = {
             
                        basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 }

                };

            var enemy = new Enemy(enemies.basic,{x:200});
            enemy.x = 10 ;
            enemy.y = 10 ;             



            gameBoard.add(miNave); 
            gameBoard.add(enemy);


            expect(gameBoard.objects.length).toEqual(2);
            gameBoard.step(0.0001);
           
            expect(gameBoard.removed.length).toEqual(2);
            expect(gameBoard.objects.length).toEqual(0);
});



}); 
