/*

  En el anterior prototipo (06-player), el objeto Game permite
  gestionar una colecci�n de tableros (boards). Los tres campos de
  estrellas, la pantalla de inicio, y el sprite de la nave del
  jugador, se a�aden como tableros independientes para que Game pueda
  ejecutar sus m�todos step() y draw() peri�dicamente desde su m�todo
  loop(). Sin embargo los objetos que muestran los tableros no pueden
  interaccionar entre s�. Aunque se a�adiesen nuevos tableros para los
  misiles y para los enemigos, resulta dif�cil con esta arquitectura
  pensar en c�mo podr�a por ejemplo detectarse la colisi�n de una nave
  enemiga con la nave del jugador, o c�mo podr�a detectarse si un
  misil disparado por la nave del usuario ha colisionado con una nave
  enemiga.


  Requisitos:

  Este es precisamente el requisito que se ha identificado para este
  prototipo: dise�ar e implementar un mecanismo que permita gestionar
  la interacci�n entre los elementos del juego. Para ello se dise�ar�
  la clase GameBoard. Piensa en esta clase como un tablero de un juego
  de mesa, sobre el que se disponen los elementos del juego (fichas,
  cartas, etc.). En Alien Invasion los elementos del juego ser�n las
  naves enemigas, la nave del jugador y los misiles. Para el objeto
  Game, GameBoard ser� un board m�s, por lo que deber� ofrecer los
  m�todos step() y draw(), siendo responsable de mostrar todos los
  objetos que contenga cuando Game llame a estos m�todos.

  Este prototipo no a�ade funcionalidad nueva a la que ofrec�a el
  prototipo 06.


  Especificaci�n: GameBoard debe

  - mantener una colecci�n a la que se pueden a�adir y de la que se
    pueden eliminar sprites como nave enemiga, misil, nave del
    jugador, explosi�n, etc.

  - interacci�n con Game: cuando Game llame a los m�todos step() y
    draw() de un GameBoard que haya sido a�adido como un board a Game,
    GameBoard debe ocuparse de que se ejecuten los m�todos step() y
    draw() de todos los objetos que contenga

  - debe ofrecer la posibilidad de detectar la colisi�n entre
    objetos. Un objeto sprite almacenado en GameBoard debe poder
    detectar si ha colisionado con otro objeto del mismo
    GameBoard. Los misiles disparados por la nave del jugador deber�n
    poder detectar gracias a esta funcionalidad ofrecida por GameBoard
    cu�ndo han colisionado con una nave enemiga; una nave enemiga debe
    poder detectar si ha colisionado con la nave del jugador; un misil
    disparado por la nave enemiga debe poder detectar si ha
    colisionado con la nave del jugador. Para ello es necesario que se
    pueda identificar de qu� tipo es cada objeto sprite almacenado en
    el tablero de juegos, pues cada objeto s�lo quiere comprobar si ha
    colisionado con objetos de cierto tipo, no con todos los objetos.

*/

describe("GameBoard",function() {
        var gameBoard ; 
        var canvas,ctx ; 
        
        beforeEach(function() {
                loadFixtures("index.html") ; 
                
                canvas = $('#game')[0];
	        expect(canvas).toExist();

	        ctx = canvas.getContext('2d');
	        expect(ctx).toBeDefined();
	        gameBoard = new GameBoard() ;         
        });

        it("Gameboard.add()",function(){ //Vamos a comprobar que a�ade obj a objects
                var obj1= {} ;
                var obj2=gameBoard.add(obj1) ; //Ahora mismo el objeto 2 seria el objeto 1 obj2 = {}
                expect(obj2).toBe(obj1) ;
                
                var obj3 = 2 ;
                var obj4= gameBoard.add(obj3); 
                expect(obj4).toEqual(2) ;  
                
               
        
        });
        
        it("Gameboard.delete()",function(){
                var obj1 = 2 ;
                var obj2 = 5 ;
                var obj3 = 7 ;
                var obj4 =gameBoard.add(obj1) ;
                var obj5 =gameBoard.add(obj2) ;
                var obj6 =gameBoard.add(obj3) ; 
                gameBoard.resetRemoved() ; //INicializa los objetos para borrarlos 
                obj4=gameBoard.remove(obj1) ;
                obj5=gameBoard.remove(obj2) ; 
                obj6=gameBoard.remove(obj3) ; 
                expect(gameBoard.removed[0]).toEqual(2) ;
                expect(gameBoard.removed[1]).toEqual(5) ; 
                expect(gameBoard.removed[2]).not.toEqual(8) ; 
                gameBoard.finalizeRemoved() ; //LOs borra
                   
        
        }); 
        
        
        it("GameBoard.iterate()",function(){
            var doble =  {

                draw: function() {}
            } ;

            spyOn(doble,"draw") ; 
            gameBoard.add(doble) ;
            gameBoard.iterate('draw',ctx) ; 
            expect(doble.draw).toHaveBeenCalled() ; 
                   
        }) ; 
        
        
        it("Gameboard.detect()",function(){
                gameBoard.objects= [{obj1:"alfredo"},{obj1:"bautista"}] ;
                
               
              

                var unckeck = function() {
                        return this.obj1 == "pepe" ;
                };

                expect(gameBoard.detect(unckeck)).toBe(false) ; 
        
        
        
        }) ; 
        
        
        
        it ("GameBoard.step()",function() {
                spyOn(gameBoard,"step") ;
                gameBoard.step(ctx) ; 
                waits(200) ;  
                expect(gameBoard.step).toHaveBeenCalled ; //Para probar que ha sido llamado 
                
        
        
        
        }) ; 
        
        
        it("GameBoard.draw()",function(){
                spyOn(gameBoard,"draw") ; 
                gameBoard.draw(ctx) ;
                waits(200) ; //Esperamos un tiempo para que se carge
                expect(gameBoard.draw).toHaveBeenCalled() ; 
        
        
        }) ; 
        
        
        it("Gameboard.overlap()",function(){
                var obj1 ={x:0,y:0,w:3,h:3} ;
                expect(gameBoard.overlap(obj1,obj1)).toBe(true) ;
                expect(gameBoard.overlap(obj1,{x:1,y:1,w:3,h:3})).toBe(true) ; 
                expect(gameBoard.overlap(obj1,{x:9,y:9,w:3,h:3})).toBe(false) ; 
        
        
        }); 
        
        it("GameBoard.collide()",function() {
                gameBoard.objects = [{type :1, x:0,y:0,w:3,h:3} ] ;//La vamos a llamar con type
                var obj1 = {x:12,y:11,w:10,h:9} ;
                //var obj2 = {x:0,y:0,w:3,h:3} ; 
                expect(gameBoard.collide(obj1,"1")).toBe(false) ; 
                //expect(gameBoard.collide(obj2,"1")).toBe(false) ; 

                     
        
        
        }) ; 


        //Prueba 


});
