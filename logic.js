//'use strict';

class Figter{
	constructor(name, power, health){
    	this.name = name;
        this.power = power;
        this.health = health;
    }
    
    setDamage(damage){
    	this.health = this.health - damage;
      console.log(`${this.name} health: ${this.health}`)
    }

    hit(enemy, point){
        enemy.setDamage(point);
    }

    get isDead(){
        return this.health <= 0;
    }
};

class ImprovedFighter extends Figter{
	hit(enemy, point){
    	super.hit(enemy, point*2);
    }
}

class WeakFighter extends ImprovedFighter{
	hit(enemy, point){
        super.hit(enemy, point/2);
  }
}

function fight(figterOne, figterTwo, points){
    points.forEach(point => figterOne.hit(figterTwo, point));
}

function enemyIndex(index, length){
    while(true){
        let enemy = generate(length);
        if (enemy !== index) {
            return enemy;
        }
    }
}

function generate(length, min = 0){
    return Math.floor((Math.random() * length) + min)
}

function creatPoints(){
    let count = generate(3, 1);
    let array = [];
    for (var i = count - 1; i >= 0; i--) {
        array.push(generate(10, 1));
    }
    return array;
}

class Main{
    static start(users){
        //console.log(users[0])
        let figter = new Figter(users[0].name, 7, 100);
        let improvedFighter = new ImprovedFighter(users[1].name, 5, 100);
        let weakFighter = new WeakFighter(users[2].name, 5, 100);

        //while(figter)
        //console.log(enemyIndex(1, 3));

        let figters = [figter, improvedFighter, weakFighter];
        let index =0;
        while(figters.length > 1){
            let senondFigter = enemyIndex(index, figters.length);
            let points = creatPoints();
            console.log(`${index}---${senondFigter}`)
            fight(figters[index], figters[senondFigter], points);

            if (figters[senondFigter].isDead) {
                console.log(`${figters[senondFigter].name} is dead`)
                figters.splice(senondFigter, 1);
            }

            if (index === figters.length-1 || index > figters.length-1) {
                index=0;
            }else{
                index++;
            }

        }
        console.log(`game over --  ${figters[0].name} win`)

    }

}

fetch(`http://jsonplaceholder.typicode.com/users`)
    .then(function(response){
        console.log(response.headers.get('Content-Type')); // application/json; charset=utf-8
        console.log(response.status); // 200

        return response.json();
    })
    .then(function(response) {
    //console.log(response);
    var users = response; 
    Main.start(users);
  });


//console.log(promise);